
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { HairstyleForm } from './components/HairstyleForm';
import { ResultDisplay } from './components/ResultDisplay';
import { generateHairstyle } from './services/geminiService';
import type { ImageState } from './types';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<ImageState>({ file: null, previewUrl: null });
  const [referenceImage, setReferenceImage] = useState<ImageState>({ file: null, previewUrl: null });
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUserImageUpload = useCallback((file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setUserImage({ file, previewUrl });
    setGeneratedImage(null);
    setError(null);
  }, []);
  
  const handleReferenceImageUpload = useCallback((file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setReferenceImage({ file, previewUrl });
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handlePromptChange = useCallback((text: string) => {
    setPrompt(text);
  }, []);


  const handleSubmit = async () => {
    if (!userImage.file || !referenceImage.file) {
      setError('Por favor, envie sua foto e uma imagem de referência.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultImage = await generateHairstyle(userImage.file, prompt, referenceImage.file);
      setGeneratedImage(resultImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-brand-medium p-6 rounded-2xl shadow-2xl flex flex-col gap-6 h-fit">
            <h2 className="text-2xl font-bold text-white mb-2">1. Sua Foto</h2>
            <ImageUploader 
              onImageUpload={handleUserImageUpload} 
              previewUrl={userImage.previewUrl}
              title="Sua Foto"
              description="Clique para enviar ou arraste e solte"
            />
            <HairstyleForm
              onReferenceImageUpload={handleReferenceImageUpload}
              referenceImagePreviewUrl={referenceImage.previewUrl}
              prompt={prompt}
              onPromptChange={handlePromptChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isUserImageUploaded={!!userImage.file}
              isHairstyleSelected={!!referenceImage.file}
            />
          </div>
          <div className="lg:col-span-8">
            <ResultDisplay
              originalImage={userImage.previewUrl}
              generatedImage={generatedImage}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 mt-8">
        <p>Powered by Gemini AI. Crie seu novo visual hoje.</p>
      </footer>
    </div>
  );
};

export default App;
