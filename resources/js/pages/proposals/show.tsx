import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Copy, 
  ExternalLink, 
  FileText, 
  Clock, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Job {
  title: string;
  description: string;
  budget?: string;
  skills?: string[];
  url?: string;
}

interface Generation {
  id: number;
  job_title: string;
  output_md: string;
  tokens_in: number;
  tokens_out: number;
  cost_cents: number;
  status: string;
  created_at: string;
  source_json: Job;
}

interface Props {
  generation: Generation;
}

export default function ProposalShow({ generation }: Props) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generation.output_md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout breadcrumbs={[
      { title: 'Proposals', href: '/proposals' },
      { title: 'History', href: '/proposals/history' },
      { title: generation.job_title, href: `/proposals/${generation.id}` }
    ]}>
      <Head title={`Proposal: ${generation.job_title}`} />
      
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/proposals/history">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold mb-1">{generation.job_title}</h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {generation.created_at}
                </span>
                <Badge variant={generation.status === 'success' ? 'default' : 'destructive'}>
                  {generation.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} variant="outline">
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
            {generation.source_json.url && (
              <Button variant="outline" asChild>
                <a href={generation.source_json.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Job Post
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="glass-surface">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Proposal
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert">
                <div className="rounded-lg border bg-card text-card-foreground p-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {generation.output_md}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Stats */}
            <Card className="glass-surface">
              <CardHeader>
                <CardTitle className="text-base">Generation Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Input Tokens</span>
                  <span className="text-sm font-medium">{generation.tokens_in.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Output Tokens</span>
                  <span className="text-sm font-medium">{generation.tokens_out.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cost</span>
                  <span className="text-sm font-medium">${(generation.cost_cents / 100).toFixed(3)}</span>
                </div>
                <div className="pt-2 border-t flex items-center gap-1 text-xs text-muted-foreground">
                  <Zap className="h-3 w-3" />
                  <span>OpenAI GPT-4o-mini</span>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="glass-surface">
              <CardHeader>
                <CardTitle className="text-base">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {generation.source_json.description.substring(0, 200)}...
                  </p>
                </div>
                
                {generation.source_json.budget && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Budget</h4>
                    <p className="text-sm text-muted-foreground">{generation.source_json.budget}</p>
                  </div>
                )}
                
                {generation.source_json.skills && generation.source_json.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {generation.source_json.skills.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {generation.source_json.skills.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{generation.source_json.skills.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="glass-surface">
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={copyToClipboard}
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/proposals">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Similar
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
