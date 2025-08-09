# Instruction.md — Propella: Complete Upwork Workflow Automation (PrismPHP Integrated)

## 0) Overview
**"From Job Discovery to Proposal Submission in 60 Seconds"**

Complete Upwork workflow automation platform that eliminates repetitive tasks:
- Chrome Extension + Laravel API + AI Agent for end-to-end Upwork application automation
- Intelligent form auto-fill, screening question generation, and portfolio selection
- Vector-powered job matching and success tracking
- Full PostgreSQL backend + React frontend via Inertia.js
- Multi-user/agency support with team collaboration features
- Billing with Laravel Cashier (Stripe), legal pages, and contact form
- OpenAI integration via **PrismPHP**

**Core Value:** Transform 2+ hour proposal writing sessions into 60-second automated applications.

---

## 1) Stack

**Backend**
- Laravel 12  
- PHP 8.3  
- PostgreSQL 15+ (with `pgvector`)  
- Redis (queue + cache)  
- Laravel Breeze (API auth)  
- Laravel Cashier + Stripe (billing)  
- **PrismPHP** (AI API integration)  
- `ankane/pgvector` (vector search)  
- `laravel/horizon` (queue dashboard)  

**Frontend**
- Inertia.js + React.js  
- Tailwind CSS + shadcn/ui  

**Extension**
- Chrome MV3 with advanced DOM manipulation
- Content script + Background worker + Service worker
- React sidebar with real-time form filling (Vite build)
- Upwork page detection and automatic data extraction
- Form auto-population engine  

---

## 2) Install Required Libraries

```bash
composer require laravel/breeze --dev
php artisan breeze:install inertia-react

composer require laravel/horizon predis/predis
composer require ankane/pgvector
composer require prism-php/prism
composer require laravel/cashier stripe/stripe-php
composer require guzzlehttp/guzzle
```

---

## 3) Enhanced Database Schema

### Core Models
```php
// Users (existing Laravel auth)
// Resumes (existing)
// Embeddings (existing)
// Generations (existing)

// NEW MODELS for complete workflow:

// User Profiles - Detailed freelancer information
'profiles' => [
    'user_id', 'default_hourly_rate', 'weekly_availability',
    'bio', 'skills_json', 'languages_json', 'certifications_json',
    'portfolio_links_json', 'social_links_json'
]

// Screening Answers - Generated responses to common questions
'screening_answers' => [
    'user_id', 'question_hash', 'question_text', 'generated_answer',
    'times_used', 'success_rate', 'last_updated'
]

// Job Applications - Track complete application workflow
'job_applications' => [
    'user_id', 'job_url', 'job_title', 'client_name', 'job_data_json',
    'proposal_id', 'screening_answers_json', 'portfolio_items_json',
    'application_status', 'submitted_at', 'client_response_at', 'outcome'
]

// Portfolio Items - Smart portfolio management
'portfolio_items' => [
    'user_id', 'title', 'description', 'url', 'skills_json',
    'category', 'success_metrics', 'relevance_score'
]

// Job Matches - Proactive job discovery
'job_matches' => [
    'user_id', 'job_url', 'job_data_json', 'match_score',
    'recommended_at', 'viewed_at', 'applied_at'
]

// Team Management (Agency features)
'teams' => ['name', 'owner_id', 'subscription_id']
'team_members' => ['team_id', 'user_id', 'role', 'permissions_json']
```

---

## 4) PrismPHP Setup

```bash
php artisan vendor:publish --tag=prism-config
```

In `.env`:
```
PRISM_PROVIDERS_OPENAI_API_KEY=sk-xxxx
```

---

## 5) Enhanced Controllers for Complete Workflow

