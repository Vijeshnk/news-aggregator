// components/preferences/SourcesContent.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setPreferredSources } from '../../store/slices/preferencesSlice';

const SourcesContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { preferredSources } = useAppSelector(state => state.preferences);
  
  const availableSources = [
    { id: 'news-api', name: 'News API' },
    { id: 'the-guardian', name: 'The Guardian' },
    { id: 'new-york-times', name: 'New York Times' },
  ];

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

  return (
    <>
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
    </>
  );
};

export default SourcesContent;