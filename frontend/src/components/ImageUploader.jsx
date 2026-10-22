import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({ onFileSelect }) {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileDetails({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      });
      onFileSelect(file, url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${dragActive ? 'border-primary-green bg-green-50' : 'border-gray-300 hover:bg-gray-50 bg-white'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <input 
          ref={inputRef} 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleChange} 
        />
        
        {preview ? (
          <div className="flex flex-col items-center w-full">
            <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-xl shadow-sm mb-4" />
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
              <ImageIcon size={16} />
              <span className="truncate max-w-[200px]">{fileDetails.name}</span>
              <span className="text-gray-400">({fileDetails.size})</span>
            </div>
            <p className="mt-4 text-primary-green text-sm font-medium">{t('upload_new')}</p>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 text-primary-green rounded-full flex items-center justify-center mb-4">
              <UploadCloud size={32} />
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">{t('upload_label')}</p>
            <p className="text-sm text-gray-500">Supports JPG, PNG</p>
          </div>
        )}
      </div>
    </div>
  );
}
