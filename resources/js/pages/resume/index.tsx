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
    
    // Validate file size (2MB to match PHP limit)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB.');
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
      router.delete(`/resume/${id}`);
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

  return (
    <AppLayout breadcrumbs={[{ title: 'Resume Manager', href: '/resume' }]}>
      <Head title="Resume Manager" />
      
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Resume Manager</h1>
          <p className="text-muted-foreground">
            Upload your resume to personalize AI-generated proposals
          </p>
        </div>

        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Resume
            </CardTitle>
            <CardDescription>
              Drag and drop your resume or click to browse. Supports PDF, DOC, DOCX, and TXT files.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <div>
                    <p className="font-medium">Uploading and processing...</p>
                    <p className="text-sm text-muted-foreground">This may take a moment</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground mb-4">or</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.pdf,.doc,.docx,.txt';
                        input.onchange = (e) => {
                          const target = e.target as HTMLInputElement;
                          handleFileUpload(target.files);
                        };
                        input.click();
                      }}
                    >
                      Browse Files
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 10MB • Supported formats: PDF, DOC, DOCX, TXT
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Information */}
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your resume will be processed to extract key information and create embeddings for personalized proposal generation. 
            The file is stored securely and only accessible by you.
          </AlertDescription>
        </Alert>

        {/* Resumes List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Resumes</CardTitle>
            <CardDescription>
              {resumes.length === 0 
                ? "No resumes uploaded yet"
                : `${resumes.length} resume${resumes.length !== 1 ? 's' : ''} uploaded`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resumes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium mb-2">No resumes uploaded</p>
                <p className="text-sm">Upload your first resume to get started with personalized proposals</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{resume.original_name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{resume.file_type.toUpperCase()}</span>
                          <span>•</span>
                          <span>{formatFileSize(resume.file_size)}</span>
                          <span>•</span>
                          <span>{formatDate(resume.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {resume.is_processed ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <Badge variant="default" className="text-xs">
                              Processed
                            </Badge>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <Badge variant="secondary" className="text-xs">
                              Processing...
                            </Badge>
                          </>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteResume(resume.id)}
                          className="text-destructive hover:text-destructive"
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