**`app/Http/Controllers/ProposalController.php`**
```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Models\Embedding;
use App\Models\Generation;
use Illuminate\Support\Str;

class ProposalController extends Controller
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'job' => 'required|array',
            'settings' => 'nullable|array'
        ]);

        $job = $validated['job'];

        // Convert job description to embedding vector
        $jobVector = app('prism.embedding')
            ->using(Provider::OpenAI, 'text-embedding-3-small')
            ->embed($job['description']);

        // Retrieve top-k resume chunks
        $snippets = Embedding::orderByRaw('embedding <=> ?', [$jobVector])
            ->limit(6)
            ->pluck('metadata_json')
            ->toArray();

        // Build prompt
        $promptBody = view('prompts.proposal', compact('job', 'snippets'))->render();

        // Generate proposal using PrismPHP
        $response = Prism::text()
            ->using(Provider::OpenAI, 'gpt-4.1-mini')
            ->withSystemPrompt('You write tight, client-winning Upwork proposals. Be specific, quantify results, avoid clichés.')
            ->withPrompt($promptBody)
            ->asText();

        // Save generation
        Generation::create([
            'user_id' => $request->user()->id,
            'job_hash' => Str::uuid(),
            'source_json' => json_encode($job),
            'output_md' => $response->text,
            'tokens_in' => $response->usage->inputTokens ?? 0,
            'tokens_out' => $response->usage->outputTokens ?? 0,
            'cost_cents' => 0,
            'status' => 'success'
        ]);

        return response()->json([
            'proposal_md' => $response->text,
            'screening_answers' => $this->generateScreeningAnswers($job['screening_questions'] ?? []),
            'portfolio_suggestions' => $this->suggestPortfolioItems($job),
            'auto_fill_data' => $this->prepareAutoFillData($request->user()),
            'usage' => [
                'input_tokens' => $response->usage->inputTokens ?? 0,
                'output_tokens' => $response->usage->outputTokens ?? 0,
            ]
        ]);
    }

    // Generate AI-powered screening question answers
    private function generateScreeningAnswers($questions)
    {
        $answers = [];
        foreach ($questions as $question) {
            // Check for cached answers
            $cached = ScreeningAnswer::where('question_hash', md5($question))->first();
            
            if ($cached) {
                $answers[] = $cached->generated_answer;
            } else {
                // Generate new answer using AI
                $answer = Prism::text()
                    ->using(Provider::OpenAI, 'gpt-4o-mini')
                    ->withPrompt("Answer this Upwork screening question professionally: {$question}")
                    ->asText();
                
                $answers[] = $answer->text;
                
                // Cache for future use
                ScreeningAnswer::create([
                    'user_id' => auth()->id(),
                    'question_hash' => md5($question),
                    'question_text' => $question,
                    'generated_answer' => $answer->text
                ]);
            }
        }
        return $answers;
    }

    // Suggest relevant portfolio items
    private function suggestPortfolioItems($job)
    {
        return PortfolioItem::where('user_id', auth()->id())
            ->whereJsonContains('skills_json', $job['skills'] ?? [])
            ->orderBy('relevance_score', 'desc')
            ->limit(3)
            ->get();
    }

    // Prepare data for auto-filling Upwork forms
    private function prepareAutoFillData($user)
    {
        $profile = $user->profile;
        return [
            'hourly_rate' => $profile->default_hourly_rate,
            'availability' => $profile->weekly_availability,
            'portfolio_links' => $profile->portfolio_links_json,
            'bio' => $profile->bio
        ];
    }
}
```

---

## 6) Prompt Template

**`resources/views/prompts/proposal.blade.php`**
```blade
JOB:
{{ $job['title'] }}
{{ $job['description'] }}
SKILLS: {{ implode(', ', $job['skills'] ?? []) }}
SCREENING: {{ implode('\n', $job['screening_questions'] ?? []) }}

PROFILE SNIPPETS:
@foreach($snippets as $snippet)
- {{ $snippet['text'] ?? '' }}
@endforeach
```

---

## 7) Pages & Routes
(Welcome, Contact, Terms, Refund pages — see earlier code)

---

## 8) Complete Upwork Application Flow

### Phase 1: Setup & Profile Building
1. User uploads resume → parse to JSON → chunk text → generate embeddings
2. Create detailed freelancer profile with rates, skills, portfolio
3. Build screening question database from user's expertise

### Phase 2: Job Discovery & Matching  
1. Chrome extension monitors Upwork job feeds
2. AI evaluates job-to-profile fit using vector similarity
3. Proactive job recommendations sent to user dashboard
4. Smart alerts for high-match opportunities

### Phase 3: One-Click Application Process
1. **Extension Detection**: User visits Upwork job page
2. **Data Extraction**: Scrape job details, requirements, screening questions  
3. **AI Generation**: Generate proposal + screening answers + portfolio selection
4. **Form Auto-Fill**: Populate entire Upwork application form
5. **Review & Submit**: User reviews pre-filled form and submits

### Phase 4: Success Tracking & Optimization
1. Track application outcomes (responses, interviews, hires)
2. Analyze success patterns and optimize AI prompts
3. Update user's success metrics and recommendation algorithms
4. Generate insights for improving win rates

