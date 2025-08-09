import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Zap, 
  Target, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Crown,
  Rocket,
  Shield,
  Users,
  Star,
  Globe,
  BarChart3,
  Clock,
  Bot,
  BrainCircuit,
  Award,
  FileText,
  MessageSquare,
  Briefcase,
  TrendingDown
} from 'lucide-react';

export default function WelcomeSpectacular() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Propella - Complete Upwork Automation Platform">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800,900" rel="stylesheet" />
            </Head>
            
            {/* Stunning gradient background with animated elements */}
            <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-purple-950 dark:to-blue-950 overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-500" />
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-300" />
                    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-700" />
                </div>
                
                {/* Elegant Navigation */}
                <header className="relative z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-purple-200/50 dark:border-purple-800/50">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Colorful animated logo */}
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg transform hover:scale-105 transition-all duration-300">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-purple-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <nav className="hidden md:flex items-center gap-8">
                                    <a href="#features" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Features</a>
                                    <a href="#pricing" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Pricing</a>
                                    <a href="#about" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">About</a>
                                </nav>
                                
                                {auth.user ? (
                                    <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                                        <Link href={route('dashboard')}>
                                            <BarChart3 className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" asChild className="text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400">
                                            <Link href={route('login')}>Sign In</Link>
                                        </Button>
                                        <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                                            <Link href={route('register')}>
                                                Get Started Free
                                                <Rocket className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative z-40 py-20 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <Badge className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-6 py-3 text-sm font-semibold shadow-lg">
                                <BrainCircuit className="h-4 w-4 mr-2" />
                                Complete Upwork Workflow Automation
                            </Badge>
                            
                            {/* Spectacular gradient hero text */}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">From Job Discovery</span>
                                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">to Proposal Submission</span>
                                <span className="block mt-4 text-4xl md:text-6xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    in 60 Seconds
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                                The world's most advanced Upwork automation platform. AI-powered proposals, 
                                smart form filling, screening questions, portfolio matching, and success tracking 
                                — all in one beautiful interface.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                                {auth.user ? (
                                    <Button size="lg" asChild className="text-lg px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                        <Link href={route('proposals.index')}>
                                            <Wand2 className="mr-3 h-6 w-6" />
                                            Create Proposal Now
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button size="lg" asChild className="text-lg px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                            <Link href={route('register')}>
                                                Start Free Trial
                                                <Rocket className="ml-3 h-6 w-6" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" asChild className="text-lg px-12 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 shadow-lg">
                                            <Link href="#demo">
                                                <Globe className="mr-3 h-5 w-5" />
                                                Watch Demo
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                                <div className="text-center p-4">
                                    <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">95%</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Time Saved</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">3x</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Higher Win Rate</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">10k+</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Freelancers</div>
                                </div>
                                <div className="text-center p-4">
                                    <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">$2M+</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Earned</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Showcase Grid */}
                        <div id="features" className="grid lg:grid-cols-3 gap-8 mb-20">
                            {/* AI Proposals */}
                            <Card className="relative overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-purple-200/50 dark:border-purple-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full -mr-16 -mt-16" />
                                <CardHeader className="pb-6">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 w-fit shadow-lg">
                                        <BrainCircuit className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI-Powered Proposals</CardTitle>
                                    <CardDescription className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        Generate winning proposals in seconds using advanced AI that understands client psychology and market trends
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Personalized for each job posting
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Industry-specific language patterns
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Optimized for higher response rates
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                            
                            {/* Smart Form Filling */}
                            <Card className="relative overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-blue-200/50 dark:border-blue-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full -mr-16 -mt-16" />
                                <CardHeader className="pb-6">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 w-fit shadow-lg">
                                        <Zap className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Smart Auto-Fill</CardTitle>
                                    <CardDescription className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        Automatically populate entire Upwork application forms with intelligent data extraction and form recognition
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            One-click form completion
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slave-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Screening questions answered
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Portfolio items suggested
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                            
                            {/* Success Tracking */}
                            <Card className="relative overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-cyan-200/50 dark:border-cyan-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-full -mr-16 -mt-16" />
                                <CardHeader className="pb-6">
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-green-600 w-fit shadow-lg">
                                        <BarChart3 className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">Success Analytics</CardTitle>
                                    <CardDescription className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        Track your wins, analyze performance patterns, and optimize your approach with detailed insights
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Win rate optimization
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Revenue tracking
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Performance insights
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* How It Works - Enhanced */}
                        <div className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-12 md:p-16 border border-purple-200/50 dark:border-purple-800/50 shadow-2xl mb-20">
                            <div className="text-center mb-16">
                                <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2">
                                    <Rocket className="h-4 w-4 mr-2" />
                                    Workflow
                                </Badge>
                                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">How It Works</h2>
                                <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
                                    From discovering the perfect job to submitting a winning application in under 60 seconds
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-4 gap-8">
                                <div className="text-center group">
                                    <div className="mb-6 mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-xl transform group-hover:scale-110 transition-all duration-300">
                                        <Globe className="h-10 w-10" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-4 text-slate-800 dark:text-slate-200">Job Discovery</h3>
                                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                        AI monitors Upwork and suggests perfect-match opportunities based on your skills
                                    </p>
                                </div>
                                
                                <div className="text-center group">
                                    <div className="mb-6 mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-xl transform group-hover:scale-110 transition-all duration-300">
                                        <BrainCircuit className="h-10 w-10" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-4 text-slate-800 dark:text-slate-200">AI Analysis</h3>
                                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Advanced AI analyzes job requirements and generates tailored proposals + screening answers
                                    </p>
                                </div>
                                
                                <div className="text-center group">
                                    <div className="mb-6 mx-auto w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-xl transform group-hover:scale-110 transition-all duration-300">
                                        <Zap className="h-10 w-10" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-4 text-slate-800 dark:text-slate-200">Auto-Fill</h3>
                                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Chrome extension automatically fills entire application forms with perfect data
                                    </p>
                                </div>
                                
                                <div className="text-center group">
                                    <div className="mb-6 mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-xl transform group-hover:scale-110 transition-all duration-300">
                                        <Award className="h-10 w-10" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-4 text-slate-800 dark:text-slate-200">Win & Track</h3>
                                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Submit and track success rates with intelligent analytics and optimization
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <section id="pricing" className="py-16">
                            <div className="text-center mb-16">
                                <Badge className="mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 px-4 py-2">
                                    Pricing
                                </Badge>
                                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Simple, Transparent Plans</h2>
                                <p className="text-slate-700 dark:text-slate-300 text-xl max-w-2xl mx-auto">Start free, upgrade when you're winning more projects. No hidden fees, cancel anytime.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {/* Free Plan */}
                                <Card className="relative backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <CardHeader className="text-center pb-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold mb-4">Free</div>
                                        <CardTitle className="text-4xl font-black text-slate-900 dark:text-white">$0<span className="text-base font-medium text-slate-500">/month</span></CardTitle>
                                        <CardDescription className="text-slate-600 dark:text-slate-400">Perfect for getting started</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-3 mb-8">
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                10 AI proposals per month
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Basic resume integration
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Standard support
                                            </li>
                                        </ul>
                                        <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                            <Link href={auth.user ? route('dashboard') : route('register')}>
                                                Start Free
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Pro Plan - Featured */}
                                <Card className="relative backdrop-blur-sm bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-500 shadow-2xl transform scale-105">
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-6 py-2">
                                            <Crown className="h-4 w-4 mr-1" />
                                            Most Popular
                                        </Badge>
                                    </div>
                                    <CardHeader className="text-center pb-4 pt-8">
                                        <CardTitle className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$19<span className="text-base font-medium text-slate-500">/month</span></CardTitle>
                                        <CardDescription className="text-slate-600 dark:text-slate-400">For serious freelancers</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-3 mb-8">
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Unlimited AI proposals
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Smart form auto-fill
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Screening question answers
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Portfolio management
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Success analytics
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Priority support
                                            </li>
                                        </ul>
                                        <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                                            <Link href={auth.user ? route('dashboard') : route('register')}>
                                                Upgrade to Pro
                                                <Rocket className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Agency Plan */}
                                <Card className="relative backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-orange-200 dark:border-orange-800 shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <CardHeader className="text-center pb-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-4">
                                            <Users className="h-4 w-4" />
                                            Agency
                                        </div>
                                        <CardTitle className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">$49<span className="text-base font-medium text-slate-500">/month</span></CardTitle>
                                        <CardDescription className="text-slate-600 dark:text-slate-400">For teams and agencies</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-3 mb-8">
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Everything in Pro
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                5 team members
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Shared templates
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                Team analytics
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                White-label options
                                            </li>
                                        </ul>
                                        <Button asChild variant="outline" className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                                            <Link href={auth.user ? route('dashboard') : route('register')}>
                                                Contact Sales
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="text-center py-20">
                                <div className="backdrop-blur-sm bg-gradient-to-br from-purple-100/80 to-blue-100/80 dark:from-purple-900/20 dark:to-blue-900/20 rounded-3xl p-12 border border-purple-200/50 dark:border-purple-800/50">
                                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Ready to 10x Your Upwork Success?</h2>
                                    <p className="text-slate-700 dark:text-slate-300 mb-12 text-xl leading-relaxed max-w-3xl mx-auto">
                                        Join over 10,000 freelancers who have transformed their Upwork experience with Propella. 
                                        Start winning more projects today.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button size="lg" asChild className="text-xl px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                            <Link href={route('register')}>
                                                Start Your Free Trial
                                                <Rocket className="ml-3 h-6 w-6" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" asChild className="text-xl px-12 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 shadow-lg">
                                            <Link href="#demo">
                                                <Globe className="mr-3 h-6 w-6" />
                                                Schedule Demo
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer id="about" className="relative z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-t border-purple-200/50 dark:border-purple-800/50 py-16">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid md:grid-cols-4 gap-8 mb-12">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
                                        <Wand2 className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Propella</span>
                                        <div className="text-xs text-purple-500 font-medium">AI Workflow Automation</div>
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                                    Transforming the freelance experience with AI-powered workflow automation. 
                                    From job discovery to proposal submission in 60 seconds.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Product</h4>
                                <ul className="space-y-2">
                                    <li><a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Features</a></li>
                                    <li><a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Pricing</a></li>
                                    <li><a href="#demo" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Demo</a></li>
                                    <li><Link href={route('register')} className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Get Started</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Company</h4>
                                <ul className="space-y-2">
                                    <li><a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About</a></li>
                                    <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Contact</a></li>
                                    <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy</a></li>
                                    <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
                            <p className="text-slate-600 dark:text-slate-400">
                                &copy; 2025 Propella. Built with ❤️ using Laravel & React. Transforming freelance success worldwide.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}