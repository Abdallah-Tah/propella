# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Propella** - an Upwork Proposal Assistant that generates AI-powered proposals using stored resumes. The application consists of a Laravel backend with React frontend (via Inertia.js) and integrates with PrismPHP for AI functionality.

**Key Features:**
- AI-powered Upwork proposal generation using vector similarity search
- Resume upload and embedding storage with pgvector
- User authentication and billing integration with Stripe
- Queue-based async proposal generation
- Chrome extension integration (planned)

## Development Commands

### Backend (Laravel/PHP)
```bash
# Start development environment (includes server, queue, logs, and frontend)
composer run dev

# Start development with SSR support
composer run dev:ssr

# Run tests
composer run test
# Or directly: php artisan test

# Run specific test
php artisan test --filter=TestClassName

# Database operations
php artisan migrate
php artisan migrate:fresh --seed
php artisan queue:work
php artisan horizon  # Queue dashboard

# Code quality
./vendor/bin/pint  # Laravel Pint (PHP formatter)
```

### Frontend (React/TypeScript)
```bash
# Development
npm run dev

# Production build
npm run build
npm run build:ssr  # With SSR support

# Code quality
npm run lint        # ESLint with auto-fix
npm run types       # TypeScript type checking
npm run format      # Prettier formatting
npm run format:check
```

## Architecture Overview

### Core Models and Database
- **User**: Authentication via Laravel Breeze
- **Resume**: Uploaded resume files stored in private filesystem
- **Embedding**: Vector embeddings of resume chunks using pgvector for similarity search
- **Generation**: AI-generated proposals with tracking (tokens, cost, status, outcome)

### AI Integration (PrismPHP)
- **Provider**: OpenAI via PrismPHP library
- **Embeddings**: `text-embedding-3-small` for vector search
- **Text Generation**: `gpt-4o-mini` for proposal generation
- **Configuration**: `config/prism.php` with multiple provider support

### Key Workflows

#### Proposal Generation Flow
1. Job data received from frontend/extension
2. Job description converted to embedding vector
3. Vector similarity search against stored resume embeddings
4. Top-k relevant resume snippets retrieved  
5. Prompt template (`resources/views/prompts/proposal.blade.php`) populated
6. AI generates proposal via PrismPHP
7. Response saved to `generations` table with usage tracking

#### Resume Processing Flow  
1. Resume uploaded to `storage/app/private/resumes/`
2. Text extracted and chunked
3. Each chunk converted to embedding vector
4. Stored in `embeddings` table with metadata

### Frontend Architecture (React + Inertia.js)
- **Layout System**: Nested layouts in `resources/js/layouts/`
- **Components**: shadcn/ui components in `resources/js/components/ui/`
- **Pages**: Inertia pages in `resources/js/pages/`
- **Styling**: Tailwind CSS with custom components

### Key Controllers
- **ProposalController**: Handles sync/async proposal generation
- **ResumeController**: Resume upload and management
- **ProposalHistoryController**: Generated proposal tracking

### Queue System
- **GenerateProposal Job**: Async proposal generation with vector search
- **Laravel Horizon**: Queue monitoring and management
- **Redis**: Queue backend

## Environment Configuration

Required environment variables:
```bash
# AI/PrismPHP
OPENAI_API_KEY=sk-xxxx
PRISM_PROVIDERS_OPENAI_API_KEY=sk-xxxx

# Database (PostgreSQL with pgvector)
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=propella
DB_USERNAME=
DB_PASSWORD=

# Queue/Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
QUEUE_CONNECTION=redis

# Billing (Stripe via Laravel Cashier)
STRIPE_KEY=pk_xxxx
STRIPE_SECRET=sk_xxxx
```

## Testing

- **Framework**: Pest PHP testing framework
- **Structure**: Feature tests in `tests/Feature/`, Unit tests in `tests/Unit/`
- **Database**: Uses SQLite for testing by default
- **Coverage**: Auth, Dashboard, Settings, and core functionality

## File Storage

- **Public**: `storage/app/public/` - publicly accessible files
- **Private**: `storage/app/private/resumes/` - uploaded resume files
- **Symbolic Link**: `public/storage` links to `storage/app/public`

## Key Dependencies

**Backend:**
- `prism-php/prism`: AI integration library
- `ankane/pgvector`: PostgreSQL vector operations
- `laravel/horizon`: Queue dashboard
- `laravel/cashier`: Stripe billing
- `inertiajs/inertia-laravel`: SPA-like experience

**Frontend:**
- `@inertiajs/react`: Frontend integration
- `@radix-ui/*`: Headless UI components  
- `@tailwindcss/*`: Styling and typography
- `react-markdown`: Markdown rendering
- `lucide-react`: Icons