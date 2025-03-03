import baseAxios from './axios';
import { API_CONFIG } from '../../config/api.config';
import { Article, NewsApiResponse, NewsFilters } from '../../types/article.types';

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
    
    // Add at least one required parameter
    if (keywords) {
      params.q = keywords;
    } else if (source) {
      params.sources = source;
    } else {
      // If no keyword or source is provided, use a default query
      params.q = 'news';  // Default to searching for "news"
    }
    
    if (category) params.category = category;
    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;
    
    // Use top-headlines endpoint for category-based searches
    const endpoint = category 
      ? `${API_CONFIG.NEWS_API_URL}/top-headlines` 
      : `${API_CONFIG.NEWS_API_URL}/everything`;
    
    // If using top-headlines with a category, we need to specify a country
    if (category && endpoint.includes('top-headlines')) {
      params.country = 'us'; // Default to US
      delete params.q; // q parameter isn't needed for top-headlines with category
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