You are writing a personalized Upwork proposal for the following job:

**Job Title:** {{ $job['title'] }}

**Job Description:**
{{ $job['description'] }}

@if(!empty($job['skills']))
**Required Skills:** {{ implode(', ', $job['skills']) }}
@endif

@if(!empty($job['screening_questions']))
**Screening Questions:**
@foreach($job['screening_questions'] as $question)
- {{ $question }}
@endforeach
@endif

---

**Your Profile Context:**
@if($context['profile'])
**Specialization:** {{ $context['profile']->specialization ?? 'Not specified' }}
**Years of Experience:** {{ $context['profile']->years_experience ?? 'Not specified' }} years
**Hourly Rate:** ${{ $context['profile']->default_hourly_rate ?? 'Not specified' }}/hour
**Weekly Availability:** {{ $context['profile']->weekly_availability ?? 'Not specified' }} hours/week
**Location:** {{ $context['profile']->country ?? 'Not specified' }}
**Timezone:** {{ $context['profile']->timezone ?? 'Not specified' }}

@if(!empty($context['profile']->skills))
**Your Skills:** {{ implode(', ', $context['profile']->skills) }}
@endif

@if($context['profile']->bio)
**Your Bio:** {{ $context['profile']->bio }}
@endif
@else
**Profile:** No profile information available - create a generic proposal.
@endif

---

**Relevant Portfolio Projects:**
@if($context['portfolio']->count() > 0)
@foreach($context['portfolio'] as $item)
**{{ $item->title }}** ({{ $item->category }})
- {{ $item->description }}
- Technologies: {{ implode(', ', $item->technologies ?? []) }}
- Skills: {{ implode(', ', $item->skills_used ?? []) }}
@if($item->outcome_metrics)
- Results: {{ $item->outcome_metrics }}
@endif
@if($item->project_url)
- Live Project: {{ $item->project_url }}
@endif

@endforeach
@else
**Portfolio:** No relevant portfolio items found - focus on skills and experience.
@endif

---

**Suggested Screening Question Answers:**
@if(!empty($context['screening_answers']))
@foreach($context['screening_answers'] as $answer)
**Q: {{ $answer['question'] }}**
@if($answer['suggested_answer'])
**Suggested Answer ({{ $answer['match_type'] }} match, confidence: {{ $answer['confidence'] }}/10):**
{{ $answer['suggested_answer'] }}
@if($answer['match_type'] === 'similar')
*(Original question: "{{ $answer['original_question'] }}")*
@endif
@else
**No previous answer found for this question - provide a fresh response**
@endif

@endforeach
@endif

---

**Instructions:**
1. Write a compelling, personalized proposal that demonstrates understanding of the job requirements
2. Reference specific portfolio projects that are relevant to this job
3. Mention your relevant skills and experience from your profile
4. Use concrete examples and quantify results where possible
5. Address any screening questions naturally within the proposal flow
6. Show enthusiasm and professionalism
7. End with a clear call-to-action
8. Match the client's tone (formal/casual) based on job description
9. Highlight your unique value proposition
10. Keep the proposal focused and avoid generic statements

**Proposal Guidelines:**
- Lead with your strongest relevant experience or portfolio project
- Connect your background directly to their specific needs  
- Use "I" statements to make it personal
- Include specific deliverables or next steps
- Reference your availability and timeline
- Mention your rate only if it fits naturally
- Avoid overly salesy language
- Proofread for grammar and clarity

Write the proposal now: