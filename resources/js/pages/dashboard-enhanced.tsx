import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  FileText, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Users,
  Zap,
  Target
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Props {
  stats: {
    totalProposals: number;
    thisWeek: number;
    resumeCount: number;
    avgResponseTime: string;
  };
  recentProposals: Array<{
    id: number;
    title: string;
    date: string;
    status: string;
  }>;
}

export default function Dashboard({ stats, recentProposals }: Props) {
  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
      <Head title="Dashboard" />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-muted-foreground">Ready to create winning proposals?</p>
            </div>
            
            <Button size="lg" asChild>
              <Link href="/proposals">
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Proposal
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProposals}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisWeek}</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resumes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resumeCount}</div>
              <p className="text-xs text-muted-foreground">Uploaded files</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
              <p className="text-xs text-muted-foreground">Client response time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Proposals */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Proposals</CardTitle>
              <CardDescription>Your latest proposal generations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProposals.map((proposal) => (
                  <div key={proposal.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{proposal.title}</div>
                      <div className="text-xs text-muted-foreground">{proposal.date}</div>
                    </div>
                    <Badge variant={proposal.status === 'sent' ? 'default' : 'secondary'}>
                      {proposal.status}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/proposals">
                    View All Proposals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start h-12" asChild>
                  <Link href="/proposals">
                    <Wand2 className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Generate New Proposal</div>
                      <div className="text-xs opacity-70">Create a winning proposal from job posting</div>
                    </div>
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12" disabled>
                  <Users className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Upload Resume</div>
                    <div className="text-xs opacity-70">Coming soon - Personalize with your experience</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12" disabled>
                  <Zap className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Chrome Extension</div>
                    <div className="text-xs opacity-70">Coming soon - Generate directly on Upwork</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>💡 Pro Tips</CardTitle>
            <CardDescription>Maximize your proposal success rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium mb-1">Be Specific</div>
                <p className="text-muted-foreground">Address the client's exact requirements and pain points</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium mb-1">Show Experience</div>
                <p className="text-muted-foreground">Include relevant examples and previous work results</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium mb-1">Clear Next Steps</div>
                <p className="text-muted-foreground">End with a clear call-to-action and proposed timeline</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
