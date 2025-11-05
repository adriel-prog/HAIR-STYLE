
import React from 'react';
import { WandIcon } from './IconComponents';
import { HairstyleSelector } from './HairstyleSelector';

interface HairstyleFormProps {
  onSelectHairstyle: (prompt: string) => void;
  selectedHairstyle: string | null;
  prompt: string;
  onPromptChange: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isUserImageUploaded: boolean;
  isHairstyleSelected: boolean;
}

export const HairstyleForm: React.FC<HairstyleFormProps> = ({ 
  onSelectHairstyle,
  selectedHairstyle,
  prompt,
  onPromptChange,
  onSubmit, 
  isLoading, 
  isUserImageUploaded,
  isHairstyleSelected
}) => {
  const isDisabled = isLoading || !isUserImageUploaded || !isHairstyleSelected;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">2. Escolha um Estilo</h2>
        <HairstyleSelector
          onSelectHairstyle={onSelectHairstyle}
          selectedHairstyle={selectedHairstyle}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">3. Ajustes (Opcional)</h2>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Ex: cor mais clara, um pouco mais curto nas laterais..."
          className="w-full h-24 p-3 bg-brand-dark rounded-lg border-2 border-brand-light focus:border-brand-teal focus:ring-0 transition-colors text-white"
          disabled={isLoading}
        />
      </div>
      
      <button
        onClick={onSubmit}
        disabled={isDisabled}
        className="w-full flex items-center justify-center gap-2 bg-brand-teal text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-brand-teal/40 mt-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gerando...
          </>
        ) : (
          <>
            <WandIcon className="w-5 h-5" />
            Testar Estilo
          </>
        )}
      </button>
    </div>
  );
};
