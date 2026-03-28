import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X, Check } from 'lucide-react';

interface DropzoneProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
  acceptedTypes?: string[];
  maxSize?: number;
}

export function Dropzone({
  onFileUpload,
  isLoading = false,
  acceptedTypes = ['.pdf', '.txt', '.doc', '.docx'],
  maxSize = 10 * 1024 * 1024,
}: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(extension)) {
      setError(`Tipo de archivo no válido. Acepta: ${acceptedTypes.join(', ')}`);
      return false;
    }
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande (máx. 10MB)');
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      onFileUpload(droppedFile);
    }
  }, [onFileUpload, acceptedTypes, maxSize]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <motion.div
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          animate={{
            borderColor: isDragging ? '#2ECC71' : error ? '#EF4444' : '#E5E7EB',
            backgroundColor: isDragging ? 'rgba(46, 204, 113, 0.05)' : '#FAFAFA',
          }}
          className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <motion.div
              animate={{ y: isDragging ? -10 : 0 }}
              className="w-16 h-16 mx-auto mb-4 bg-mint/10 rounded-full flex items-center justify-center"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-4 border-mint border-t-transparent rounded-full"
                />
              ) : (
                <Upload size={32} className="text-mint" />
              )}
            </motion.div>

            <h3 className="text-lg font-semibold text-navy mb-2">
              {isDragging ? '¡Suelta tu archivo aquí!' : 'Sube tu pauta nutricional'}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Arrastra y suelta o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-400">
              Formatos: PDF, TXT, DOC, DOCX (máx. 10MB)
            </p>
          </label>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-mint/5 border-2 border-mint rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-mint" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-navy truncate">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-4 border-mint border-t-transparent rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-mint rounded-full flex items-center justify-center">
                <Check size={20} className="text-white" />
              </div>
            )}
            <button
              onClick={clearFile}
              className="p-2 hover:bg-mint/10 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
