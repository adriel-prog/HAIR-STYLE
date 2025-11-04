
import React from 'react';
import { SparklesIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-medium/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-brand-teal" />
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Estilista Virtual
          </h1>
        </div>
      </div>
    </header>
  );
};
