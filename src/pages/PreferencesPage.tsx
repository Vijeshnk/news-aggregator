// PreferencesPage.tsx
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchNews, setActiveSources } from '../store/slices/newsSlice';
import { useMediaQuery } from '../hooks/useMediaQuery';
import ArticleList from '../components/news/ArticleList';
import MobileAccordion from '../components/preferences/MobileAccordion';
import SourcesSection from '../components/preferences/SourcesSection';
import CategoriesSection from '../components/preferences/CategoriesSection';
import AuthorsSection from '../components/preferences/AuthorsSection';


const PreferencesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { preferredSources, preferredCategories } = useAppSelector(state => state.preferences);
  const { articles, isLoading, error, filters } = useAppSelector(state => state.news);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Fetch personalized news on component mount
  useEffect(() => {
    dispatch(setActiveSources(preferredSources));
    
    const preferencesFilters = {
      ...filters,
      category: preferredCategories.length === 1 ? preferredCategories[0] : '',
    };
    
    dispatch(fetchNews({ 
      filters: preferencesFilters, 
      sources: preferredSources 
    }));
  }, [dispatch, preferredSources, preferredCategories, filters]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Personalized Feed</h1>
      
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
      
      <h2 className="text-2xl font-semibold mb-4">Your Personalized News</h2>
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default PreferencesPage;