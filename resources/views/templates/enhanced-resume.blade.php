<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enhanced Resume - {{ $resume->original_name }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            font-size: 11pt;
        }

        .container {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.75in;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #2c5282;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 28pt;
            font-weight: bold;
            color: #2c5282;
            margin-bottom: 5px;
        }

        .header .contact-info {
            font-size: 10pt;
            color: #666;
            margin-top: 10px;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: #2c5282;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .section-content {
            font-size: 10pt;
            line-height: 1.5;
        }

        .experience-item {
            margin-bottom: 20px;
        }

        .job-title {
            font-size: 12pt;
            font-weight: bold;
            color: #2d3748;
        }

        .company-info {
            font-size: 10pt;
            color: #4a5568;
            font-style: italic;
            margin-bottom: 8px;
        }

        .job-description {
            font-size: 10pt;
            line-height: 1.4;
        }

        .job-description ul {
            list-style-type: disc;
            margin-left: 20px;
            margin-top: 5px;
        }

        .job-description li {
            margin-bottom: 3px;
        }

        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .skill-tag {
            background-color: #e2e8f0;
            color: #2d3748;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 9pt;
            font-weight: 500;
        }

        .summary-text {
            font-size: 10pt;
            line-height: 1.5;
            text-align: justify;
        }

        .enhancement-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #48bb78;
            color: white;
            padding: 4px 8px;
            font-size: 8pt;
            border-radius: 4px;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="enhancement-badge">✨ AI Enhanced</div>

        <!-- Header Section -->
        <div class="header">
            @if(isset($sections['header']) && !empty(trim($sections['header'])))
                {!! nl2br(e(trim($sections['header']))) !!}
            @else
                <h1>{{ pathinfo($resume->original_name, PATHINFO_FILENAME) }}</h1>
                <div class="contact-info">
                    Enhanced Resume | Generated {{ now()->format('F j, Y') }}
                </div>
            @endif
        </div>

        <!-- Summary Section -->
        @if(isset($sections['summary']) && !empty(trim($sections['summary'])))
            <div class="section">
                <h2 class="section-title">Professional Summary</h2>
                <div class="section-content summary-text">
                    {!! nl2br(e(trim($sections['summary']))) !!}
                </div>
            </div>
        @endif

        <!-- Experience Section -->
        @if(isset($sections['experience']) && !empty(trim($sections['experience'])))
            <div class="section">
                <h2 class="section-title">Professional Experience</h2>
                <div class="section-content">
                    <div class="experience-item">
                        {!! nl2br(e(trim($sections['experience']))) !!}
                    </div>
                </div>
            </div>
        @endif

        <!-- Skills Section -->
        @if(isset($sections['skills']) && !empty(trim($sections['skills'])))
            <div class="section">
                <h2 class="section-title">Technical Skills</h2>
                <div class="section-content">
                    {!! nl2br(e(trim($sections['skills']))) !!}
                </div>
            </div>
        @endif

        <!-- Education Section -->
        @if(isset($sections['education']) && !empty(trim($sections['education'])))
            <div class="section">
                <h2 class="section-title">Education</h2>
                <div class="section-content">
                    {!! nl2br(e(trim($sections['education']))) !!}
                </div>
            </div>
        @endif

        <!-- Enhancement Details -->
        <div class="section" style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <h2 class="section-title" style="font-size: 10pt;">Enhancement Summary</h2>
            <div class="section-content" style="font-size: 9pt; color: #666;">
                <p><strong>Enhanced:</strong> {{ now()->format('F j, Y \a\t g:i A') }}</p>
                <p><strong>Model:</strong> propella-resume-enhancer-v2.1</p>
                <p><strong>Improvements:</strong> ATS Optimization, Keyword Enhancement, Achievement Quantification</p>
            </div>
        </div>
    </div>
</body>

</html>