// components/preferences/MobileAccordion.tsx
import React, { useState } from 'react';
import SourcesContent from './SourcesContent';
import CategoriesContent from './CategoriesContent';
import AuthorsContent from './AuthorsContent';


const MobileAccordion: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="mb-10 space-y-4">
      {/* Sources dropdown */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <button 
          onClick={() => toggleSection('sources')}
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-xl font-semibold">News Sources</span>
          <span className="text-xl">{openSection === 'sources' ? '−' : '+'}</span>
        </button>
        
        {openSection === 'sources' && (
          <div className="p-4">
            <SourcesContent />
          </div>
        )}
      </div>
      
      {/* Categories dropdown */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <button 
          onClick={() => toggleSection('categories')}
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-xl font-semibold">News Categories</span>
          <span className="text-xl">{openSection === 'categories' ? '−' : '+'}</span>
        </button>
        
        {openSection === 'categories' && (
          <div className="p-4">
            <CategoriesContent />
          </div>
        )}
      </div>
      
      {/* Authors dropdown */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <button 
          onClick={() => toggleSection('authors')}
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-xl font-semibold">Favorite Authors</span>
          <span className="text-xl">{openSection === 'authors' ? '−' : '+'}</span>
        </button>
        
        {openSection === 'authors' && (
          <div className="p-4">
            <AuthorsContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAccordion;