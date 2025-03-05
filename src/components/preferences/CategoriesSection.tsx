// components/preferences/CategoriesSection.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setPreferredCategories } from '../../store/slices/preferencesSlice';
import { NEWS_CATEGORIES } from '../../config/api.config';

const CategoriesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { preferredCategories } = useAppSelector(state => state.preferences);

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

  return (
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
  );
};

export default CategoriesSection;