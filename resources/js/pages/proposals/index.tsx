import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Wand2, Copy, Settings2, FileText, Zap, Clock, Target } from 'lucide-react';

export default function ProposalsPage() {
  const [formData, setFormData] = useState({
    title: 'Senior React Developer needed',
    description: 'We need a React dev to build a dashboard with charts and auth.',
    skills: 'React, TypeScript, Tailwind CSS, API Integration',
    questions: 'Tell us about a similar dashboard you built.\nWhat is your experience with React?',
    tone: 'professional',
    length: 'medium',
    model: 'gpt-4o-mini'
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [usage, setUsage] = useState<{ input_tokens: number; output_tokens: number } | null>(null);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    setError('');
    setUsage(null);
    
    const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
    
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      const questionsArray = formData.questions.split('\n').map(s => s.trim()).filter(s => s);
      
      const res = await fetch('/proposals/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': token ?? '',
        },
        body: JSON.stringify({ 
          job: { 
            title: formData.title, 
            description: formData.description, 
            skills: skillsArray, 
            screening_questions: questionsArray 
          },
          settings: {
            tone: formData.tone,
            length: formData.length,
            model: formData.model
          }
        }),
        credentials: 'same-origin',
      });
      
      if (!res.ok) {
        throw new Error('Failed to generate proposal');
      }
      
      const json = await res.json();
      setResult(json.proposal_md || '');
      setUsage(json.usage);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      skills: '',
      questions: '',
      tone: 'professional',
      length: 'medium',
      model: 'gpt-4o-mini'
    });
    setResult('');
    setError('');
    setUsage(null);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Proposals', href: '/proposals' }]}> 
      <Head title="Proposals - AI Proposal Generator" />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Proposal Generator</h1>
              <p className="text-muted-foreground">Create winning Upwork proposals in seconds</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>Tailored to job requirements</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>AI-powered optimization</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Generated in seconds</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Card */}
          <div className="space-y-6">
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Job Details
                    </CardTitle>
                    <CardDescription>
                      Paste the job posting details below
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                    className="h-8 w-8 p-0"
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input 
                      id="title" 
                      value={formData.title} 
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} 
                      placeholder="e.g. Senior React Developer needed"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <textarea 
                      id="description" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[120px]" 
                      value={formData.description} 
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} 
                      placeholder="Paste the full job description here..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Input 
                      id="skills" 
                      value={formData.skills} 
                      onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))} 
                      placeholder="React, TypeScript, Node.js (comma separated)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="questions">Screening Questions</Label>
                    <textarea 
                      id="questions" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none" 
                      rows={3}
                      value={formData.questions} 
                      onChange={(e) => setFormData(prev => ({ ...prev, questions: e.target.value }))} 
                      placeholder="One question per line..."
                    />
                  </div>

                  {showSettings && (
                    <>
                      <Separator className="my-4" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tone">Tone</Label>
                          <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="length">Length</Label>
                          <Select value={formData.length} onValueChange={(value) => setFormData(prev => ({ ...prev, length: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Short</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="long">Long</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Proposal
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={clearForm}>
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Result Card */}
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Proposal</CardTitle>
                  <CardDescription>
                    Your AI-generated proposal
                  </CardDescription>
                </div>
                {usage && (
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      {usage.input_tokens} → {usage.output_tokens}
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <div className="font-medium">Generation failed</div>
                  <div className="text-sm">{error}</div>
                </Alert>
              )}
              
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-3/5"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4 border">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {result}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyToClipboard}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <div className="font-medium mb-2">No proposal generated yet</div>
                  <div className="text-sm">Fill in the job details and click generate to get started</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
