import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">NewsAggregator</h3>
            <p className="text-gray-400 mt-1">Stay informed with news from multiple sources</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} NewsAggregator. All rights reserved.
            </p>
            <p className="text-gray-400 mt-1">
              Powered by NewsAPI, The Guardian, and New York Times
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;