### Agency/Team Workflow
1. Team admins manage multiple freelancer profiles
2. Coordinate bid strategies across team members
3. Share successful templates and approaches
4. Track team-wide success metrics and ROI

---

## 9) Enhanced Billing & Subscription Plans

### Subscription Tiers
```php
// Free Plan - 10 proposals/month
- Basic proposal generation
- Manual form filling
- Basic tracking

// Pro Plan - $19/month - Unlimited proposals
- Unlimited proposals + screening answers
- Auto-fill forms  
- Success analytics & optimization
- Portfolio management
- Job matching recommendations

// Agency Plan - $49/month - Team features
- Everything in Pro
- Multi-user team management
- Shared templates and knowledge base
- Team performance analytics
- Priority support
- White-label options

// Enterprise - Custom pricing
- Custom integrations
- Dedicated success manager
- Advanced analytics & reporting
- API access
```

### Usage-Based Features
- Token usage tracking per user/team
- Overage billing for high-volume users
- Real-time usage dashboards
- Cost optimization recommendations

---

## 10) Chrome Extension Architecture

### Extension Components
```javascript
// manifest.json - Chrome MV3 configuration
{
  "permissions": ["activeTab", "storage", "scripting"],
  "host_permissions": ["*://*.upwork.com/*"],
  "content_scripts": [
    {
      "matches": ["*://*.upwork.com/jobs/*"],
      "js": ["content-script.js"],
      "css": ["propella-sidebar.css"]
    }
  ]
}

// content-script.js - Main extension logic
class UpworkAutomation {
  detectJobPage() {
    // Detect Upwork job posting pages
    // Extract job data (title, description, skills, budget, etc.)
  }

  showPropellaSidebar() {
    // Inject React sidebar component
    // Display generated proposal and form data
  }

  autoFillForm() {
    // Populate Upwork application form fields
    // Handle proposal text, screening questions, portfolio links
    // Set rates, availability, and other profile data
  }

  trackApplication() {
    // Monitor form submission
    // Send success/failure data back to API
  }
}
```

### Real-Time Form Filling
```javascript
// Auto-population engine
const fillUpworkForm = (data) => {
  // Proposal text
  document.querySelector('[data-cy="proposal-text"]').value = data.proposal;
  
  // Screening questions
  data.screening_answers.forEach((answer, index) => {
    document.querySelector(`[data-cy="question-${index}"]`).value = answer;
  });
  
  // Portfolio links
  data.portfolio_suggestions.forEach(item => {
    addPortfolioItem(item.url, item.title, item.description);
  });
  
  // Rate and availability
  document.querySelector('[data-cy="hourly-rate"]').value = data.hourly_rate;
  document.querySelector('[data-cy="weekly-hours"]').value = data.availability;
};
```

---

## 11) Implementation Roadmap

### MVP (Month 1-2)
- [x] Basic proposal generation (existing)
- [ ] User profile management
- [ ] Chrome extension with job detection
- [ ] Simple form auto-fill for proposals

### Phase 2 (Month 3-4)  
- [ ] Screening question generation
- [ ] Portfolio management system
- [ ] Success tracking and analytics
- [ ] Job matching recommendations

### Phase 3 (Month 5-6)
- [ ] Team/agency features
- [ ] Advanced analytics and optimization
- [ ] Mobile app companion
- [ ] API for third-party integrations

### Phase 4 (Month 7+)
- [ ] White-label solutions
- [ ] Other freelance platform support (Freelancer, Fiverr)
- [ ] AI-powered client communication
- [ ] Advanced project management integration

---

## 12) Success Metrics & KPIs

### User Success Metrics
- **Application Time Reduction**: From 30+ minutes to <2 minutes
- **Response Rate**: Track proposal response rates vs. manual applications
- **Win Rate**: Monitor job win percentage improvement
- **Time-to-Revenue**: Track faster client acquisition

### Business Metrics  
- **User Retention**: Monthly/annual subscription retention
- **Feature Adoption**: % users using auto-fill, screening, portfolio features
- **Usage Growth**: Proposals generated per user per month
- **Customer LTV**: Lifetime value by subscription tier

---

## 13) Summary

This document defines **Propella's complete Upwork workflow automation system** - transforming the freelance application process from a time-intensive manual task into an AI-powered, automated workflow that maximizes success while minimizing effort.

**Key Innovation**: Beyond proposal generation, Propella eliminates every repetitive aspect of Upwork applications through intelligent automation, vector-powered matching, and continuous optimization based on real success data.
