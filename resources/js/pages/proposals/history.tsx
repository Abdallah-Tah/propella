import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Clock, Zap } from 'lucide-react';

interface Proposal {
  id: number;
  job_title: string;
  status: string;
  tokens_in: number;
  tokens_out: number;
  created_at: string;
  excerpt: string;
}

interface Props {
  proposals: {
    data: Proposal[];
  };
  pagination: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export default function ProposalHistory() {
  const { proposals } = usePage().props as PageProps<{
    proposals: Array<{
      id: string;
      job_title: string;
      created_at: string;
      tokens_in: number;
      tokens_out: number;
      status: string;
    }>;
  }>;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <AppLayout breadcrumbs={[
      { title: 'Proposals', href: '/proposals' },
      { title: 'History', href: '/proposals/history' }
    ]}>
      <Head title="Proposal History" />
      
      <div className="p-6 max-w-6xl mx-auto page-enter">
        {/* Header with Premium Styling */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="icon-pill bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
              <Clock className="h-6 w-6 text-blue-600 icon-glow" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Proposal History
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track all your AI-generated proposals and their performance insights
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="premium-card hover-raise">
            <CardContent className="p-4 text-center">
              <div className="mb-2">
                <div className="inline-flex p-2 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600 icon-glow" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{proposals.length}</p>
              <p className="text-sm text-muted-foreground">Total Proposals</p>
            </CardContent>
          </Card>

          <Card className="premium-card hover-raise">
            <CardContent className="p-4 text-center">
              <div className="mb-2">
                <div className="inline-flex p-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 icon-glow" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {proposals.filter(p => p.status === 'success').length}
              </p>
              <p className="text-sm text-muted-foreground">Successful</p>
            </CardContent>
          </Card>

          <Card className="premium-card hover-raise">
            <CardContent className="p-4 text-center">
              <div className="mb-2">
                <div className="inline-flex p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600 icon-glow" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {proposals.reduce((sum, p) => sum + (p.tokens_out || 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Words Generated</p>
            </CardContent>
          </Card>

          <Card className="premium-card hover-raise">
            <CardContent className="p-4 text-center">
              <div className="mb-2">
                <div className="inline-flex p-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600 icon-glow" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {proposals.filter(p => {
                  const date = new Date(p.created_at);
                  const now = new Date();
                  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                  return date >= thirtyDaysAgo;
                }).length}
              </p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Proposals List */}
        <Card className="premium-card hover-raise">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-800">All Proposals</CardTitle>
                <CardDescription className="text-base mt-2">
                  {proposals.length === 0 
                    ? "No proposals generated yet — create your first one to see it here"
                    : `${proposals.length} proposal${proposals.length !== 1 ? 's' : ''} generated with AI assistance`
                  }
                </CardDescription>
              </div>
              <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0">
                <Link href="/proposals/enhanced">
                  <Plus className="h-4 w-4 mr-2" />
                  New Proposal
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {proposals.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-8">
                  <div className="mx-auto w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                    <Clock className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ready to start winning projects?</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
                  Generate your first AI-powered proposal to see detailed analytics and performance tracking here
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 px-8 py-3">
                  <Link href="/proposals/enhanced">
                    <WandSparkles className="h-5 w-5 mr-2" />
                    Generate Your First Proposal
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="file-item rounded-xl p-6 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="p-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl">
                          <FileText className="h-6 w-6 text-blue-600 icon-glow" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-lg truncate mb-1">
                            {proposal.job_title || 'Untitled Proposal'}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="font-medium text-gray-600">{formatDate(proposal.created_at)}</span>
                            <span>•</span>
                            <span className="text-indigo-600 font-medium">
                              {proposal.tokens_out?.toLocaleString() || 0} words
                            </span>
                            <span>•</span>
                            <Badge className={`text-xs ${getStatusColor(proposal.status)}`}>
                              {proposal.status === 'success' ? 'Generated' : proposal.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          asChild
                          className="hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Link href={`/proposals/${proposal.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Insights */}
        {proposals.length > 0 && (
          <Card className="mt-8 premium-card hover-raise">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                Performance Insights
              </CardTitle>
              <CardDescription>Track your proposal generation patterns and optimize for better results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Average Length</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {proposals.length > 0 
                      ? Math.round(proposals.reduce((sum, p) => sum + (p.tokens_out || 0), 0) / proposals.length).toLocaleString()
                      : 0
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">words per proposal</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-xl">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {proposals.length > 0 
                      ? Math.round((proposals.filter(p => p.status === 'success').length / proposals.length) * 100)
                      : 0
                    }%
                  </p>
                  <p className="text-xs text-muted-foreground">successful generations</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-xl">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Weekly Average</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {Math.round(proposals.length / Math.max(1, Math.ceil((Date.now() - new Date(proposals[proposals.length - 1]?.created_at || Date.now()).getTime()) / (7 * 24 * 60 * 60 * 1000))))}
                  </p>
                  <p className="text-xs text-muted-foreground">proposals per week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}