import baseAxios from './axios';
import { API_CONFIG } from '../../config/api.config';
import { Article, NewsApiResponse, NewsFilters } from '../../types/article.types';
import { formatDateForAPI } from '../../utils/dateFormatter';

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
    
    const params: Record<string, string> = {
      apiKey: API_CONFIG.NEWS_API_KEY,
      page: String(page),
      pageSize: String(pageSize),
    };
    
    // For NewsAPI, we need to use valid sources, not our internal identifiers
    // We'll default to a popular news source if the source isn't specified or is our internal 'news-api' identifier
    if (source && source !== 'news-api' && VALID_NEWS_API_SOURCES.includes(source)) {
      params.sources = source;
    } else if (keywords) {
      params.q = keywords;
    } else {
      // Default search term if nothing else is provided
      params.q = 'top news';
    }
    
    // Handle dates
    if (fromDate) params.from = fromDate + 'T00:00:00Z';
    if (toDate) params.to = toDate + 'T23:59:59Z';
    
    // Determine which endpoint to use
    let endpoint = `${API_CONFIG.NEWS_API_URL}/everything`;
    
    // Use top-headlines with category
    if (category) {
      endpoint = `${API_CONFIG.NEWS_API_URL}/top-headlines`;
      params.category = category;
      params.country = 'us'; // Default to US for top-headlines
      
      // q is optional for top-headlines when category and country are specified
      if (!keywords) {
        delete params.q;
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