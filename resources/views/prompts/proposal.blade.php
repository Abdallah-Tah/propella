You are writing a proposal for the following Upwork job posting:

=== JOB DETAILS ===
Title: {{ $job['title'] ?? 'No title provided' }}

Description:
{{ $job['description'] ?? 'No description provided' }}

@if(!empty($job['skills']))
    Required Skills: {{ implode(', ', $job['skills']) }}
@endif

@if(!empty($job['screening_questions']))
    Screening Questions:
    @foreach($job['screening_questions'] as $question)
        - {{ $question }}
    @endforeach
@endif

=== CONTEXT ===
@if(!empty($snippets))
    Relevant experience and skills from user profile:
    @foreach($snippets as $snippet)
        - {{ is_array($snippet) ? ($snippet['text'] ?? '') : (is_string($snippet) ? $snippet : '') }}
    @endforeach
@else
    No specific profile information available. Write a general but professional proposal.
@endif

=== INSTRUCTIONS ===
Write a compelling Upwork proposal that:

1. **Opening Hook**: Start with a personalized greeting that shows you understand their specific needs.
2. **Relevant Experience**: Highlight 2-3 most relevant experiences or skills that match their requirements.
3. **Value Proposition**: Clearly explain how you'll solve their problem and what makes you the best choice.
4. **Project Approach**: Briefly outline your approach or methodology for this project.
5. **Portfolio/Examples**: Mention specific examples or ask to share relevant portfolio pieces.
6. **Call to Action**: End with a clear next step and invitation to discuss further.

Keep the proposal:
- Professional but personable
- Concise (200-300 words)
- Specific to their needs (avoid generic language)
- Results-focused
- Easy to scan with clear structure

Write the proposal now.