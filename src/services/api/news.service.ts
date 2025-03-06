import { Article, NewsFilters } from '../../types/article.types';
import { fetchNewsApiArticles } from './newsApi.service';
import { fetchGuardianArticles,fetchGuardianArticlesByAuthor } from './guardian.service';
import { fetchNYTArticles,fetchNYTArticlesByAuthor } from './nyt.service';

export const fetchAllNewsArticles = async (
  filters: NewsFilters,
  sources: string[] = []
): Promise<{
  articles: Article[];
  totalResults: number;
}> => {
  try {
    const apiCalls = [];
    
    // Add API calls based on selected sources
    if (sources.length === 0 || sources.includes('news-api')) {
      apiCalls.push(fetchNewsApiArticles(filters));
    }
    
    if (sources.length === 0 || sources.includes('the-guardian')) {
      apiCalls.push(fetchGuardianArticles(filters));
    }
    
    if (sources.length === 0 || sources.includes('new-york-times')) {
      apiCalls.push(fetchNYTArticles(filters));
    }
    
    // If no sources selected, default to all
    if (apiCalls.length === 0) {
      apiCalls.push(fetchNewsApiArticles(filters));
      apiCalls.push(fetchGuardianArticles(filters));
      apiCalls.push(fetchNYTArticles(filters));
    }
    
    // Fetch from all selected sources in parallel
    const results = await Promise.all(apiCalls);
    
    // Combine all articles and sort by date (newest first)
    const allArticles = results
      .flatMap(result => result.articles)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    const totalResults = results.reduce((sum, result) => sum + result.totalResults, 0);
    
    return {
      articles: allArticles,
      totalResults
    };
  } catch (error) {
    console.error('Error fetching from news sources:', error);
    return {
      articles: [],
      totalResults: 0
    };
  }
};


export const fetchArticlesByAuthor = async (
  author: string,
  sources: string[] = []
): Promise<{
  articles: Article[];
  totalResults: number;
}> => {
  try {
    const apiCalls = [];
    
    // Add API calls based on selected sources
    if (sources.length === 0 || sources.includes('the-guardian')) {
      apiCalls.push(fetchGuardianArticlesByAuthor(author));
    }
    
    if (sources.length === 0 || sources.includes('new-york-times')) {
      apiCalls.push(fetchNYTArticlesByAuthor(author));
    }
    
    // NewsAPI doesn't support author filtering directly, so we skip it
    
    if (apiCalls.length === 0) {
      return { articles: [], totalResults: 0 };
    }
    
    // Fetch from all selected sources in parallel
    const results = await Promise.all(apiCalls);
    
    // Combine all articles and sort by date (newest first)
    const allArticles = results
      .flatMap(result => result.articles)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    const totalResults = results.reduce((sum, result) => sum + result.totalResults, 0);
    
    return {
      articles: allArticles,
      totalResults
    };
  } catch (error) {
    console.error('Error fetching articles by author:', error);
    return {
      articles: [],
      totalResults: 0
    };
  }
};
