import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setFilters } from '../../store/slices/newsSlice';
import { useIsMobile } from '../../hooks/useMediaQuery';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const handleSearch = (query: string) => {
    dispatch(setFilters({ keywords: query }));
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              NewsAggregator
            </Link>
            
            {isMobile && (
              <button
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
          
          <div className={`mt-4 md:mt-0 md:flex items-center space-y-4 md:space-y-0 md:space-x-6 ${isMobile ? (isMenuOpen ? 'block' : 'hidden') : 'flex'}`}>
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <Link
                to="/"
                className={`font-medium hover:text-blue-600 ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/preferences"
                className={`font-medium hover:text-blue-600 ${
                  location.pathname === '/preferences' ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                My Feed
              </Link>
            </nav>
            
            <div className="w-full md:w-64">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;