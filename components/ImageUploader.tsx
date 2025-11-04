
import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
  title: string;
  description: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl, title, description }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="relative w-full aspect-square bg-brand-dark rounded-lg border-2 border-dashed border-brand-light hover:border-brand-teal transition-all duration-300 flex items-center justify-center cursor-pointer group"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="text-center text-gray-400 p-4">
          <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-500 group-hover:text-brand-teal transition-colors" />
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
          <p className="text-xs mt-2 text-gray-500">PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};
