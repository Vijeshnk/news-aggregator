import React, { useState, useEffect } from 'react';
import { NEWS_CATEGORIES } from '../../config/api.config';

interface FilterBarProps {
  onCategoryChange: (category: string) => void;
  onSourceChange: (source: string) => void;
  onDateChange: (fromDate: string, toDate: string) => void;
  selectedCategory: string;
  selectedSource: string;
  fromDate: string;
  toDate: string;
  sources: Array<{ id: string; name: string }>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onCategoryChange,
  onSourceChange,
  onDateChange,
  selectedCategory,
  selectedSource,
  fromDate,
  toDate,
  sources,
}) => {
  // Local state for date inputs before applying filter
  const [localFromDate, setLocalFromDate] = useState(fromDate);
  const [localToDate, setLocalToDate] = useState(toDate);
  
  // Update local state when props change
  useEffect(() => {
    setLocalFromDate(fromDate);
    setLocalToDate(toDate);
  }, [fromDate, toDate]);

  // Get today's date in YYYY-MM-DD format for max date attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Apply date filter handler
  const handleApplyDateFilter = () => {
    onDateChange(localFromDate, localToDate);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded-lg mb-6">
      {/* Category filter */}
      <div className="flex-1">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {NEWS_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Source filter */}
      <div className="flex-1">
        <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
          Source
        </label>
        <select
          id="source"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedSource}
          onChange={(e) => onSourceChange(e.target.value)}
        >
          <option value="">All Sources</option>
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date filter group */}
      <div className="flex-2 flex flex-col sm:flex-row gap-2">
        {/* From Date */}
        <div className="flex-1">
          <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={localFromDate}
            onChange={(e) => setLocalFromDate(e.target.value)}
            max={localToDate || today}
          />
        </div>

        {/* To Date */}
        <div className="flex-1">
          <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            id="toDate"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={localToDate}
            onChange={(e) => setLocalToDate(e.target.value)}
            min={localFromDate || ''}
            max={today}
          />
        </div>

        {/* Apply button */}
        <div className="flex items-end pb-[2px]">
          <button
            type="button"
            onClick={handleApplyDateFilter}
            className="h-10 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;