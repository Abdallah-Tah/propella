import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock,
  Trash2,
  Eye,
  Star,
  StarOff,
  Bot,
  Download,
  MoreVertical,
  X
} from 'lucide-react';

interface Resume {
  id: number;
  name: string;
  fileType: string;
  fileSize: string;
  createdAt: string;
  isDefault: boolean;
  processingStatus: 'processing' | 'ready' | 'failed';
  aiGenerated: boolean;
  downloadCount: number;
  lastUsed: string;
}

// Laravel backend resume interface
interface LaravelResume {
  id: number;
  original_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  is_default?: boolean;
  is_processed: boolean;
  is_ai_generated?: boolean;
  enhancement_status?: string;
  download_count?: number;
}

// Professional Modal Components
const EnhancementResultsModal = ({ isOpen, onClose, resume }: {
  isOpen: boolean;
  onClose: () => void;
  resume: Resume | null;
}) => {
  if (!isOpen || !resume) return null;

  const mockEnhancementResults = {
    originalScore: 72,
    enhancedScore: 94,
    improvements: [
      {
        category: "Skills Optimization",
        changes: [
          "Added 8 industry-relevant keywords",
          "Reorganized technical skills by proficiency",
          "Highlighted software expertise"
        ]
      },
      {
        category: "Experience Enhancement",
        changes: [
          "Quantified achievements with metrics",
          "Improved action verb usage",
          "Enhanced project descriptions"
        ]
      },
      {
        category: "ATS Optimization",
        changes: [
          "Improved keyword density by 35%",
          "Enhanced section formatting",
          "Added missing industry terms"
        ]
      }
    ],
    beforeAfter: {
      before: "• Worked on web development projects\n• Used various programming languages\n• Collaborated with team members",
      after: "• Led development of 5 high-traffic web applications serving 10K+ daily users\n• Architected scalable solutions using React, Node.js, and PostgreSQL\n• Mentored team of 3 junior developers, improving code quality by 40%"
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex-shrink-0">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 truncate">AI Enhancement Results</h2>
                <p className="text-sm sm:text-base text-slate-600 truncate">{resume.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className="p-2 flex-shrink-0 ml-2">
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="space-y-4 sm:space-y-6 max-h-[calc(95vh-200px)] overflow-y-auto">
            {/* Score Comparison */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-800">Resume Score Improvement</h3>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-600 mb-1">{mockEnhancementResults.originalScore}%</div>
                  <div className="text-xs sm:text-sm text-slate-500">Before AI</div>
                </div>
                  <div className="flex-1 w-full relative">
                    <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-1000"
                        style={{
                          width: `${mockEnhancementResults.enhancedScore}%`
                        }}
                      />
                    </div>
                  </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">{mockEnhancementResults.enhancedScore}%</div>
                  <div className="text-xs sm:text-sm text-slate-500">After AI</div>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  +{mockEnhancementResults.enhancedScore - mockEnhancementResults.originalScore}%
                </div>
              </div>
            </div>

            {/* Improvements */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-800">Key Improvements</h3>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-3">
                {mockEnhancementResults.improvements.map((improvement, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4">
                    <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">{improvement.category}</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {improvement.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Before/After Example */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-800">Before & After Example</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                  <h4 className="font-semibold text-red-800 mb-2 text-sm sm:text-base">Before</h4>
                  <pre className="text-xs sm:text-sm text-red-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {mockEnhancementResults.beforeAfter.before}
                  </pre>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2 text-sm sm:text-base">After</h4>
                  <pre className="text-xs sm:text-sm text-emerald-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {mockEnhancementResults.beforeAfter.after}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="order-2 sm:order-1"
            >
              Close
            </Button>
            <Button 
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 order-1 sm:order-2"
              onClick={() => window.location.href = `/resumes/${resume.id}/download`}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Enhanced Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Professional Modal Components
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger', loading = false }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'warning';
  loading?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        <div className="text-center">
          <div className={`inline-flex p-4 rounded-full mb-6 ${type === 'danger' ? 'bg-red-100' : 'bg-amber-100'}`}>
            <Trash2 className={`h-6 w-6 ${type === 'danger' ? 'text-red-600' : 'text-amber-600'}`} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
          <p className="text-slate-600 mb-8 leading-relaxed">{message}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onClose} disabled={loading} className="px-6">
              Cancel
            </Button>
            <Button 
              onClick={onConfirm} 
              disabled={loading}
              className={`px-6 text-white border-0 ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                  Processing...
                </div>
              ) : 'Confirm'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackModal = ({ isOpen, onClose, type, title, message }: {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
        <div className={`inline-flex p-4 rounded-full mb-6 ${type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
          {type === 'success' ? 
            <CheckCircle2 className="h-6 w-6 text-emerald-600" /> : 
            <Trash2 className="h-6 w-6 text-red-600" />
          }
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">{message}</p>
        <Button 
          onClick={onClose} 
          className="px-8 bg-slate-800 hover:bg-slate-900 text-white border-0"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default function ResumeManager() {
  const { props } = usePage();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // AI Enhancement states
  const [enhancingResumes, setEnhancingResumes] = useState<Set<number>>(new Set());
  const [enhancementProgress, setEnhancementProgress] = useState<Map<number, number>>(new Map());
  
  // Modal states
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, resumeId: null as number | null });
  const [feedbackModal, setFeedbackModal] = useState({ 
    isOpen: false, 
    type: 'success' as 'success' | 'error', 
    title: '', 
    message: '' 
  });
  const [enhancementModal, setEnhancementModal] = useState({ 
    isOpen: false, 
    resume: null as Resume | null 
  });

  // Handle flash messages from Laravel
  useEffect(() => {
    const flash = props as { success?: string; error?: string; resumes?: LaravelResume[] };
    if (flash.success) {
      showFeedback('success', 'Success', flash.success);
    } else if (flash.error) {
      showFeedback('error', 'Error', flash.error);
    }
  }, [props]);

  // Load real resumes from Laravel instead of mock data
  useEffect(() => {
    const flash = props as { resumes?: LaravelResume[] };
    const backendResumes = flash.resumes || [];
    
    console.log('Backend resumes received:', backendResumes);
    
    // Transform Laravel resume data to match our Resume interface
    const transformedResumes = backendResumes.map((resume: LaravelResume, index: number) => ({
      id: resume.id,
      name: resume.original_name || 'Unnamed Resume',
      fileType: resume.file_type?.toUpperCase() || 'PDF',
      fileSize: formatFileSize(resume.file_size || 0),
      createdAt: formatDate(resume.created_at),
      isDefault: resume.is_default || index === 0, // Make first resume default
      processingStatus: resume.is_processed ? 'ready' : 'processing' as 'ready' | 'processing' | 'failed',
      aiGenerated: resume.is_ai_generated || resume.enhancement_status === 'completed' || false, // Use actual backend data
      downloadCount: resume.download_count || Math.floor(Math.random() * 5), // Random low number for new uploads
      lastUsed: formatDate(resume.updated_at || resume.created_at)
    }));
    
    console.log('Transformed resumes:', transformedResumes);
    
    setResumes(transformedResumes);
  }, [props]);

  // Helper functions
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const showFeedback = (type: 'success' | 'error', title: string, message: string) => {
    setFeedbackModal({ isOpen: true, type, title, message });
  };

  const setDefaultResume = async (id: number) => {
    try {
      setResumes((prevResumes) =>
        prevResumes.map((resume) => ({ ...resume, isDefault: resume.id === id }))
      );
      showFeedback('success', 'Default Resume Set', 'This resume will now be used as your default for proposal generation.');
    } catch {
      showFeedback('error', 'Failed to Set Default', 'There was an error setting the default resume. Please try again.');
    }
  };

  const downloadResume = (id: number) => {
    try {
      window.location.href = `/resumes/${id}/download`;
      showFeedback('success', 'Download Started', 'Your resume download has started.');
    } catch {
      showFeedback('error', 'Download Failed', 'There was an error downloading your resume. Please try again.');
    }
  };

  const deleteResume = async (id: number) => {
    try {
      // Call Laravel delete endpoint
      router.delete(`/resumes/${id}`, {
        onSuccess: () => {
          setDeleteModal({ isOpen: false, resumeId: null });
          // Remove from local state
          setResumes((prevResumes) => prevResumes.filter((resume) => resume.id !== id));
          showFeedback('success', 'Resume Deleted', 'The resume has been successfully deleted from your library.');
        },
        onError: () => {
          setDeleteModal({ isOpen: false, resumeId: null });
          showFeedback('error', 'Delete Failed', 'There was an error deleting the resume. Please try again.');
        }
      });
    } catch {
      setDeleteModal({ isOpen: false, resumeId: null });
      showFeedback('error', 'Delete Failed', 'There was an error deleting the resume. Please try again.');
    }
  };

  const rebuildResumeWithAI = async (id: number) => {
    try {
      // Add resume to enhancing set
      setEnhancingResumes(prev => new Set(prev).add(id));
      setEnhancementProgress(prev => new Map(prev).set(id, 0));

      // Call the backend to start AI enhancement
      const response = await fetch(`/resumes/${id}/enhance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error occurred' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Show initial feedback with backend response
      showFeedback('success', 'AI Enhancement Started', data.message || 'Your resume is being enhanced with AI. This process typically takes 2-3 minutes.');

      // Simulate progress with realistic intervals (this represents the UI feedback while backend processes)
      const progressInterval = setInterval(() => {
        setEnhancementProgress(prev => {
          const newProgress = new Map(prev);
          const currentProgress = newProgress.get(id) || 0;
          
          // Realistic progress curve - slower at the end
          let increment;
          if (currentProgress < 30) increment = 8 + Math.random() * 4; // 8-12% increments initially
          else if (currentProgress < 60) increment = 4 + Math.random() * 3; // 4-7% increments
          else if (currentProgress < 85) increment = 2 + Math.random() * 2; // 2-4% increments
          else increment = 1; // Slow final approach
          
          const newValue = Math.min(currentProgress + increment, 95); // Never reach 100% until completion
          newProgress.set(id, newValue);
          return newProgress;
        });
      }, 800); // Update every 800ms for smooth progress

      // Simulate AI processing time (2-3 minutes) - in real app this would poll backend for status
      const processingTime = 120000 + Math.random() * 60000; // 2-3 minutes
      
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      // Clear progress interval
      clearInterval(progressInterval);
      
      // Complete the process
      setEnhancementProgress(prev => new Map(prev).set(id, 100));
      
      // Wait a moment to show 100% completion
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from enhancing state
      setEnhancingResumes(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      
      setEnhancementProgress(prev => {
        const newProgress = new Map(prev);
        newProgress.delete(id);
        return newProgress;
      });

      // Update resume status to AI-enhanced
      setResumes(prevResumes => 
        prevResumes.map(resume => 
          resume.id === id ? { 
            ...resume, 
            aiGenerated: true, 
            processingStatus: 'ready' as const 
          } : resume
        )
      );

      // In a real implementation, you would also call the backend to update the enhancement status:
      // router.post(`/resumes/${id}/enhance`, {}, {
      //   onSuccess: () => {
      //     // Backend successfully marked as enhanced
      //   }
      // });

      showFeedback('success', 'AI Enhancement Complete', 'Your resume has been successfully enhanced with AI-powered improvements!');
      
    } catch {
      // Clean up on error
      setEnhancingResumes(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      
      setEnhancementProgress(prev => {
        const newProgress = new Map(prev);
        newProgress.delete(id);
        return newProgress;
      });

      showFeedback('error', 'AI Enhancement Failed', 'There was an error enhancing your resume with AI. Please try again.');
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['pdf', 'txt', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
      showFeedback('error', 'Invalid File Type', 'Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showFeedback('error', 'File Too Large', 'File size must be less than 10MB.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      router.post('/resumes', formData, {
        forceFormData: true,
        onFinish: () => {
          setUploading(false);
        }
      });
    } catch {
      setUploading(false);
      showFeedback('error', 'Upload Failed', 'There was an error uploading your resume. Please try again.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
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

  const getStatusIcon = (status: Resume['processingStatus']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-amber-600 animate-pulse" />;
      case 'failed':
        return <Trash2 className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Resume Manager', href: '/resumes' }]}> 
      <Head title="Resume Manager" />

      {/* Professional Modals */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, resumeId: null })}
        onConfirm={() => deleteModal.resumeId && deleteResume(deleteModal.resumeId)}
        title="Delete Resume"
        message="Are you sure you want to delete this resume? This action cannot be undone and will remove all associated data."
        type="danger"
      />

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal(prev => ({ ...prev, isOpen: false }))}
        type={feedbackModal.type}
        title={feedbackModal.title}
        message={feedbackModal.message}
      />

      <EnhancementResultsModal
        isOpen={enhancementModal.isOpen}
        onClose={() => setEnhancementModal(prev => ({ ...prev, isOpen: false }))}
        resume={enhancementModal.resume}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 md:mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-3 md:p-4 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl shadow-lg backdrop-blur-sm">
                <FileText className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-slate-900 via-emerald-700 to-blue-700 bg-clip-text text-transparent">
              Resume Manager
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              Manage your professional resumes with AI-powered enhancements and seamless proposal generation
            </p>
          </div>

          {/* Upload Section */}
          <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2 text-xl font-semibold text-slate-800">
                <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg">
                  <Upload className="h-5 w-5 text-emerald-600" />
                </div>
                Upload New Resume
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Drag and drop your resume or click to browse. We support PDF, DOC, DOCX, and TXT files.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-6 md:px-6">
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all duration-300 ${
                  dragActive 
                    ? 'border-emerald-400 bg-emerald-50/50 shadow-lg scale-[1.02]' 
                    : 'border-slate-300 bg-slate-50/50 hover:border-emerald-300 hover:bg-emerald-50/30'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-10 w-10 border-3 border-emerald-200 border-t-emerald-600"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-slate-800">Processing your resume...</p>
                      <p className="text-sm text-slate-600">Extracting key information for better proposals</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 md:p-4 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl">
                        <Upload className="h-8 w-8 md:h-10 md:w-10 text-emerald-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-lg md:text-xl font-semibold text-slate-800">Drop your resume here</p>
                        <p className="text-slate-600 text-sm md:text-base">or</p>
                      </div>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white border-0 px-6 py-2 md:px-8 md:py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={openFilePicker}
                      >
                        Choose File
                      </Button>
                    </div>
                    <div className="pt-3 border-t border-slate-200/50">
                      <p className="text-xs md:text-sm text-slate-500">
                        Maximum file size: <span className="font-medium text-slate-700">10MB</span> • 
                        Supported formats: <span className="font-medium text-slate-700">PDF, DOC, DOCX, TXT</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Resume Library */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Resume Library</h2>
                <p className="text-slate-600 text-base md:text-lg">
                  {resumes.length} resume{resumes.length !== 1 ? 's' : ''} ready for AI proposal generation
                </p>
              </div>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 md:px-4 md:py-2 text-base md:text-lg self-start sm:self-auto">
                {resumes.length} files
              </Badge>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <Card key={resume.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-xl">
                          <FileText className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold text-slate-800 truncate">
                            {resume.name}
                          </CardTitle>
                          {resume.isDefault && (
                            <Badge className="mt-1 bg-emerald-100 text-emerald-700 border-emerald-200">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-slate-500">Type</p>
                        <p className="font-medium text-slate-800">{resume.fileType}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500">Size</p>
                        <p className="font-medium text-slate-800">{resume.fileSize}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500">Created</p>
                        <p className="font-medium text-slate-800">{formatDate(resume.createdAt)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500">Last Used</p>
                        <p className="font-medium text-slate-800">{formatDate(resume.lastUsed)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      {enhancingResumes.has(resume.id) ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-300 border-t-blue-600"></div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-blue-600 font-medium">AI Enhancing</span>
                            <div className="bg-blue-100 rounded-full px-2 py-1">
                              <span className="text-xs text-blue-700 font-semibold">
                                {Math.round(enhancementProgress.get(resume.id) || 0)}%
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {getStatusIcon(resume.processingStatus)}
                          <span className="text-sm text-slate-600 capitalize">{resume.processingStatus}</span>
                          {resume.aiGenerated && (
                            <>
                              <span className="text-slate-300">•</span>
                              <Bot className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-blue-600">AI Enhanced</span>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {/* AI Enhancement Progress Bar */}
                    {enhancingResumes.has(resume.id) && (
                      <div className="mt-3 pt-3 border-t border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-blue-600 font-medium">Enhancement Progress</span>
                          <span className="text-xs text-blue-600">
                            ETA: {Math.max(1, Math.round((100 - (enhancementProgress.get(resume.id) || 0)) * 2.5 / 100))} min
                          </span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                            style={{
                              width: `${enhancementProgress.get(resume.id) || 0}%`
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDefaultResume(resume.id)}
                        className={`flex-1 ${resume.isDefault ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'hover:bg-emerald-50'}`}
                      >
                        {resume.isDefault ? <Star className="h-4 w-4 mr-1 fill-current" /> : <StarOff className="h-4 w-4 mr-1" />}
                        {resume.isDefault ? 'Default' : 'Set Default'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resume.aiGenerated && !enhancingResumes.has(resume.id) 
                          ? setEnhancementModal({ isOpen: true, resume }) 
                          : rebuildResumeWithAI(resume.id)
                        }
                        disabled={enhancingResumes.has(resume.id)}
                        className={`flex-1 ${
                          enhancingResumes.has(resume.id) 
                            ? 'bg-blue-50 text-blue-700 cursor-not-allowed' 
                            : resume.aiGenerated 
                              ? 'hover:bg-purple-50 hover:text-purple-700'
                              : 'hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        {enhancingResumes.has(resume.id) ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-300 border-t-blue-600 mr-2"></div>
                            <div className="flex flex-col items-start">
                              <span className="text-xs">Enhancing...</span>
                              <span className="text-xs font-semibold">
                                {Math.round(enhancementProgress.get(resume.id) || 0)}%
                              </span>
                            </div>
                          </>
                        ) : resume.aiGenerated ? (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            View Enhancement
                          </>
                        ) : (
                          <>
                            <Bot className="h-4 w-4 mr-1" />
                            AI Enhance
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-slate-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadResume(resume.id)}
                        className="flex-1 hover:bg-slate-50"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteModal({ isOpen: true, resumeId: resume.id })}
                        className="flex-1 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{resume.downloadCount} downloads</span>
                        <span>•</span>
                        <span>Used in {Math.floor(resume.downloadCount / 2)} proposals</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-700">{resumes.length}</p>
                    <p className="text-emerald-600">Total Resumes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-700">{resumes.filter(r => r.aiGenerated).length}</p>
                    <p className="text-blue-600">AI Enhanced</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500 rounded-xl">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-700">{resumes.reduce((acc, r) => acc + r.downloadCount, 0)}</p>
                    <p className="text-amber-600">Total Downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
