import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchNews, setActiveSources, setMyFeedSources } from '../store/slices/newsSlice';
import { useMediaQuery } from '../hooks/useMediaQuery';
import ArticleList from '../components/news/ArticleList';
import MobileAccordion from '../components/preferences/MobileAccordion';
import SourcesSection from '../components/preferences/SourcesSection';
import CategoriesSection from '../components/preferences/CategoriesSection';
import AuthorsSection from '../components/preferences/AuthorsSection';

const PreferencesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { preferredSources, preferredCategories, preferredAuthors } = useAppSelector(state => state.preferences);
  const { articles, isLoading, error,  filters } = useAppSelector(state => state.news);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [isApplyingPreferences, setIsApplyingPreferences] = useState(false);
  const initialLoadRef = useRef(false);

  // On initial load, fetch if needed
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      
      // Only fetch if we have preferences and no articles
      if ((preferredSources.length > 0 || preferredCategories.length > 0 || preferredAuthors.length > 0) && 
          articles.length === 0) {
        fetchPersonalizedNews();
      }
    }
  }, []);

  // Fetch based on preferences and current search term
  const fetchPersonalizedNews = () => {
    setIsApplyingPreferences(true);
    
    // Update myFeedSources to match preferences
    dispatch(setMyFeedSources(preferredSources));
    
    // Set active sources temporarily for API call
    dispatch(setActiveSources(preferredSources));
    
    // Create a filters object that includes current search keywords
    const myFeedFilters = {
      keywords: filters.keywords || '',
      category: preferredCategories.length === 1 ? preferredCategories[0] : '',
      source: '',
      fromDate: '',
      toDate: '',
      page: 1,
      pageSize: 20,
    };
    
    // Log fetch request for debugging
    console.log('Fetching personalized news with:', {
      sources: preferredSources,
      categories: preferredCategories,
      authors: preferredAuthors,
      filters: myFeedFilters
    });
    
    // Fetch news with custom filters
    dispatch(fetchNews({ 
      filters: myFeedFilters, 
      sources: preferredSources 
    })).finally(() => {
      setIsApplyingPreferences(false);
    });
  };
  
  // Apply preferences button handler - Always fetch when clicked
  const handleApplyPreferences = () => {
    fetchPersonalizedNews();
  };

  // Calculate if any preferences are selected
  const hasSelectedPreferences = preferredSources.length > 0 || 
                               preferredCategories.length > 0 || 
                               preferredAuthors.length > 0;

  return (
    <div className={isMobile ? "pb-20" : ""}>
      <h1 className="text-3xl font-bold mb-6">My Personalized Feed</h1>
      
      {/* Your existing UI code */}
      {isMobile ? (
        <MobileAccordion />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <SourcesSection />
            <CategoriesSection />
          </div>
          <AuthorsSection />
        </>
      )}
      
      {/* Apply preferences button */}
      <div className={`${isMobile ? "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10" : "flex justify-end mb-8"}`}>
        <button
          onClick={handleApplyPreferences}
          disabled={isApplyingPreferences}
          className={`${isMobile ? "w-full" : ""} px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {isApplyingPreferences ? (
            <>
              <span className="inline-block mr-2 animate-spin">⟳</span>
              Updating Feed...
            </>
          ) : (
            'Apply Preferences'
          )}
        </button>
      </div>
      
      {/* Personalized news section */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Personalized News</h2>
        
        {hasSelectedPreferences && (
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            Showing personalized results
          </div>
        )}
      </div>
      
      {/* Display articles */}
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default PreferencesPage;