import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  FileText, 
  Zap, 
  Target, 
  Clock,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Propella - AI Proposal Generator">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Navigation */}
                <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Wand2 className="h-6 w-6 text-primary" />
                                </div>
                                <span className="font-bold text-xl">Propella</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Button asChild>
                                        <Link href={route('dashboard')}>
                                            Dashboard
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" asChild>
                                            <Link href={route('login')}>Log in</Link>
                                        </Button>
                                        <Button asChild>
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
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <Badge variant="secondary" className="mb-4">
                                <Sparkles className="h-3 w-3 mr-1" />
                                AI-Powered Proposal Generator
                            </Badge>
                            
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent dark:from-slate-100 dark:via-slate-200 dark:to-slate-100">
                                Win More Upwork Projects
                                <br />
                                <span className="text-primary">with AI Proposals</span>
                            </h1>
                            
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                Transform job postings into winning proposals in seconds. Our AI understands 
                                what clients want and crafts personalized proposals that get you hired.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {auth.user ? (
                                    <Button size="lg" asChild className="text-lg px-8 py-3">
                                        <Link href={route('proposals.index')}>
                                            <Wand2 className="mr-2 h-5 w-5" />
                                            Create Proposal
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button size="lg" asChild className="text-lg px-8 py-3">
                                            <Link href={route('register')}>
                                                Start Free
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                                            <Link href={route('login')}>
                                                Sign In
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Tailored to Each Job</CardTitle>
                                    <CardDescription>
                                        AI analyzes job requirements and creates proposals that directly address client needs
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Lightning Fast</CardTitle>
                                    <CardDescription>
                                        Generate professional proposals in under 30 seconds instead of spending hours writing
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                                        <TrendingUp className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Higher Win Rate</CardTitle>
                                    <CardDescription>
                                        Proven strategies and language patterns that increase your chances of getting hired
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Process Steps */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 md:p-12">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                                <p className="text-muted-foreground text-lg">
                                    From job posting to winning proposal in 3 simple steps
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="mb-4 mx-auto w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                        1
                                    </div>
                                    <h3 className="font-semibold mb-2">Paste Job Details</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Copy the job posting from Upwork and paste it into our form
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="mb-4 mx-auto w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                        2
                                    </div>
                                    <h3 className="font-semibold mb-2">AI Generates</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Our AI analyzes requirements and creates a personalized proposal
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="mb-4 mx-auto w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                        3
                                    </div>
                                    <h3 className="font-semibold mb-2">Copy & Submit</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Review, copy your proposal, and submit it to win the project
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="text-center mt-16">
                                <h2 className="text-3xl font-bold mb-4">Ready to Win More Projects?</h2>
                                <p className="text-muted-foreground mb-8">
                                    Join thousands of freelancers who use Propella to create winning proposals
                                </p>
                                <Button size="lg" asChild className="text-lg px-8 py-3">
                                    <Link href={route('register')}>
                                        Start Creating Proposals
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
                    <div className="container mx-auto px-4 text-center text-muted-foreground">
                        <p>&copy; 2025 Propella. Built with Laravel & React.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
