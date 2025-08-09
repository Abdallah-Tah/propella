import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Zap, 
  Target, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Crown
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Propella - AI Proposal Generator">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* use softer branded background for better contrast */}
            <div className="relative min-h-screen bg-app-gradient">
                {/* tone down grid noise */}
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-0 hero-spotlight" />
                {/* optional colorful overlays */}
                <div className="hero-accents" />
                
                {/* Navigation */}
                <header className="relative z-10 glass-keynote border-b border-white/20">
                    <div className="container mx-auto px-4 py-6">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* adaptive icon bg & color */}
                                <div className="p-3 rounded-xl backdrop-blur-sm bg-primary/10 dark:bg-white/20">
                                    <Wand2 className="h-7 w-7 text-primary dark:text-white" />
                                </div>
                                <span className="font-bold text-2xl text-gray-900 dark:text-white">Propella</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-white/20 dark:hover:bg-white/30 dark:text-white border-transparent dark:border-white/30">
                                        <Link href={route('dashboard')}>
                                            Dashboard
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" asChild className="text-gray-700 hover:bg-slate-100 dark:text-white dark:hover:bg-white/10">
                                            <Link href={route('login')}>Log in</Link>
                                        </Button>
                                        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-white/20 dark:hover:bg-white/30 dark:text-white border-transparent dark:border-white/30">
                                            <Link href={route('register')}>
                                                Get Started
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative z-10 py-32 px-4">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-20">
                            <Badge variant="secondary" className="mb-6 bg-white/60 text-gray-900 border-white/70 backdrop-blur-sm px-4 py-2 dark:bg-white/20 dark:text-white dark:border-white/30">
                                <Sparkles className="h-4 w-4 mr-2" />
                                AI-Powered Proposal Generator
                            </Badge>
                            
                            {/* make hero text dark in light mode for readability */}
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                                <span className="block text-gray-900 dark:text-white">Win More</span>
                                <span className="block text-gray-900 dark:text-white">Upwork Projects</span>
                                <span className="block mt-2 text-gradient-blue">with AI Proposals</span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-gray-700 dark:text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                                Transform job postings into winning proposals in seconds. Our AI understands 
                                what clients want and crafts personalized proposals that get you hired.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                {auth.user ? (
                                    <Button size="lg" asChild className="text-lg px-12 py-4 btn-gradient font-semibold">
                                        <Link href={route('proposals.index')}>
                                            <Wand2 className="mr-3 h-6 w-6" />
                                            Create Proposal
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button size="lg" asChild className="text-lg px-12 py-4 btn-gradient font-semibold">
                                            <Link href={route('register')}>
                                                Start Free
                                                <ArrowRight className="ml-3 h-6 w-6" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" asChild className="text-lg px-12 py-4 bg-white/60 text-gray-900 border-white/80 hover:bg-white/70 backdrop-blur-sm dark:bg-white/10 dark:text-white dark:border-white/30 dark:hover:bg-white/20">
                                            <Link href={route('login')}>
                                                Sign In
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-20">
                            <Card className="text-center card-gradient p-8">
                                <CardHeader className="pb-6">
                                    <div className="mx-auto mb-6 p-4 icon-burst rounded-2xl w-fit">
                                        <Target className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-xl mb-4 text-gray-900 dark:text-white">Tailored to Each Job</CardTitle>
                                    <CardDescription className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                        AI analyzes job requirements and creates proposals that directly address client needs with precision
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            
                            <Card className="text-center card-gradient p-8">
                                <CardHeader className="pb-6">
                                    <div className="mx-auto mb-6 p-4 icon-burst rounded-2xl w-fit">
                                        <Zap className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-xl mb-4 text-gray-900 dark:text-white">Lightning Fast</CardTitle>
                                    <CardDescription className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Generate professional proposals in under 30 seconds instead of spending hours writing them
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            
                            <Card className="text-center card-gradient p-8">
                                <CardHeader className="pb-6">
                                    <div className="mx-auto mb-6 p-4 icon-burst rounded-2xl w-fit">
                                        <TrendingUp className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-xl mb-4 text-gray-900 dark:text-white">Higher Win Rate</CardTitle>
                                    <CardDescription className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Proven strategies and language patterns that significantly increase your chances of getting hired
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Process Steps */}
                        <div className="card-keynote rounded-3xl p-12 md:p-16">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">How It Works</h2>
                                <p className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
                                    From job posting to winning proposal in 3 simple steps
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-12">
                                <div className="text-center">
                                    <div className="mb-6 mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl">
                                        1
                                    </div>
                                    <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Paste Job Details</h3>
                                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Copy the job posting from Upwork and paste it into our intelligent form
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="mb-6 mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl">
                                        2
                                    </div>
                                    <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">AI Generates</h3>
                                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Our advanced AI analyzes requirements and creates a personalized winning proposal
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="mb-6 mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl">
                                        3
                                    </div>
                                    <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Copy & Submit</h3>
                                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Review, customize your proposal, and submit it to win the project confidently
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <section className="relative z-10 py-24 px-4" id="pricing">
                            <div className="container mx-auto max-w-7xl">
                                <div className="text-center mb-12">
                                    <Badge variant="secondary" className="mb-4 bg-white/60 text-gray-900 border-white/70 backdrop-blur-sm px-4 py-1.5 dark:bg-white/20 dark:text-white dark:border-white/30">
                                        Pricing
                                    </Badge>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Simple, transparent plans</h2>
                                    <p className="text-gray-700 dark:text-gray-300 text-lg">Start free. Upgrade when you’re winning more projects.</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {/* Free */}
                                    <Card className="card-gradient rounded-2xl p-8">
                                        <CardHeader className="pb-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold dark:bg-white/10 dark:text-white">Free</div>
                                            <CardTitle className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">$0 <span className="text-base font-medium text-gray-500">/ mo</span></CardTitle>
                                            <CardDescription className="mt-1 text-gray-700 dark:text-gray-300">Everything to get started</CardDescription>
                                        </CardHeader>
                                        <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-blue-600" /> 10 proposals / month</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-blue-600" /> Basic resume context</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-blue-600" /> Standard support</li>
                                        </ul>
                                        <div className="mt-8">
                                            <Button asChild className="w-full btn-gradient font-semibold">
                                                <Link href={auth.user ? route('dashboard') : route('register')}>Start Free</Link>
                                            </Button>
                                        </div>
                                    </Card>

                                    {/* Pro */}
                                    <Card className="card-gradient rounded-2xl p-8 border-2" style={{ borderImage: 'linear-gradient(135deg, var(--chart-3), var(--chart-4)) 1' }}>
                                        <CardHeader className="pb-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-sm font-semibold dark:bg-white/10 dark:text-white"><Crown className="h-4 w-4" /> Most Popular</div>
                                            <CardTitle className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">$12 <span className="text-base font-medium text-gray-500">/ mo</span></CardTitle>
                                            <CardDescription className="mt-1 text-gray-700 dark:text-gray-300">For busy freelancers</CardDescription>
                                        </CardHeader>
                                        <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-cyan-600" /> Unlimited proposals</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-cyan-600" /> Deep resume personalization</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-cyan-600" /> Proposal history & edits</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-cyan-600" /> Priority support</li>
                                        </ul>
                                        <div className="mt-8">
                                            <Button asChild className="w-full btn-gradient font-semibold">
                                                <Link href={auth.user ? route('dashboard') : route('register')}>Upgrade to Pro</Link>
                                            </Button>
                                        </div>
                                    </Card>

                                    {/* Agency */}
                                    <Card className="card-gradient rounded-2xl p-8">
                                        <CardHeader className="pb-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-sm font-semibold dark:bg-white/10 dark:text-white">Agency</div>
                                            <CardTitle className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">$39 <span className="text-base font-medium text-gray-500">/ mo</span></CardTitle>
                                            <CardDescription className="mt-1 text-gray-700 dark:text-gray-300">For small teams</CardDescription>
                                        </CardHeader>
                                        <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-sky-600" /> 5 seats included</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-sky-600" /> Shared resume library</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-sky-600" /> Team analytics</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-sky-600" /> Priority support</li>
                                        </ul>
                                        <div className="mt-8">
                                            <Button asChild variant="outline" className="w-full bg-white/70 text-gray-900 border-white/80 hover:bg-white/80 backdrop-blur-sm dark:bg-white/10 dark:text-white dark:border-white/30 dark:hover:bg-white/20">
                                                <Link href={auth.user ? route('dashboard') : route('register')}>Talk to Sales</Link>
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="text-center mt-20">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Win More Projects?</h2>
                                <p className="text-gray-700 dark:text-white/90 mb-12 text-xl leading-relaxed max-w-2xl mx-auto">
                                    Join thousands of freelancers who use Propella to create winning proposals every day
                                </p>
                                <Button size="lg" asChild className="text-xl px-12 py-4 btn-gradient font-semibold">
                                    <Link href={route('register')}>
                                        Start Creating Proposals
                                        <ArrowRight className="ml-3 h-6 w-6" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 glass-keynote border-t border-white/20 py-8">
                    <div className="container mx-auto px-4 text-center text-gray-700 dark:text-white/80">
                        <p>&copy; 2025 Propella. Built with Laravel & React.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
