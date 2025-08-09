import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock,
  Trash2,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

interface Resume {
  id: number;
  original_name: string;
  file_type: string;
  file_size: number;
  is_processed: boolean;
  processed_at: string | null;
  created_at: string;
  embeddings_count?: number;
}

interface Props {
  resumes: Resume[];
}

export default function ResumeIndex({ resumes }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['pdf', 'txt', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }
    
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    console.log('Starting upload...', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    setUploading(true);
    
    const formData = new FormData();
    formData.append('resume', file);
    
    try {
      await router.post('/resumes', formData, {
        forceFormData: true,
        onSuccess: (page) => {
          setUploading(false);
          console.log('Upload successful', page);
        },
        onError: (errors) => {
          setUploading(false);
          console.error('Upload errors:', errors);
          alert('Upload failed: ' + Object.values(errors).join(', '));
        }
      });
    } catch (error) {
      setUploading(false);
      console.error('Upload failed:', error);
      alert('Upload failed: ' + (error as Error).message);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const deleteResume = (id: number) => {
    if (confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      router.delete(`/resumes/${id}`);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openFilePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      handleFileUpload(target.files);
    };
    input.click();
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Resume Manager', href: '/resumes' }]}> 
      <Head title="Resume Manager" />
      
      <div className="p-6 max-w-6xl mx-auto page-enter">
        {/* Header with elegant styling */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="icon-pill bg-gradient-to-br from-emerald-500/20 to-slate-500/20">
              <Upload className="h-6 w-6 text-emerald-600 icon-glow" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-emerald-700 bg-clip-text text-transparent">
            Resume Manager
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your resume to unlock personalized AI-generated proposals that win more projects
          </p>
        </div>

        {/* Premium Upload Area */}
        <Card className="mb-8 premium-card hover-raise">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-slate-500/10 rounded-lg">
                <Upload className="h-5 w-5 text-emerald-600 icon-glow" />
              </div>
              Upload Your Resume
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Drag and drop your resume or click to browse. We support PDF, DOC, DOCX, and TXT files.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`dropzone-elegant ${dragActive ? 'dropzone-active' : ''} rounded-xl p-12 text-center cursor-pointer`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              role="button"
              tabIndex={0}
              aria-label="Upload resume by dropping a file or press Enter to browse"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openFilePicker();
                }
              }}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 to-slate-500/20 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-800">Processing your resume...</p>
                    <p className="text-sm text-gray-600">We're extracting key information for better proposals</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-slate-500/10 rounded-2xl">
                      <Upload className="h-12 w-12 text-emerald-600 icon-glow" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xl font-semibold text-gray-800 mb-2">Drop your resume here</p>
                      <p className="text-gray-600 mb-6">or</p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-emerald-600 to-slate-700 hover:from-emerald-700 hover:to-slate-800 text-white border-0 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={openFilePicker}
                    >
                      Choose File
                    </Button>
                  </div>
                  <div className="pt-4 border-t border-gray-200/50">
                    <p className="text-sm text-gray-500">
                      Maximum file size: <span className="font-medium text-gray-700">10MB</span> • 
                      Supported formats: <span className="font-medium text-gray-700">PDF, DOC, DOCX, TXT</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Elegant Information Alert */}
        <Alert className="mb-8 premium-card border-emerald-200/50 bg-gradient-to-r from-emerald-50/50 to-slate-50/50">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-100/50 rounded-lg mt-0.5">
              <AlertCircle className="h-4 w-4 text-emerald-600" />
            </div>
            <AlertDescription className="text-sm leading-relaxed text-gray-700">
              Your resume is processed securely to extract key information and create embeddings for personalized proposal generation. 
              <span className="font-medium text-emerald-700">All data remains private and accessible only to you.</span>
            </AlertDescription>
          </div>
        </Alert>

        {/* Premium Resumes List */}
        <Card className="premium-card hover-raise">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-800">Your Resume Library</CardTitle>
                <CardDescription className="text-base mt-1">
                  {resumes.length === 0 
                    ? "No resumes uploaded yet — upload your first one to get started"
                    : `${resumes.length} resume${resumes.length !== 1 ? 's' : ''} ready for AI proposal generation`
                  }
                </CardDescription>
              </div>
              {resumes.length > 0 && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  {resumes.length} files
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {resumes.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <div className="mb-6">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-slate-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <FileText className="h-10 w-10 text-emerald-500" />
                  </div>
                </div>
                <p className="text-lg font-medium mb-2 text-gray-700">Ready to create winning proposals?</p>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Upload your resume to unlock personalized AI-generated proposals that highlight your unique experience
                </p>
                <Button 
                  variant="outline" 
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  onClick={openFilePicker}
                >
                  Upload Your First Resume
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div key={resume.id} className="file-item rounded-xl p-6 flex items-center justify-between group">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-slate-500/10 rounded-xl">
                        <FileText className="h-6 w-6 text-emerald-600 icon-glow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate text-lg">{resume.original_name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span className="font-medium text-gray-600">{resume.file_type.toUpperCase()}</span>
                          <span>•</span>
                          <span>{formatFileSize(resume.file_size)}</span>
                          <span>•</span>
                          <span>{formatDate(resume.created_at)}</span>
                          {typeof resume.embeddings_count === 'number' && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-600 font-medium">{resume.embeddings_count} snippets</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {resume.is_processed ? (
                          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <Badge variant="default" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                              Ready
                            </Badge>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
                            <Clock className="h-4 w-4 text-amber-600 pulse-elegant" />
                            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                              Processing...
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => router.visit(`/resumes/${resume.id}`)}
                          className="hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteResume(resume.id)}
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
      </div>
    </AppLayout>
  );
}
