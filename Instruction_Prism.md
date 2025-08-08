# Instruction.md — Upwork Proposal Assistant (PrismPHP Integrated)

## 0) Overview
Chrome Extension + Laravel API + Copilot Agent to generate AI-assisted Upwork proposals using stored resumes.  
Full PostgreSQL backend + React frontend via Inertia.js.  
Billing with Laravel Cashier (Stripe), legal pages, and contact form.  
OpenAI integration via **PrismPHP**.

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
- Chrome MV3  
- Content script + Background worker  
- React sidebar (Vite build)  

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

## 3) Database Migrations
(Users, Resumes, Profiles, Documents, Embeddings, Generations, Limits, Events — see earlier schema definitions)

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

## 5) Proposal Generation Controller (Using PrismPHP)

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
            'answers' => [],
            'coverage' => [],
            'usage' => [
                'input_tokens' => $response->usage->inputTokens ?? 0,
                'output_tokens' => $response->usage->outputTokens ?? 0,
            ]
        ]);
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

## 8) Resume-to-Proposal Flow

1. Upload resume → parse to JSON  
2. Chunk text → generate embeddings → store in Postgres  
3. Extension scrapes job data → sends to API  
4. PrismPHP generates proposal from job + resume context  
5. Proposal returned to extension panel for review & insertion

---

## 9) Billing

Laravel Cashier with Stripe plans: Free, Pro, Agency  
(See earlier billing setup)

---

## 10) Summary

This document defines the **entire Laravel + Postgres + PrismPHP** workflow for generating AI-assisted Upwork proposals.
