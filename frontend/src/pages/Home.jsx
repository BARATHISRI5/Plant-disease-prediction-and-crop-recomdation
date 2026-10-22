import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageUploader from '../components/ImageUploader';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (file, url) => {
    setSelectedFile(file);
    setPreviewUrl(url);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`http://localhost:8000/predict?lang=${i18n.language || 'en'}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      navigate('/result', { state: { result: data, imagePreview: previewUrl } });
    } catch (err) {
      setError('Failed to reach the server. Make sure the backend is running.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-green mb-4 leading-tight">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
        <ImageUploader onFileSelect={handleFileSelect} />

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" />
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {selectedFile && !loading && (
          <button
            onClick={handleAnalyze}
            className="w-full mt-6 bg-primary-green hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:-translate-y-1 active:scale-95 text-lg"
          >
            {t('predict_button')}
          </button>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <Loader2 size={64} className="text-primary-green animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">{t('analyzing')}</h2>
          <p className="text-gray-500 mt-2 text-center max-w-sm px-4">
            Our AI is carefully examining your leaf for signs of disease...
          </p>
        </div>
      )}
    </div>
  );
}
