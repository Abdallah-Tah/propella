import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  Globe,
  Target,
  Rocket,
  BrainCircuit,
  Trophy,
  Clock,
  TrendingUp,
  Shield,
  Code,
  Palette,
  Zap,
  Award,
  Star,
  Coffee,
  BookOpen,
  Lightbulb
} from 'lucide-react';

export default function About() {
    const { auth } = usePage<SharedData>().props;

    const teamMembers = [
        {
            name: "Alex Rodriguez",
            role: "Co-Founder & CEO",
            bio: "Former Upwork Top Rated freelancer who built multiple 7-figure agencies. Passionate about AI and automation.",
            avatar: "AR",
            gradient: "from-purple-500 to-blue-600"
        },
        {
            name: "Sarah Chen",
            role: "Co-Founder & CTO",
            bio: "Ex-Google AI engineer with 10+ years in machine learning. Built recommendation systems at scale.",
            avatar: "SC",
            gradient: "from-blue-500 to-cyan-600"
        },
        {
            name: "Marcus Johnson",
            role: "Head of Product",
            bio: "Former Product Manager at Stripe. Expert in building tools that freelancers actually love to use.",
            avatar: "MJ",
            gradient: "from-cyan-500 to-green-600"
        },
        {
            name: "Elena Vasquez",
            role: "Head of Growth",
            bio: "Growth specialist who scaled multiple B2B SaaS companies from 0 to $10M ARR.",
            avatar: "EV",
            gradient: "from-green-500 to-yellow-600"
        }
    ];

    const values = [
        {
            icon: Heart,
            title: "Freelancer First",
            description: "Every decision we make starts with: 'How does this help freelancers succeed?'",
            color: "from-pink-500 to-red-600"
        },
        {
            icon: BrainCircuit,
            title: "AI for Good",
            description: "We believe AI should augment human creativity, not replace it. Technology that empowers.",
            color: "from-purple-500 to-blue-600"
        },
        {
            icon: Trophy,
            title: "Excellence",
            description: "We obsess over quality, performance, and user experience. Good enough isn't good enough.",
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: Globe,
            title: "Global Impact",
            description: "Building tools that work for freelancers everywhere, from Silicon Valley to São Paulo.",
            color: "from-cyan-500 to-green-600"
        }
    ];

    const milestones = [
        {
            year: "2023",
            title: "The Problem",
            description: "After winning $2M+ in Upwork projects, our founders realized they were spending 70% of their time on repetitive proposal writing instead of actual work.",
            icon: Lightbulb
        },
        {
            year: "Early 2024",
            title: "The Solution",
            description: "Built the first AI proposal generator that actually understood client psychology. Beta users saw 3x higher response rates immediately.",
            icon: BrainCircuit
        },
        {
            year: "Mid 2024",
            title: "The Expansion",
            description: "Realized proposals were just the tip of the iceberg. Started building complete workflow automation for the entire Upwork experience.",
            icon: Rocket
        },
        {
            year: "2025",
            title: "The Vision",
            description: "Launching Propella 2.0 - the world's first complete Upwork automation platform. From job discovery to project completion.",
            icon: Trophy
        }
    ];

    return (
        <>
            <Head title="About Propella - Our Story & Mission">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800,900" rel="stylesheet" />
            </Head>
            
            {/* Stunning gradient background */}
            <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950 overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500" />
                
                {/* Navigation */}
                <header className="relative z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-indigo-200/50 dark:border-indigo-800/50">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <Link href={route('welcome')} className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transform hover:scale-105 transition-all duration-300">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-indigo-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </Link>
                            
                            <div className="flex items-center gap-6">
                                <nav className="hidden md:flex items-center gap-8">
                                    <Link href={route('welcome')} className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Home</Link>
                                    <a href="#story" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Our Story</a>
                                    <a href="#team" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Team</a>
                                    <a href="#values" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Values</a>
                                </nav>
                                
                                {auth.user ? (
                                    <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                                        <Link href={route('dashboard')}>
                                            Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
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
                        <Badge className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 px-6 py-3 text-sm font-semibold shadow-lg">
                            <Heart className="h-4 w-4 mr-2" />
                            Our Story
                        </Badge>
                        
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">We're Building the Future</span>
                            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">of Freelance Work</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                            Born from the frustration of spending more time writing proposals than doing actual work, 
                            Propella is on a mission to give freelancers their time back through intelligent automation.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
                            <div className="text-center p-6 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50">
                                <div className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">10k+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Happy Freelancers</div>
                            </div>
                            <div className="text-center p-6 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
                                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$5M+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Projects Won</div>
                            </div>
                            <div className="text-center p-6 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-pink-200/50 dark:border-pink-800/50">
                                <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">500k+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Proposals Generated</div>
                            </div>
                            <div className="text-center p-6 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-red-200/50 dark:border-red-800/50">
                                <div className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">95%</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Time Saved</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story Timeline */}
                <section id="story" className="relative z-40 py-16 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Journey
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Journey</h2>
                            <p className="text-slate-700 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                                From freelancer frustration to AI-powered solution that's transforming how the world works
                            </p>
                        </div>

                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={milestone.year} className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
                                            <milestone.icon className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                    <Card className="flex-1 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                                        <CardHeader>
                                            <div className="flex items-center gap-4 mb-4">
                                                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
                                                    {milestone.year}
                                                </Badge>
                                                <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                    {milestone.title}
                                                </CardTitle>
                                            </div>
                                            <CardDescription className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                                {milestone.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section id="team" className="relative z-40 py-16 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-4 py-2">
                                <Users className="h-4 w-4 mr-2" />
                                Team
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Meet the Team</h2>
                            <p className="text-slate-700 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                                We're a passionate team of freelancers, engineers, and entrepreneurs who believe technology should empower human creativity
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <Card key={member.name} className="text-center backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-blue-200/50 dark:border-blue-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                    <CardHeader>
                                        <div className={`mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-xl`}>
                                            {member.avatar}
                                        </div>
                                        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
                                            {member.name}
                                        </CardTitle>
                                        <Badge className={`bg-gradient-to-r ${member.gradient} text-white border-0 w-fit mx-auto`}>
                                            {member.role}
                                        </Badge>
                                        <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                                            {member.bio}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section id="values" className="relative z-40 py-16 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 px-4 py-2">
                                <Star className="h-4 w-4 mr-2" />
                                Values
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">What Drives Us</h2>
                            <p className="text-slate-700 dark:text-slate-300 text-xl max-w-3xl mx-auto">
                                Our core values guide every decision, from product features to company culture
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {values.map((value, index) => (
                                <Card key={value.title} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-green-200/50 dark:border-green-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                    <CardHeader>
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${value.color} w-fit shadow-lg mb-4`}>
                                            <value.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-slate-400">
                                            {value.title}
                                        </CardTitle>
                                        <CardDescription className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {value.description}
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
                        <div className="backdrop-blur-sm bg-gradient-to-br from-indigo-100/80 to-purple-100/80 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-12 border border-indigo-200/50 dark:border-indigo-800/50">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Join Our Mission</h2>
                            <p className="text-slate-700 dark:text-slate-300 mb-12 text-xl leading-relaxed max-w-3xl mx-auto">
                                We're just getting started. Help us build the future of freelance work and transform how millions of people earn their living online.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {auth.user ? (
                                    <Button size="lg" asChild className="text-xl px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                        <Link href={route('dashboard')}>
                                            <Rocket className="mr-3 h-6 w-6" />
                                            Go to Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button size="lg" asChild className="text-xl px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                            <Link href={route('register')}>
                                                Start Your Journey
                                                <Rocket className="ml-3 h-6 w-6" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" asChild className="text-xl px-12 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 shadow-lg">
                                            <Link href={route('welcome')}>
                                                <ArrowRight className="mr-3 h-6 w-6" />
                                                Back to Home
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-t border-indigo-200/50 dark:border-indigo-800/50 py-12">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <Link href={route('welcome')} className="flex items-center gap-4 mb-6 md:mb-0">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                                    <Wand2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Propella</span>
                                    <div className="text-xs text-indigo-500 font-medium">AI Workflow Automation</div>
                                </div>
                            </Link>
                            
                            <p className="text-slate-600 dark:text-slate-400 text-center md:text-right">
                                &copy; 2025 Propella. Built with ❤️ for freelancers worldwide.<br />
                                <span className="text-sm">Transforming how the world works, one proposal at a time.</span>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}