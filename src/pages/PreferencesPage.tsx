import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { 
  setPreferredSources, 
  setPreferredCategories, 
  addPreferredAuthor,
  removePreferredAuthor
} from '../store/slices/preferencesSlice';
import { fetchNews, setActiveSources } from '../store/slices/newsSlice';
import { NEWS_CATEGORIES } from '../config/api.config';
import ArticleList from '../components/news/ArticleList';

const PreferencesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { preferredSources, preferredCategories, preferredAuthors } = useAppSelector(state => state.preferences);
  const { articles, isLoading, error, filters } = useAppSelector(state => state.news);
  
  const [newAuthor, setNewAuthor] = useState('');

  // Available sources
  const availableSources = [
    { id: 'news-api', name: 'News API' },
    { id: 'the-guardian', name: 'The Guardian' },
    { id: 'new-york-times', name: 'New York Times' },
  ];

  // Fetch personalized news on component mount
  useEffect(() => {
    // Set active sources based on preferences
    dispatch(setActiveSources(preferredSources));
    
    // Fetch news with preferences
    const preferencesFilters = {
      ...filters,
      category: preferredCategories.length === 1 ? preferredCategories[0] : '',
    };
    
    dispatch(fetchNews({ 
      filters: preferencesFilters, 
      sources: preferredSources 
    }));
  }, [dispatch, preferredSources, preferredCategories, filters]);

  // Handle source preferences change
  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let newSources = [...preferredSources];
    
    if (checked && !newSources.includes(value)) {
      newSources.push(value);
    } else if (!checked) {
      newSources = newSources.filter(source => source !== value);
    }
    
    dispatch(setPreferredSources(newSources));
  };

  // Handle category preferences change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let newCategories = [...preferredCategories];
    
    if (checked && !newCategories.includes(value)) {
      newCategories.push(value);
    } else if (!checked) {
      newCategories = newCategories.filter(category => category !== value);
    }
    
    dispatch(setPreferredCategories(newCategories));
  };

  // Handle adding a new author
  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor.trim() && !preferredAuthors.includes(newAuthor.trim())) {
      dispatch(addPreferredAuthor(newAuthor.trim()));
      setNewAuthor('');
    }
  };

  // Handle removing an author
  const handleRemoveAuthor = (author: string) => {
    dispatch(removePreferredAuthor(author));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Personalized Feed</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Source preferences */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">News Sources</h2>
          <p className="text-gray-600 mb-4">Select your preferred news sources:</p>
          
          <div className="space-y-2">
            {availableSources.map(source => (
              <label key={source.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={source.id}
                  checked={preferredSources.includes(source.id)}
                  onChange={handleSourceChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span>{source.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Category preferences */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">News Categories</h2>
          <p className="text-gray-600 mb-4">Select your preferred categories:</p>
          
          <div className="grid grid-cols-2 gap-2">
            {NEWS_CATEGORIES.map(category => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={preferredCategories.includes(category)}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Author preferences */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Favorite Authors</h2>
        <p className="text-gray-600 mb-4">Add authors you're interested in following:</p>
        
        <form onSubmit={handleAddAuthor} className="flex mb-4">
          <input
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="Enter author name"
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </form>
        
        {preferredAuthors.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {preferredAuthors.map(author => (
              <div key={author} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                <span>{author}</span>
                <button
                  onClick={() => handleRemoveAuthor(author)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  aria-label={`Remove ${author}`}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No favorite authors added yet.</p>
        )}
      </div>
      
      {/* Personalized news feed */}
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