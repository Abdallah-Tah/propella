import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Home,
    Wand2,
    FileText,
    User,
    Settings,
    Bell,
    Search
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    description: string;
}

export default function EnhancedNav() {
    const navigationItems: NavItem[] = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: Home,
            description: 'Overview and quick actions'
        },
        {
            name: 'Proposal Generator',
            href: '/proposals/workflow',
            icon: Wand2,
            description: 'AI-powered proposal generation'
        },
        {
            name: 'Resume Manager',
            href: '/resumes',
            icon: FileText,
            description: 'Upload and manage your resumes'
        },
        {
            name: 'Profile Setup',
            href: '/profile/wizard',
            icon: User,
            description: 'Complete your profile'
        }
    ];

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 mr-4">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <Wand2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Propella
                        </span>
                    </Link>

                    {/* Navigation Items */}
                    {navigationItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative flex items-center gap-2 h-10 px-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title={item.description}
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="hidden md:inline">{item.name}</span>
                                {item.badge && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                    ))}

                    {/* Right side actions */}
                    <div className="flex items-center gap-1 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Search className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
                            <Bell className="h-4 w-4" />
                            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-blue-500 text-white">
                                3
                            </Badge>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}