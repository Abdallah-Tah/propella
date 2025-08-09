<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'category' => 'required|in:technical,billing,feature,partnership,general',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        // For now, we'll just log the contact form submission
        // In production, you'd want to send an email or store in database
        logger('Contact form submission:', $data);

        // You could add email sending here:
        // Mail::to('support@propella.ai')->send(new ContactFormMail($data));

        return back()->with('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
    }
}
