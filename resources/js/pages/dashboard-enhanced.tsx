import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  TrendingUp, 
  Clock,
  Zap,
  Target,
  Sparkles,
  WandSparkles,
  Upload,
} from 'lucide-react';

export default function DashboardEnhanced() {
  const { auth, stats } = usePage().props as any;

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard' }]}>
      <Head title="Dashboard" />
      
      <div className="p-6 space-y-8 page-enter">
        {/* Welcome Header with Premium Styling */}
        <div className="premium-card hover-raise p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl mb-4">
              <Sparkles className="h-8 w-8 text-indigo-600 icon-glow" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome back, {auth.user.name}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to create winning proposals with AI assistance?
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/proposals/enhanced">
                <WandSparkles className="h-5 w-5 mr-2" />
                Generate Proposal
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Link href="/resumes">
                <Upload className="h-5 w-5 mr-2" />
                Upload Resume
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid with Premium Styling */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="premium-card hover-raise">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resume Library</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.resumes}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stats.resumes === 0 ? 'Upload your first resume' : 'Ready for proposals'}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl">
                  <FileText className="h-8 w-8 text-blue-600 icon-glow" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card hover-raise">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Proposals</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.proposals_generated}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stats.proposals_generated === 0 ? 'Generate your first' : 'All time generated'}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl">
                  <Target className="h-8 w-8 text-green-600 icon-glow" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card hover-raise">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.proposals_this_month}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <TrendingUp className="inline h-4 w-4 mr-1 text-green-600" />
                    Keep the momentum
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl">
                  <Zap className="h-8 w-8 text-purple-600 icon-glow" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity with Premium Styling */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="premium-card hover-raise">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg">
                  <Clock className="h-5 w-5 text-indigo-600" />
                </div>
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest proposal generation activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="mb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <p className="font-medium text-gray-700 mb-2">No recent activity</p>
                <p className="text-sm">Generate your first proposal to see activity here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card hover-raise">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                Pro Tips
              </CardTitle>
              <CardDescription>Maximize your proposal success rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-indigo-100/50 rounded-lg">
                    <Target className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Upload detailed resumes</p>
                    <p className="text-sm text-muted-foreground">
                      Include specific achievements and metrics for better personalization
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-green-100/50 rounded-lg">
                    <WandSparkles className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Customize tone and length</p>
                    <p className="text-sm text-muted-foreground">
                      Match your writing style to each client's communication preferences
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-purple-100/50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Review and refine</p>
                    <p className="text-sm text-muted-foreground">
                      Always personalize AI-generated proposals before sending
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions with Premium Styling */}
        <Card className="premium-card hover-raise">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks to boost your freelancing success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="h-auto p-4 flex flex-col items-center gap-3 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
              >
                <Link href="/proposals/enhanced">
                  <div className="p-3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl">
                    <WandSparkles className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-800">Generate Proposal</div>
                    <div className="text-xs text-muted-foreground mt-1">AI-powered proposals</div>
                  </div>
                </Link>
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="h-auto p-4 flex flex-col items-center gap-3 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <Link href="/resumes">
                  <div className="p-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl">
                    <Upload className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-800">Upload Resume</div>
                    <div className="text-xs text-muted-foreground mt-1">Add new experience</div>
                  </div>
                </Link>
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="h-auto p-4 flex flex-col items-center gap-3 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
              >
                <Link href="/proposals/history">
                  <div className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-800">View History</div>
                    <div className="text-xs text-muted-foreground mt-1">Past proposals</div>
                  </div>
                </Link>
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="h-auto p-4 flex flex-col items-center gap-3 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
              >
                <Link href="/settings">
                  <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-800">Settings</div>
                    <div className="text-xs text-muted-foreground mt-1">Customize experience</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
