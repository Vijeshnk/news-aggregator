// components/preferences/AuthorsContent.tsx
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { addPreferredAuthor, removePreferredAuthor } from '../../store/slices/preferencesSlice';

const AuthorsContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { preferredAuthors } = useAppSelector(state => state.preferences);
  const [newAuthor, setNewAuthor] = useState('');

  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor.trim() && !preferredAuthors.includes(newAuthor.trim())) {
      dispatch(addPreferredAuthor(newAuthor.trim()));
      setNewAuthor('');
    }
  };

  const handleRemoveAuthor = (author: string) => {
    dispatch(removePreferredAuthor(author));
  };

  return (
    <>
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
    </>
  );
};

export default AuthorsContent;