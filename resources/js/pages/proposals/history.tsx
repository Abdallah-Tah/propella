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

export default function ProposalHistory({ proposals, pagination }: Props) {
  return (
    <AppLayout breadcrumbs={[
      { title: 'Proposals', href: '/proposals' },
      { title: 'History', href: '/proposals/history' }
    ]}>
      <Head title="Proposal History" />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Proposal History</h1>
            <p className="text-muted-foreground">
              View and manage your previously generated proposals
            </p>
          </div>
          
          <Button asChild>
            <Link href="/proposals">
              <FileText className="mr-2 h-4 w-4" />
              Generate New
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Proposals</p>
                  <p className="text-2xl font-bold">{pagination.total}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">{proposals.data.length}</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Tokens</p>
                  <p className="text-2xl font-bold">
                    {Math.round(proposals.data.reduce((acc, p) => acc + p.tokens_out, 0) / proposals.data.length) || 0}
                  </p>
                </div>
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {proposals.data.length > 0 ? (
            proposals.data.map((proposal) => (
              <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{proposal.job_title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{proposal.created_at}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={proposal.status === 'success' ? 'default' : 'destructive'}>
                        {proposal.status}
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/proposals/${proposal.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {proposal.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {proposal.tokens_in} → {proposal.tokens_out} tokens
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No proposals yet</h3>
                <p className="text-muted-foreground mb-4">
                  Generate your first proposal to see it here
                </p>
                <Button asChild>
                  <Link href="/proposals">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Proposal
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {pagination.last_page > 1 && (
          <div className="flex justify-center mt-6">
            <p className="text-sm text-muted-foreground">
              Page {pagination.current_page} of {pagination.last_page}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
