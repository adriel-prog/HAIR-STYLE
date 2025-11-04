
import React from 'react';
import { Spinner } from './Spinner';
import { ImageIcon, AlertTriangleIcon } from './IconComponents';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImagePanel: React.FC<{ title: string; imageUrl: string | null; children?: React.ReactNode }> = ({ title, imageUrl, children }) => (
  <div className="w-full bg-brand-medium rounded-2xl shadow-lg flex flex-col p-4">
    <h3 className="text-lg font-semibold text-center mb-4 text-white">{title}</h3>
    <div className="aspect-square w-full bg-brand-dark rounded-lg flex items-center justify-center overflow-hidden">
      {imageUrl ? <img src={imageUrl} alt={title} className="w-full h-full object-cover" /> : children}
    </div>
  </div>
);

const Placeholder: React.FC<{ message: string; icon: React.ReactNode }> = ({ message, icon }) => (
  <div className="text-center text-gray-500 p-4">
    {icon}
    <p>{message}</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading, error }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ImagePanel title="Antes" imageUrl={originalImage}>
        <Placeholder message="Envie sua foto para começar" icon={<ImageIcon className="w-16 h-16 mx-auto mb-4" />} />
      </ImagePanel>
      <ImagePanel title="Depois" imageUrl={generatedImage}>
        {isLoading ? (
          <Spinner />
        ) : error ? (
            <div className="text-center text-red-400 p-4 flex flex-col items-center justify-center h-full">
                <AlertTriangleIcon className="w-12 h-12 mx-auto mb-4" />
                <p className="font-semibold">Falha na Geração</p>
                <p className="text-sm">{error}</p>
            </div>
        ) : (
          !generatedImage && <Placeholder message="Seu novo visual aparecerá aqui" icon={<ImageIcon className="w-16 h-16 mx-auto mb-4" />} />
        )}
      </ImagePanel>
    </div>
  );
};
