import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Wand2, 
  ArrowLeft,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  HeadphonesIcon,
  MessageCircle,
  LifeBuoy,
  Users,
  Globe,
  Heart,
  Coffee,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const { auth } = usePage<SharedData>().props;
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { data, setData, post, processing } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        company: '',
        subject: '',
        category: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('contact.submit'), {
            onSuccess: () => {
                setIsSubmitted(true);
            },
        });
    };

    const contactMethods = [
        {
            icon: Mail,
            title: "Email Support",
            description: "Get help via email",
            contact: "support@propella.ai",
            response: "Within 24 hours",
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Chat with our team",
            contact: "Available 9 AM - 6 PM EST",
            response: "Instant response",
            color: "from-green-500 to-teal-600"
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Call us directly",
            contact: "+1 (555) 123-4567",
            response: "Business hours only",
            color: "from-purple-500 to-indigo-600"
        }
    ];

    const supportTypes = [
        {
            icon: LifeBuoy,
            title: "Technical Support",
            description: "Issues with the platform, Chrome extension, or AI features",
            color: "from-red-500 to-orange-600"
        },
        {
            icon: Users,
            title: "Sales & Billing",
            description: "Questions about pricing, subscriptions, or account management",
            color: "from-indigo-500 to-purple-600"
        },
        {
            icon: Sparkles,
            title: "Feature Requests",
            description: "Suggestions for new features or improvements",
            color: "from-cyan-500 to-blue-600"
        },
        {
            icon: HeadphonesIcon,
            title: "General Inquiry",
            description: "Partnership opportunities, media requests, or other questions",
            color: "from-green-500 to-emerald-600"
        }
    ];

    const officeInfo = [
        {
            icon: MapPin,
            title: "Headquarters",
            details: ["123 Innovation Street", "San Francisco, CA 94105", "United States"]
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Monday - Friday: 9:00 AM - 6:00 PM (EST)", "Weekend: Limited support", "Holidays: Closed"]
        },
        {
            icon: Globe,
            title: "Global Presence",
            details: ["Available worldwide", "24/7 platform access", "Multi-timezone support"]
        }
    ];

    return (
        <>
            <Head title="Contact Us - Propella Support">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            
            {/* Contact-themed gradient background */}
            <div className="relative min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-slate-950 dark:via-violet-950 dark:to-purple-950 overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-fuchsia-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-gradient-to-br from-fuchsia-400/20 to-violet-400/20 rounded-full blur-3xl animate-pulse delay-500" />
                
                {/* Navigation */}
                <header className="relative z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-violet-200/50 dark:border-violet-800/50">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <Link href={route('welcome')} className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-violet-500 font-medium">AI Workflow Automation</div>
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
                                    <Button asChild className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
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
                        <Badge className="mb-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0 px-6 py-3">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Get in Touch
                        </Badge>
                        
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            We're Here to Help
                        </h1>
                        
                        <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Have questions about Propella? Need technical support? Want to explore partnership opportunities? 
                            Our team is ready to assist you with anything you need.
                        </p>

                        {/* Quick Contact Methods */}
                        <div className="grid md:grid-cols-3 gap-6 mb-16">
                            {contactMethods.map((method, index) => (
                                <Card key={method.title} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-violet-200/50 dark:border-violet-800/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    <CardHeader className="text-center pb-3">
                                        <div className={`mx-auto mb-4 p-3 rounded-xl bg-gradient-to-br ${method.color} shadow-lg w-fit`}>
                                            <method.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">
                                            {method.title}
                                        </CardTitle>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {method.description}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="text-center pt-0">
                                        <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            {method.contact}
                                        </p>
                                        <Badge variant="secondary" className="bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800">
                                            {method.response}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content - Form and Info */}
                <section className="relative z-40 pb-20 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-violet-200/50 dark:border-violet-800/50 shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-4 text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                                            <Send className="h-6 w-6 text-white" />
                                        </div>
                                        Send us a Message
                                    </CardTitle>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    {isSubmitted ? (
                                        <div className="text-center py-8">
                                            <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg w-fit">
                                                <CheckCircle className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Message Sent!</h3>
                                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                                Thank you for contacting us. We'll get back to you within 24 hours.
                                            </p>
                                            <Button 
                                                onClick={() => setIsSubmitted(false)}
                                                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                                            >
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name *</Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        placeholder="John Doe"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        required
                                                        className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address *</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        required
                                                        className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="company">Company (Optional)</Label>
                                                    <Input
                                                        id="company"
                                                        type="text"
                                                        placeholder="Acme Inc."
                                                        value={data.company}
                                                        onChange={(e) => setData('company', e.target.value)}
                                                        className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="category">Category *</Label>
                                                    <Select value={data.category} onValueChange={(value) => setData('category', value)} required>
                                                        <SelectTrigger className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400">
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="technical">Technical Support</SelectItem>
                                                            <SelectItem value="billing">Sales & Billing</SelectItem>
                                                            <SelectItem value="feature">Feature Request</SelectItem>
                                                            <SelectItem value="partnership">Partnership</SelectItem>
                                                            <SelectItem value="general">General Inquiry</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="subject">Subject *</Label>
                                                <Input
                                                    id="subject"
                                                    type="text"
                                                    placeholder="How can we help you?"
                                                    value={data.subject}
                                                    onChange={(e) => setData('subject', e.target.value)}
                                                    required
                                                    className="border-violet-200 dark:border-violet-800 focus:border-violet-500 dark:focus:border-violet-400"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message">Message *</Label>
                                                <textarea
                                                    id="message"
                                                    rows={6}
                                                    placeholder="Tell us more about your question or request..."
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border border-violet-200 dark:border-violet-800 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent dark:bg-slate-900 dark:text-white resize-none"
                                                />
                                            </div>

                                            <Button 
                                                type="submit" 
                                                disabled={processing}
                                                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Support Information */}
                            <div className="space-y-8">
                                {/* Support Types */}
                                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-violet-200/50 dark:border-violet-800/50 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-4 text-xl font-bold text-slate-800 dark:text-slate-200">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                                                <LifeBuoy className="h-5 w-5 text-white" />
                                            </div>
                                            How Can We Help?
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {supportTypes.map((type, index) => (
                                                <div key={type.title} className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-white/50 to-violet-50/50 dark:from-slate-800/50 dark:to-violet-900/20">
                                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${type.color} shadow-lg flex-shrink-0`}>
                                                        <type.icon className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{type.title}</h4>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">{type.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Office Information */}
                                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-violet-200/50 dark:border-violet-800/50 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-4 text-xl font-bold text-slate-800 dark:text-slate-200">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                                                <MapPin className="h-5 w-5 text-white" />
                                            </div>
                                            Office Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {officeInfo.map((info, index) => (
                                                <div key={info.title} className="flex items-start gap-4">
                                                    <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg flex-shrink-0">
                                                        <info.icon className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{info.title}</h4>
                                                        <div className="space-y-1">
                                                            {info.details.map((detail, detailIndex) => (
                                                                <p key={detailIndex} className="text-sm text-slate-600 dark:text-slate-400">{detail}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* FAQ Quick Links */}
                                <Card className="backdrop-blur-sm bg-gradient-to-br from-violet-50/80 to-purple-50/80 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200/50 dark:border-violet-800/50 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-4 text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                                                <Coffee className="h-5 w-5 text-white" />
                                            </div>
                                            Quick Resources
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                                            Before reaching out, you might find what you're looking for in our resources:
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <Button variant="outline" size="sm" asChild className="border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20">
                                                <Link href="/services#faq">FAQ</Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild className="border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20">
                                                <Link href="/services">Features</Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild className="border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20">
                                                <Link href="/privacy">Privacy</Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild className="border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20">
                                                <Link href="/terms">Terms</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t border-violet-200/50 dark:border-violet-800/50 py-8">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <Link href={route('welcome')} className="flex items-center gap-4 mb-6 md:mb-0">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-violet-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </Link>
                            
                            <div className="text-slate-600 dark:text-slate-400 text-center md:text-right">
                                <p className="flex items-center justify-center md:justify-end gap-2">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    &copy; 2025 Propella. We're here to help!
                                </p>
                                <div className="flex gap-4 mt-2 text-sm justify-center md:justify-end">
                                    <Link href="/terms" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Terms</Link>
                                    <Link href="/privacy" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Privacy</Link>
                                    <Link href={route('welcome')} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}