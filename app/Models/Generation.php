<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Generation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_hash',
        'source_json',
        'output_md',
        'tokens_in',
        'tokens_out',
        'cost_cents',
        'status',
        'tracking_status',
        'sent_at',
        'client_response_at',
        'outcome',
        'client_budget',
        'won_amount',
    ];

    protected $casts = [
        'source_json' => 'array',
        'sent_at' => 'datetime',
        'client_response_at' => 'datetime',
    ];

    // Tracking statuses
    const TRACKING_GENERATED = 'generated';
    const TRACKING_SENT = 'sent';
    const TRACKING_RESPONDED = 'responded';
    const TRACKING_WON = 'won';
    const TRACKING_LOST = 'lost';
    const TRACKING_NO_RESPONSE = 'no_response';
}
