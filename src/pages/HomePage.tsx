import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchNews, setFilters, setActiveSources, setHomePageSources, nextPage, prevPage } from '../store/slices/newsSlice';
import ArticleList from '../components/news/ArticleList';
import FilterBar from '../components/common/FilterBar';
import Pagination from '../components/common/Pagination';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error, totalResults, filters, homePageSources } = useAppSelector(state => state.news);
  
  // Define source list with our three main sources
  const [sourcesList] = useState([
    { id: 'news-api', name: 'News API' },
    { id: 'the-guardian', name: 'The Guardian' },
    { id: 'new-york-times', name: 'New York Times' },
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / filters.pageSize);

  // Fetch news on component mount and when filters change
  useEffect(() => {
    // Set active sources temporarily for the API call
    dispatch(setActiveSources(homePageSources));
    
    // Fetch news with the home page sources
    dispatch(fetchNews({ filters, sources: homePageSources }));
  }, [dispatch, filters, homePageSources]);

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ category }));
  };

  const handleSourceChange = (source: string) => {
    // If a source is selected, set it as the only active source
    if (source) {
      dispatch(setHomePageSources([source]));
    } else {
      // If selecting "All Sources", reset
      dispatch(setHomePageSources([]));
    }
  };

  const handleDateChange = (fromDate: string, toDate: string) => {
    dispatch(setFilters({ fromDate, toDate }));
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page > filters.page) {
      dispatch(nextPage());
    } else if (page < filters.page) {
      dispatch(prevPage());
    }
  };

  // Determine which source is currently selected for the dropdown
  const selectedSource = homePageSources.length === 1 ? homePageSources[0] : '';

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      
      <FilterBar
        onCategoryChange={handleCategoryChange}
        onSourceChange={handleSourceChange}
        onDateChange={handleDateChange}
        selectedCategory={filters.category || ''}
        selectedSource={selectedSource} // Use the home page sources for selection
        fromDate={filters.fromDate || ''}
        toDate={filters.toDate || ''}
        sources={sourcesList}
      />

      <ArticleList 
        articles={articles} 
        isLoading={isLoading} 
        error={error} 
      />

      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;