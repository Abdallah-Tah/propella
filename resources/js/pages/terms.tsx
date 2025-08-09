import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  ArrowLeft,
  Scale,
  Shield,
  FileText,
  Users,
  Globe,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Calendar
} from 'lucide-react';

export default function Terms() {
    const { auth } = usePage<SharedData>().props;

    const sections = [
        {
            title: "Acceptance of Terms",
            icon: CheckCircle,
            content: `By accessing and using Propella's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms constitute a legally binding agreement between you and Propella. We reserve the right to modify these terms at any time, and such modifications will be effective immediately upon posting.`
        },
        {
            title: "Description of Service",
            icon: FileText,
            content: `Propella is an AI-powered workflow automation platform designed to help freelancers optimize their Upwork applications. Our services include:

• AI-powered proposal generation based on job postings and user profiles
• Chrome extension for form auto-filling and data extraction
• Screening question generation and management
• Portfolio optimization and management tools
• Job discovery and matching algorithms
• Performance analytics and success tracking
• Team collaboration tools for agencies and organizations

Our service is provided "as is" and we make no warranties regarding uptime, accuracy, or results.`
        },
        {
            title: "User Responsibilities",
            icon: Users,
            content: `As a user of Propella, you agree to:

• Provide accurate and truthful information in your profile and resumes
• Use our AI-generated content as a starting point and review all proposals before submission
• Comply with Upwork's Terms of Service and all applicable laws
• Not use our service for any illegal, harmful, or fraudulent activities
• Not attempt to reverse engineer, hack, or compromise our systems
• Respect intellectual property rights and not share account access
• Maintain the security of your account credentials

You are solely responsible for the content you submit to clients and the accuracy of your qualifications and experience.`
        },
        {
            title: "AI-Generated Content",
            icon: Shield,
            content: `Important disclaimers regarding our AI-powered features:

• All AI-generated proposals, answers, and content are suggestions and require human review
• Users must verify accuracy, appropriateness, and compliance before submission
• Propella is not responsible for the consequences of submitting AI-generated content
• Users should personalize and customize all generated content to reflect their genuine experience
• Our AI learns from public data and user inputs but may occasionally produce inaccurate information
• Generated content should not be considered professional advice

You acknowledge that AI technology has limitations and that human judgment is essential.`
        },
        {
            title: "Privacy and Data",
            icon: Globe,
            content: `We take your privacy seriously and are committed to protecting your personal information:

• We collect only necessary data to provide our services effectively
• Your resume data is encrypted and stored securely
• We do not sell, rent, or share your personal information with third parties
• Chrome extension data is processed locally when possible
• You retain ownership of all content you provide to our service
• You can request data deletion at any time by contacting support

For detailed information about our data practices, please review our Privacy Policy.`
        },
        {
            title: "Subscription and Billing",
            icon: Calendar,
            content: `Subscription terms and billing policies:

• Free accounts include basic features with usage limitations
• Paid subscriptions are billed monthly or annually in advance
• All fees are non-refundable except where required by law
• Subscriptions automatically renew unless cancelled before the renewal date
• You can cancel your subscription at any time through your account settings
• Downgrading may result in loss of premium features and data
• Price changes will be communicated 30 days in advance for existing customers

We use Stripe for secure payment processing and do not store credit card information.`
        },
        {
            title: "Limitation of Liability",
            icon: AlertTriangle,
            content: `To the maximum extent permitted by law:

• Propella's liability is limited to the amount you paid for the service in the past 12 months
• We are not liable for indirect, incidental, or consequential damages
• We do not guarantee specific results, success rates, or income from using our service
• You use our service at your own risk and responsibility
• We are not responsible for third-party platform policies or account suspensions
• Our service may experience downtime, bugs, or interruptions
• We disclaim all warranties except those that cannot be legally excluded

This limitation applies even if we have been advised of the possibility of such damages.`
        },
        {
            title: "Intellectual Property",
            icon: BookOpen,
            content: `Intellectual property rights and ownership:

• Propella retains all rights to our platform, technology, and proprietary algorithms
• You retain ownership of content you upload (resumes, personal information, etc.)
• By using our service, you grant us license to process your content to provide our services
• You may not copy, modify, or distribute our software or proprietary content
• Our trademarks, logos, and brand elements are our exclusive property
• We respect intellectual property rights and will respond to valid DMCA notices
• Users found violating IP rights may have their accounts terminated

We reserve the right to protect our intellectual property through legal means.`
        }
    ];

    return (
        <>
            <Head title="Terms of Service - Propella">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            
            {/* Clean, professional background */}
            <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
                {/* Subtle background elements */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl" />
                
                {/* Navigation */}
                <header className="relative z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/50 dark:border-slate-800/50">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <Link href={route('welcome')} className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-blue-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </Link>
                            
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" asChild className="text-slate-600 dark:text-slate-400">
                                    <Link href={route('welcome')}>
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Home
                                    </Link>
                                </Button>
                                {auth.user && (
                                    <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                        <Link href={route('dashboard')}>
                                            Dashboard
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Header Section */}
                <section className="relative z-40 py-16 px-6">
                    <div className="container mx-auto max-w-4xl text-center">
                        <Badge className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 px-6 py-3">
                            <Scale className="h-4 w-4 mr-2" />
                            Legal
                        </Badge>
                        
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Terms of Service
                        </h1>
                        
                        <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            These terms govern your use of Propella's AI-powered workflow automation platform. 
                            Please read them carefully as they contain important information about your rights and obligations.
                        </p>

                        <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Last updated: January 15, 2025
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Effective worldwide
                            </div>
                        </div>
                    </div>
                </section>

                {/* Terms Sections */}
                <section className="relative z-40 pb-20 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <Card key={section.title} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-4 text-2xl font-bold text-slate-800 dark:text-slate-200">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                                <section.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                {section.title}
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            {section.content.split('\n\n').map((paragraph, pIndex) => (
                                                <div key={pIndex} className="mb-4 last:mb-0">
                                                    {paragraph.split('\n').map((line, lIndex) => {
                                                        if (line.startsWith('•')) {
                                                            return (
                                                                <div key={lIndex} className="flex items-start gap-3 mb-2">
                                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                                                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                                                        {line.substring(2)}
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                        return (
                                                            <p key={lIndex} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2 last:mb-0">
                                                                {line}
                                                            </p>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Contact Information */}
                        <Card className="mt-12 backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                        <FileText className="h-6 w-6 text-white" />
                                    </div>
                                    Questions About These Terms?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                    If you have any questions about these Terms of Service, need clarification on any provisions, 
                                    or want to discuss how they apply to your specific situation, please don't hesitate to contact us.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                                        <Link href="/contact">
                                            Contact Support
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                        <Link href="/privacy">
                                            View Privacy Policy
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t border-slate-200/50 dark:border-slate-800/50 py-8">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <Link href={route('welcome')} className="flex items-center gap-4 mb-6 md:mb-0">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-blue-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </Link>
                            
                            <div className="text-slate-600 dark:text-slate-400 text-center md:text-right">
                                <p>&copy; 2025 Propella. All rights reserved.</p>
                                <div className="flex gap-4 mt-2 text-sm justify-center md:justify-end">
                                    <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
                                    <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
                                    <Link href={route('welcome')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}