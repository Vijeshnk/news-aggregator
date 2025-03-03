import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchNews, setFilters, nextPage, prevPage } from '../store/slices/newsSlice';
import ArticleList from '../components/news/ArticleList';
import FilterBar from '../components/common/FilterBar';
import Pagination from '../components/common/Pagination';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error, totalResults, filters, activeSources } = useAppSelector(state => state.news);
  
  // For the filter bar
  const [sourcesList] = useState([
    { id: 'news-api', name: 'News API' },
    { id: 'the-guardian', name: 'The Guardian' },
    { id: 'new-york-times', name: 'New York Times' },
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / filters.pageSize);

  // Fetch news on component mount and when filters change
  useEffect(() => {
    dispatch(fetchNews({ filters, sources: activeSources }));
  }, [dispatch, filters, activeSources]);

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ category }));
  };

  const handleSourceChange = (source: string) => {
    dispatch(setFilters({ source }));
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      
      <FilterBar
        onCategoryChange={handleCategoryChange}
        onSourceChange={handleSourceChange}
        onDateChange={handleDateChange}
        selectedCategory={filters.category || ''}
        selectedSource={filters.source || ''}
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