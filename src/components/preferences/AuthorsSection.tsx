import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { addPreferredAuthor, removePreferredAuthor } from '../../store/slices/preferencesSlice';
import { fetchArticlesByAuthor } from '../../services/api/news.service';

const AuthorsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { preferredAuthors } = useAppSelector(state => state.preferences);
  const { myFeedSources } = useAppSelector(state => state.news);
  const [newAuthor, setNewAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor.trim() && !preferredAuthors.includes(newAuthor.trim())) {
      const authorName = newAuthor.trim();
      dispatch(addPreferredAuthor(authorName));
      setNewAuthor('');
      
      // Fetch articles by this author
      await searchAuthorArticles(authorName);
    }
  };

  const handleRemoveAuthor = (author: string) => {
    dispatch(removePreferredAuthor(author));
  };
  
  const searchAuthorArticles = async (author: string) => {
    setIsLoading(true);
    try {
      // Fetch articles by author
      const result = await fetchArticlesByAuthor(author, myFeedSources);
      
      // Update Redux store with the articles
      dispatch({
        type: 'news/fetchNews/fulfilled',
        payload: result
      });
    } catch (error) {
      console.error('Error fetching articles by author:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAuthorClick = (author: string) => {
    searchAuthorArticles(author);
  };

  return (
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
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>
      
      {preferredAuthors.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {preferredAuthors.map(author => (
            <div 
              key={author} 
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center cursor-pointer hover:bg-blue-200"
              onClick={() => handleAuthorClick(author)}
            >
              <span>{author}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent click
                  handleRemoveAuthor(author);
                }}
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
  );
};

export default AuthorsSection;