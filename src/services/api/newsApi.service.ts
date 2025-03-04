import baseAxios from './axios';
import { API_CONFIG } from '../../config/api.config';
import { Article, NewsApiResponse, NewsFilters } from '../../types/article.types';

// Define valid NewsAPI sources
const VALID_NEWS_API_SOURCES = [
  'abc-news',
  'bbc-news',
  'cnn',
  'fox-news',
  'google-news',
  'reuters',
  'the-washington-post',
  'the-wall-street-journal'
];

// Adapter to standardize API responses
const formatNewsApiArticle = (article: any): Article => ({
  id: article.url,
  title: article.title || 'No title',
  description: article.description || '',
  content: article.content || '',
  url: article.url,
  imageUrl: article.urlToImage,
  source: {
    id: article.source.id || '',
    name: article.source.name || 'Unknown',
  },
  author: article.author || 'Unknown',
  publishedAt: article.publishedAt,
  category: article.category || 'general',
});

export const fetchNewsApiArticles = async (filters: NewsFilters): Promise<{
  articles: Article[];
  totalResults: number;
}> => {
  try {
    const { keywords, category, source, fromDate, toDate, page, pageSize } = filters;
    
    // Always use everything endpoint when date filters are applied
    const useEverythingEndpoint = fromDate || toDate;
    
    const params: Record<string, string> = {
      apiKey: API_CONFIG.NEWS_API_KEY,
      page: String(page),
      pageSize: String(pageSize),
    };
    
    // Determine which endpoint to use
    let endpoint;
    
    if (useEverythingEndpoint) {
      // Using /everything endpoint
      endpoint = `${API_CONFIG.NEWS_API_URL}/everything`;
      
      // Handle the required parameters for /everything
      if (keywords) {
        params.q = keywords;
      } else if (source && VALID_NEWS_API_SOURCES.includes(source)) {
        params.sources = source;
      } else {
        // Default search term if nothing else is provided
        params.q = category || 'news';
      }
      
      // Format dates for NewsAPI (ISO 8601) - only for /everything endpoint
      if (fromDate) params.from = fromDate + 'T00:00:00Z';
      if (toDate) params.to = toDate + 'T23:59:59Z';
      
    } else {
      // Using /top-headlines endpoint (no date filters)
      endpoint = `${API_CONFIG.NEWS_API_URL}/top-headlines`;
      
      // For top-headlines, we need either a category, a source, a q parameter, or a country
      if (category) {
        params.category = category;
      }
      
      if (source && VALID_NEWS_API_SOURCES.includes(source)) {
        params.sources = source;
      } else if (!params.sources && !category) {
        // country parameter can't be used with sources parameter
        params.country = 'us'; // Default to US
      }
      
      // Add q parameter if provided
      if (keywords) {
        params.q = keywords;
      }
    }
    
    const response = await baseAxios.get<NewsApiResponse>(
      endpoint,
      { params }
    );
    
    return {
      articles: response.data.articles.map(formatNewsApiArticle),
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return { articles: [], totalResults: 0 };
  }
};