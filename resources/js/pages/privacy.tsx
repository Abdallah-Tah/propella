import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  UserCheck,
  Settings,
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  Cookie,
  Trash2,
  Download,
  Mail
} from 'lucide-react';

export default function Privacy() {
    const { auth } = usePage<SharedData>().props;

    const sections = [
        {
            title: "Information We Collect",
            icon: Database,
            content: `We collect information to provide you with the best possible service and user experience:

**Account Information:**
• Name, email address, and profile information you provide
• Resume content, skills, and professional experience data
• Payment information (processed securely through Stripe)
• Communication preferences and account settings

**Usage Data:**
• How you interact with our platform and Chrome extension
• Job postings you analyze and proposals you generate
• Feature usage patterns and performance metrics
• Device information, browser type, and IP address

**AI Training Data:**
• Anonymized and aggregated usage patterns to improve our AI models
• Success rates and proposal performance metrics
• User feedback and satisfaction scores

We only collect data that's necessary to provide our services effectively.`
        },
        {
            title: "How We Use Your Information",
            icon: Settings,
            content: `Your information helps us deliver personalized and effective services:

**Core Service Delivery:**
• Generate AI-powered proposals tailored to your experience
• Provide intelligent form auto-filling through our Chrome extension
• Match you with relevant job opportunities on Upwork
• Track your success metrics and provide analytics

**Service Improvement:**
• Analyze usage patterns to enhance our AI algorithms
• Develop new features based on user behavior and feedback
• Optimize platform performance and user experience
• Conduct A/B testing for feature improvements

**Communication:**
• Send important account updates and security notifications
• Provide customer support and respond to your inquiries
• Share product updates and new feature announcements (with your consent)
• Send marketing communications (you can opt out anytime)

We never use your personal information for purposes you haven't consented to.`
        },
        {
            title: "Data Security & Protection",
            icon: Lock,
            content: `We implement industry-leading security measures to protect your data:

**Encryption & Storage:**
• All data is encrypted in transit using TLS 1.3
• Data at rest is encrypted using AES-256 encryption
• Resume content is stored in encrypted, secure databases
• Backups are encrypted and stored in geographically distributed locations

**Access Controls:**
• Multi-factor authentication for all team members
• Role-based access controls limiting data access to authorized personnel only
• Regular security audits and penetration testing
• SOC 2 Type II compliance (certification in progress)

**AI Data Processing:**
• Personal data is anonymized before being used for AI training
• Resume content is processed securely and never shared with third parties
• Chrome extension processes data locally when possible
• All AI interactions are logged for security monitoring

**Incident Response:**
• 24/7 security monitoring and threat detection
• Incident response plan with notification procedures
• Regular security training for all team members
• Vulnerability disclosure program for researchers`
        },
        {
            title: "Data Sharing & Third Parties",
            icon: Globe,
            content: `We are committed to never selling your personal data. Here's how we handle third-party relationships:

**Service Providers:**
• Stripe for secure payment processing (PCI DSS compliant)
• AWS/Google Cloud for hosting infrastructure (GDPR compliant)
• SendGrid for transactional email delivery
• Analytics providers for anonymized usage insights

**Legal Requirements:**
• We may disclose information if required by law, court order, or government request
• We will notify you of such requests unless legally prohibited
• We regularly challenge overbroad or inappropriate requests

**Business Transfers:**
• In the event of a merger or acquisition, we will notify users 30 days in advance
• You can delete your account before any transfer of ownership
• New owners must honor existing privacy commitments

**What We Never Do:**
• Sell your personal information to third parties
• Share your resume content with other users or companies
• Use your data for advertising purposes outside our platform
• Provide your information to recruiters or employers without explicit consent`
        },
        {
            title: "Your Privacy Rights",
            icon: UserCheck,
            content: `You have comprehensive control over your personal data:

**Access Rights:**
• View all personal information we have about you
• Download your data in a portable format (JSON/PDF)
• Review your proposal history and usage analytics
• See which third parties have access to your data

**Control Rights:**
• Update or correct your personal information anytime
• Delete specific pieces of information or your entire account
• Opt out of marketing communications while keeping service updates
• Control cookie preferences and tracking settings

**Portability Rights:**
• Export your resume data, proposal history, and account settings
• Transfer your information to other services in standard formats
• Maintain copies of all generated proposals and analytics

**Deletion Rights:**
• Permanently delete your account and all associated data
• Remove specific proposals or resume information
• Request deletion of data from our AI training datasets
• Automated deletion of inactive accounts after 2 years

**Geographic Rights:**
• GDPR rights for EU residents (right to be forgotten, data portability, etc.)
• CCPA rights for California residents (right to know, delete, opt-out)
• LGPD compliance for Brazilian users
• Additional rights as required by local privacy laws`
        },
        {
            title: "Cookies & Tracking",
            icon: Cookie,
            content: `We use cookies and similar technologies to enhance your experience:

**Essential Cookies:**
• Authentication and session management
• Security features and fraud prevention
• Basic functionality and user preferences
• These cannot be disabled as they're necessary for core functionality

**Analytics Cookies:**
• Usage patterns and feature adoption
• Performance monitoring and error tracking
• A/B testing and feature optimization
• You can opt out of these while maintaining full functionality

**Chrome Extension Data:**
• Job posting content is processed locally when possible
• Form data is temporarily cached for auto-filling features
• No sensitive information is transmitted without encryption
• Data is deleted after successful form submission

**Cookie Management:**
• Configure your preferences in account settings
• Browser controls for cookie blocking and deletion
• Granular controls for different cookie categories
• Clear explanations of what each cookie type does

We respect "Do Not Track" signals and provide easy opt-out mechanisms.`
        },
        {
            title: "Data Retention",
            icon: Calendar,
            content: `We retain your information only as long as necessary:

**Active Accounts:**
• Account information retained while your account is active
• Resume data and proposals stored indefinitely for your access
• Usage analytics aggregated and anonymized after 2 years
• Payment information retained for 7 years for tax and legal requirements

**Inactive Accounts:**
• Accounts inactive for 2+ years receive deletion warnings
• Data automatically deleted after 3 years of inactivity
• You can request immediate deletion at any time
• Anonymized analytics may be retained for research purposes

**Deleted Accounts:**
• Personal information removed within 30 days of deletion request
• Anonymized data may be retained for AI improvement
• Legal obligations may require longer retention for some data types
• Backup systems purged within 90 days of deletion

**Business Records:**
• Financial records retained for 7 years per legal requirements
• Support communications retained for 3 years
• Security logs retained for 1 year for incident investigation
• Legal communications retained as required by law`
        },
        {
            title: "Children's Privacy",
            icon: Shield,
            content: `Protecting children's privacy is a top priority:

**Age Requirements:**
• Our service is designed for users 16 years and older
• Users under 18 require parental consent in some jurisdictions
• We do not knowingly collect information from children under 13
• Age verification is required during account creation

**Special Protections:**
• Enhanced privacy protections for users under 18
• Limited data collection and processing for minors
• Parental access rights where required by law
• Additional consent requirements for certain features

**Compliance:**
• COPPA compliance in the United States
• GDPR-K compliance in the European Union
• Additional protections as required by local laws
• Regular audits of age verification processes

If we discover that a child under 13 has provided personal information, we will immediately delete their account and all associated data.`
        }
    ];

    const dataTypes = [
        { icon: FileText, title: "Resume Content", description: "Encrypted, never shared with third parties" },
        { icon: Eye, title: "Usage Analytics", description: "Anonymized after 2 years" },
        { icon: Lock, title: "Account Info", description: "Secured with industry-standard encryption" },
        { icon: Globe, title: "AI Training Data", description: "Completely anonymized and aggregated" }
    ];

    return (
        <>
            <Head title="Privacy Policy - Propella">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            
            {/* Privacy-focused green gradient background */}
            <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950">
                {/* Subtle security-themed background elements */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl" />
                
                {/* Navigation */}
                <header className="relative z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-emerald-200/50 dark:border-emerald-800/50">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <Link href={route('welcome')} className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-emerald-500 font-medium">AI Workflow Automation</div>
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
                                    <Button asChild className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
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
                        <Badge className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 px-6 py-3">
                            <Shield className="h-4 w-4 mr-2" />
                            Privacy & Security
                        </Badge>
                        
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        
                        <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Your privacy is fundamental to everything we do. This policy explains how we collect, use, 
                            and protect your personal information with complete transparency and respect.
                        </p>

                        <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-12">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Last updated: January 15, 2025
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                                GDPR & CCPA Compliant
                            </div>
                        </div>

                        {/* Data Protection Highlights */}
                        <div className="grid md:grid-cols-4 gap-6 mb-12">
                            {dataTypes.map((item, index) => (
                                <Card key={item.title} className="text-center backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
                                    <CardHeader className="pb-3">
                                        <div className="mx-auto mb-3 p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg w-fit">
                                            <item.icon className="h-5 w-5 text-white" />
                                        </div>
                                        <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                            {item.title}
                                        </CardTitle>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Privacy Sections */}
                <section className="relative z-40 pb-20 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <Card key={section.title} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-4 text-2xl font-bold text-slate-800 dark:text-slate-200">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                                                <section.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                {section.title}
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            {section.content.split('\n\n').map((paragraph, pIndex) => (
                                                <div key={pIndex} className="mb-4 last:mb-0">
                                                    {paragraph.split('\n').map((line, lIndex) => {
                                                        if (line.startsWith('**') && line.endsWith('**')) {
                                                            return (
                                                                <h4 key={lIndex} className="font-bold text-lg text-slate-800 dark:text-slate-200 mt-6 mb-3 first:mt-0">
                                                                    {line.slice(2, -2)}
                                                                </h4>
                                                            );
                                                        }
                                                        if (line.startsWith('•')) {
                                                            return (
                                                                <div key={lIndex} className="flex items-start gap-3 mb-2">
                                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                                                                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                                                        {line.substring(2)}
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                        if (line.trim()) {
                                                            return (
                                                                <p key={lIndex} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2 last:mb-0">
                                                                    {line}
                                                                </p>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Data Rights Action Cards */}
                        <div className="mt-12 grid md:grid-cols-3 gap-6">
                            <Card className="backdrop-blur-sm bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-4 p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg w-fit">
                                        <Download className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        Export Your Data
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Download all your personal information in a portable format
                                    </p>
                                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                                        Request Export
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200/50 dark:border-red-800/50 shadow-lg">
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-4 p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg w-fit">
                                        <Trash2 className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                        Delete Account
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Permanently remove all your data from our systems
                                    </p>
                                    <Button variant="outline" className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
                                        Delete Data
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-4 p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg w-fit">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Privacy Questions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Contact our privacy team with any concerns or questions
                                    </p>
                                    <Button variant="outline" className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                        Contact Privacy Team
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Section */}
                        <Card className="mt-12 backdrop-blur-sm bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-4 text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    Privacy Officer Contact
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                    For any privacy-related questions, concerns, or requests regarding your personal data, 
                                    please contact our dedicated Privacy Officer who will respond within 48 hours.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg">
                                        <Link href="/contact">
                                            Contact Privacy Officer
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild className="border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                                        <Link href="/terms">
                                            View Terms of Service
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t border-emerald-200/50 dark:border-emerald-800/50 py-8">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <Link href={route('welcome')} className="flex items-center gap-4 mb-6 md:mb-0">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-emerald-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </Link>
                            
                            <div className="text-slate-600 dark:text-slate-400 text-center md:text-right">
                                <p>&copy; 2025 Propella. Privacy-first AI automation.</p>
                                <div className="flex gap-4 mt-2 text-sm justify-center md:justify-end">
                                    <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms</Link>
                                    <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</Link>
                                    <Link href={route('welcome')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}