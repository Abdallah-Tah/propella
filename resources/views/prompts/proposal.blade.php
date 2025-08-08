JOB:
{{ $job['title'] ?? '' }}
{{ $job['description'] ?? '' }}
SKILLS: {{ isset($job['skills']) ? implode(', ', $job['skills']) : '' }}
SCREENING: {{ isset($job['screening_questions']) ? implode("\n", $job['screening_questions']) : '' }}

PROFILE SNIPPETS:
@foreach(($snippets ?? []) as $snippet)
    - {{ is_array($snippet) ? ($snippet['text'] ?? '') : (is_string($snippet) ? $snippet : '') }}
@endforeach