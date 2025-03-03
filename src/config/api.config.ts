// API keys and endpoints
// API keys and endpoints
export const API_CONFIG = {
  // Get API keys from environment variables
  NEWS_API_KEY: import.meta.env.VITE_NEWS_API_KEY || "",
  GUARDIAN_API_KEY: import.meta.env.VITE_GUARDIAN_API_KEY || "",
  NYT_API_KEY: import.meta.env.VITE_NYT_API_KEY || "",
  
  // Base URLs for the APIs
  NEWS_API_URL: "https://newsapi.org/v2",
  GUARDIAN_API_URL: "https://content.guardianapis.com",
  NYT_API_URL: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
};
  
  // News categories
  export const NEWS_CATEGORIES = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  
  // Default news sources
  export const DEFAULT_NEWS_SOURCES = [
    "the-guardian-uk",
    "bbc-news",
    "the-new-york-times",
  ];