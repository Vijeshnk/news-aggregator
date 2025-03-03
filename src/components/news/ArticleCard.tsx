import React from 'react';
import { Article } from '../../types/article.types';
import { formatDate } from '../../utils/dateFormatter';
import { truncateText } from '../../utils/stringUtils';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {

  const formattedDate = formatDate(article.publishedAt);


  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Replace broken image with placeholder
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {article.source.name}
          </span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>

        <h3 className="text-lg font-semibold mb-2">{truncateText(article.title, 60)}</h3>

        {article.description && (
          <p className="text-gray-600 mb-4">{truncateText(article.description, 120)}</p>
        )}

        <div className="flex items-center justify-between">
          {article.author && (
            <span className="text-sm text-gray-500">By {article.author}</span>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;