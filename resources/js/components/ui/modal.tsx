import React from 'react';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className={`relative bg-white rounded-2xl shadow-2xl border-0 ${sizeClasses[size]} w-full mx-4 transform transition-all duration-300 scale-100`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  loading = false
}) => {
  const iconMap = {
    danger: <XCircle className="h-6 w-6 text-red-600" />,
    warning: <AlertTriangle className="h-6 w-6 text-amber-600" />,
    info: <Info className="h-6 w-6 text-blue-600" />
  };

  const buttonColorMap = {
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-full ${type === 'danger' ? 'bg-red-100' : type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'}`}>
            {iconMap[type]}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          </div>
        </div>
        
        <p className="text-slate-600 mb-8 leading-relaxed">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="px-6"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={`px-6 text-white border-0 ${buttonColorMap[type]} focus:ring-2 focus:ring-offset-2`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                Processing...
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoClose = false,
  autoCloseDelay = 3000
}) => {
  React.useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  const iconMap = {
    success: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
    error: <XCircle className="h-6 w-6 text-red-600" />,
    info: <Info className="h-6 w-6 text-blue-600" />
  };

  const backgroundMap = {
    success: 'bg-emerald-100',
    error: 'bg-red-100',
    info: 'bg-blue-100'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-8 text-center">
        <div className={`inline-flex p-4 rounded-full ${backgroundMap[type]} mb-6`}>
          {iconMap[type]}
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
    </Modal>
  );
};
