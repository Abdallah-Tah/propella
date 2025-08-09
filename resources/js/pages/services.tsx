import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  ArrowRight,
  CheckCircle,
  Crown,
  Users,
  Star,
  Rocket,
  BrainCircuit,
  Zap,
  Target,
  BarChart3,
  Shield,
  Globe,
  MessageSquare,
  FileText,
  Briefcase,
  Clock,
  TrendingUp,
  Award,
  Sparkles,
  Bot,
  Search,
  Eye,
  Heart,
  Lightbulb,
  Coffee
} from 'lucide-react';

export default function Services() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: BrainCircuit,
            title: "AI-Powered Proposal Generation",
            description: "Advanced AI analyzes job postings and generates winning proposals tailored to client psychology",
            features: [
                "Context-aware proposal writing",
                "Industry-specific language patterns", 
                "Client psychology optimization",
                "Multi-language support",
                "Tone and style customization"
            ],
            color: "from-purple-500 to-blue-600"
        },
        {
            icon: Zap,
            title: "Smart Form Auto-Fill",
            description: "Chrome extension automatically populates entire Upwork application forms with intelligent data",
            features: [
                "One-click form completion",
                "Smart field detection",
                "Portfolio item suggestions",
                "Rate optimization",
                "Availability management"
            ],
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: MessageSquare,
            title: "Screening Question Answers",
            description: "AI generates perfect answers to screening questions using your resume and expertise",
            features: [
                "Intelligent answer generation",
                "Answer caching and reuse",
                "Success rate tracking",
                "Custom answer templates",
                "A/B testing capabilities"
            ],
            color: "from-cyan-500 to-green-600"
        },
        {
            icon: Briefcase,
            title: "Smart Portfolio Management",
            description: "Automatically suggest and organize portfolio items that match specific job requirements",
            features: [
                "Relevance scoring",
                "Auto-categorization",
                "Performance tracking",
                "Smart recommendations",
                "Version control"
            ],
            color: "from-green-500 to-yellow-600"
        },
        {
            icon: Search,
            title: "Job Discovery & Matching",
            description: "AI monitors Upwork and finds perfect job opportunities based on your skills and success patterns",
            features: [
                "Real-time job monitoring",
                "Smart match scoring",
                "Custom alerts",
                "Competition analysis",
                "Opportunity insights"
            ],
            color: "from-yellow-500 to-orange-600"
        },
        {
            icon: BarChart3,
            title: "Success Analytics & Tracking",
            description: "Comprehensive insights into your proposal performance and win rate optimization",
            features: [
                "Win rate analytics",
                "Revenue tracking",
                "Performance insights",
                "A/B testing results",
                "ROI calculations"
            ],
            color: "from-orange-500 to-red-600"
        }
    ];

    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started",
            badge: "Get Started",
            badgeColor: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
            features: [
                "10 AI proposals per month",
                "Basic resume integration", 
                "Standard proposal templates",
                "Email support",
                "Basic analytics"
            ],
            limitations: [
                "No auto-fill capabilities",
                "No screening questions",
                "No job matching",
                "Limited customization"
            ],
            cta: "Start Free",
            ctaVariant: "outline" as const,
            popular: false
        },
        {
            name: "Pro",
            price: "$19",
            period: "per month",
            description: "For serious freelancers",
            badge: "Most Popular",
            badgeColor: "bg-gradient-to-r from-purple-600 to-blue-600 text-white",
            features: [
                "Unlimited AI proposals",
                "Smart form auto-fill",
                "Screening question answers",
                "Portfolio management",
                "Job discovery & matching",
                "Success analytics",
                "Priority support",
                "Advanced customization",
                "A/B testing",
                "Chrome extension"
            ],
            limitations: [],
            cta: "Upgrade to Pro",
            ctaVariant: "default" as const,
            popular: true
        },
        {
            name: "Agency",
            price: "$49", 
            period: "per month",
            description: "For teams and agencies",
            badge: "Team Plan",
            badgeColor: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
            features: [
                "Everything in Pro",
                "5 team members included",
                "Shared templates library",
                "Team performance analytics",
                "Advanced reporting",
                "White-label options",
                "Custom integrations",
                "Dedicated success manager",
                "Training and onboarding"
            ],
            limitations: [],
            cta: "Contact Sales",
            ctaVariant: "outline" as const,
            popular: false
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Full-Stack Developer", 
            avatar: "SJ",
            gradient: "from-purple-500 to-blue-600",
            rating: 5,
            text: "Propella increased my proposal response rate from 15% to 65%. I'm now spending 5 minutes on applications instead of 2 hours. Game changer!"
        },
        {
            name: "Marcus Rodriguez",
            role: "Digital Marketing Expert",
            avatar: "MR", 
            gradient: "from-blue-500 to-cyan-600",
            rating: 5,
            text: "The AI understands client psychology better than I do. My proposals now sound like they're written by someone with 20 years of experience."
        },
        {
            name: "Elena Chen",
            role: "UX/UI Designer",
            avatar: "EC",
            gradient: "from-cyan-500 to-green-600", 
            rating: 5,
            text: "I've won 3x more projects since using Propella. The auto-fill feature alone saves me 10+ hours per week. Worth every penny."
        }
    ];

    const faqs = [
        {
            question: "How does the AI proposal generation work?",
            answer: "Our AI analyzes the job posting, understands client psychology, and generates personalized proposals using your resume context and proven winning patterns. It adapts tone, style, and content to match what clients are looking for."
        },
        {
            question: "Is the Chrome extension safe to use?",
            answer: "Yes, absolutely. Our extension only reads publicly available job data and never accesses your personal information or passwords. All data is encrypted and processed securely."
        },
        {
            question: "Can I customize the generated proposals?",
            answer: "Definitely! Every proposal can be edited and customized. You can also save custom templates, adjust tone and style preferences, and teach the AI your specific writing style."
        },
        {
            question: "How much time will I actually save?",
            answer: "Most users save 90-95% of their proposal writing time. Instead of spending 30-60 minutes per proposal, you'll spend 2-5 minutes reviewing and customizing before submission."
        },
        {
            question: "What about the screening questions?",
            answer: "Our AI generates intelligent answers to screening questions based on your resume and expertise. Answers are cached and reused when similar questions appear, saving even more time."
        },
        {
            question: "Can I cancel anytime?",
            answer: "Yes, you can cancel your subscription at any time. No long-term contracts, no cancellation fees. Your data remains accessible during your billing period."
        }
    ];

    return (
        <>
            <Head title="Services & Features - Propella AI Workflow Automation">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800,900" rel="stylesheet" />
            </Head>
            
            {/* Beautiful gradient background */}
            <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-slate-950 dark:via-orange-950 dark:to-rose-950 overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse delay-500" />
                
                {/* Navigation */}
                <header className="relative z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-rose-200/50 dark:border-rose-800/50">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <Link href={route('welcome')} className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 shadow-lg transform hover:scale-105 transition-all duration-300">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-rose-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </Link>
                            
                            <div className="flex items-center gap-6">
                                <nav className="hidden md:flex items-center gap-8">
                                    <Link href={route('welcome')} className="text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium">Home</Link>
                                    <a href="#features" className="text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium">Features</a>
                                    <a href="#pricing" className="text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium">Pricing</a>
                                    <a href="#faq" className="text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium">FAQ</a>
                                </nav>
                                
                                {auth.user ? (
                                    <Button asChild className="bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                                        <Link href={route('dashboard')}>
                                            Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button asChild className="bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                                        <Link href={route('register')}>
                                            Get Started Free
                                            <Rocket className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative z-40 py-20 px-6">
                    <div className="container mx-auto max-w-6xl text-center">
                        <Badge className="mb-8 bg-gradient-to-r from-rose-600 to-orange-600 text-white border-0 px-6 py-3 text-sm font-semibold shadow-lg">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Complete Workflow Automation
                        </Badge>
                        
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                            <span className="block bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">Every Feature You Need</span>
                            <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">to Dominate Upwork</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                            From AI-powered proposals to smart form filling, comprehensive analytics to team collaboration — 
                            everything you need to transform your freelancing success.
                        </p>

                        <Button size="lg" asChild className="text-xl px-12 py-4 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                            <Link href="#features">
                                Explore Features
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative z-40 py-16 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-orange-600 to-red-600 text-white border-0 px-4 py-2">
                                <Bot className="h-4 w-4 mr-2" />
                                Features
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Powerful Automation Tools</h2>
                            <p className="text-slate-700 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                                Each feature is designed to eliminate repetitive tasks and maximize your success rate on Upwork
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-16">
                            {features.map((feature, index) => (
                                <Card key={feature.title} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-rose-200/50 dark:border-rose-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                                    <CardHeader>
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} w-fit shadow-lg mb-4`}>
                                            <feature.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-slate-400">
                                            {feature.title}
                                        </CardTitle>
                                        <CardDescription className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-2">
                                            {feature.features.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center gap-3">
                                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="relative z-40 py-16 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 px-4 py-2">
                                <Heart className="h-4 w-4 mr-2" />
                                Testimonials
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Loved by Freelancers</h2>
                            <p className="text-slate-700 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                                See how Propella has transformed the careers of freelancers worldwide
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={testimonial.name} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-green-200/50 dark:border-green-800/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <CardHeader>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold shadow-lg`}>
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-slate-200">{testimonial.name}</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                        
                                        <CardDescription className="text-base text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                            "{testimonial.text}"
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="relative z-40 py-16 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2">
                                <Award className="h-4 w-4 mr-2" />
                                Pricing
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Simple, Transparent Pricing</h2>
                            <p className="text-slate-700 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                                Choose the plan that fits your needs. Upgrade or downgrade anytime with no long-term commitments.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {plans.map((plan, index) => (
                                <Card key={plan.name} className={`relative backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 shadow-xl transition-all duration-300 transform hover:scale-105 ${plan.popular ? 'border-2 border-purple-500 scale-105' : 'border border-purple-200/50 dark:border-purple-800/50'}`}>
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <Badge className={plan.badgeColor}>
                                                <Crown className="h-4 w-4 mr-1" />
                                                {plan.badge}
                                            </Badge>
                                        </div>
                                    )}
                                    
                                    <CardHeader className={`text-center ${plan.popular ? 'pt-8' : 'pt-6'}`}>
                                        {!plan.popular && (
                                            <Badge className={`${plan.badgeColor} w-fit mx-auto mb-4`}>
                                                {plan.badge}
                                            </Badge>
                                        )}
                                        <CardTitle className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                                            {plan.price}<span className="text-base font-medium text-slate-500">/{plan.period}</span>
                                        </CardTitle>
                                        <CardDescription className="text-slate-600 dark:text-slate-400 mb-6">
                                            {plan.description}
                                        </CardDescription>
                                    </CardHeader>
                                    
                                    <CardContent>
                                        <ul className="space-y-3 mb-8">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                            {plan.limitations.map((limitation, limitationIndex) => (
                                                <li key={limitationIndex} className="flex items-center gap-3 text-slate-500 dark:text-slate-500">
                                                    <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                                                    {limitation}
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <Button 
                                            asChild 
                                            variant={plan.ctaVariant}
                                            className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg' : ''}`}
                                        >
                                            <Link href={auth.user ? route('dashboard') : route('register')}>
                                                {plan.cta}
                                                {plan.popular && <Rocket className="ml-2 h-4 w-4" />}
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="relative z-40 py-16 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-4 py-2">
                                <Lightbulb className="h-4 w-4 mr-2" />
                                FAQ
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
                            <p className="text-slate-700 dark:text-slate-300 text-xl">
                                Everything you need to know about Propella and how it works
                            </p>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <Card key={index} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                                            {faq.question}
                                        </CardTitle>
                                        <CardDescription className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {faq.answer}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative z-40 py-20 px-6">
                    <div className="container mx-auto max-w-4xl text-center">
                        <div className="backdrop-blur-sm bg-gradient-to-br from-rose-100/80 to-orange-100/80 dark:from-rose-900/20 dark:to-orange-900/20 rounded-3xl p-12 border border-rose-200/50 dark:border-rose-800/50">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">Ready to Transform Your Freelancing?</h2>
                            <p className="text-slate-700 dark:text-slate-300 mb-12 text-xl leading-relaxed max-w-3xl mx-auto">
                                Join thousands of successful freelancers who have revolutionized their Upwork experience with Propella. 
                                Start your free trial today and see the difference AI-powered automation can make.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {auth.user ? (
                                    <Button size="lg" asChild className="text-xl px-12 py-4 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                        <Link href={route('dashboard')}>
                                            <Rocket className="mr-3 h-6 w-6" />
                                            Go to Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button size="lg" asChild className="text-xl px-12 py-4 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                            <Link href={route('register')}>
                                                Start Free Trial
                                                <Rocket className="ml-3 h-6 w-6" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" asChild className="text-xl px-12 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 shadow-lg">
                                            <Link href={route('welcome')}>
                                                <Coffee className="mr-3 h-6 w-6" />
                                                Schedule Demo
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-t border-rose-200/50 dark:border-rose-800/50 py-12">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <Link href={route('welcome')} className="flex items-center gap-4 mb-6 md:mb-0">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 shadow-lg">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-rose-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </Link>
                            
                            <p className="text-slate-600 dark:text-slate-400 text-center md:text-right">
                                &copy; 2025 Propella. Empowering freelancers worldwide.<br />
                                <span className="text-sm">Built with ❤️ for the global freelance community.</span>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}