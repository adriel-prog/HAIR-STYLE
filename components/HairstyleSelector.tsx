
import React from 'react';
import { hairstyleOptions } from '../data/hairstyles';

interface HairstyleSelectorProps {
  selectedHairstyle: string | null;
  onSelectHairstyle: (prompt: string) => void;
}

export const HairstyleSelector: React.FC<HairstyleSelectorProps> = ({ selectedHairstyle, onSelectHairstyle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {hairstyleOptions.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelectHairstyle(style.prompt)}
          className={`relative rounded-lg overflow-hidden focus:outline-none transition-all duration-200 group transform hover:scale-105 ${
            selectedHairstyle === style.prompt ? 'ring-4 ring-brand-teal' : 'ring-2 ring-transparent'
          }`}
          aria-pressed={selectedHairstyle === style.prompt}
          aria-label={`Selecionar estilo: ${style.name}`}
        >
          <img src={style.imageUrl} alt={style.name} className="w-full h-full object-cover aspect-square" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <p className="absolute bottom-2 left-2 right-2 text-xs font-bold text-white text-center truncate">{style.name}</p>
          {selectedHairstyle === style.prompt && (
            <div className="absolute top-2 right-2 bg-brand-teal rounded-full p-1" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
