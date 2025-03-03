// API keys and endpoints
export const API_CONFIG = {
    // You will need to sign up for API keys for the news services
    NEWS_API_KEY: "0e8c006a8b414ba2bd9063aa8560f43f", // Replace with your actual API key
    GUARDIAN_API_KEY: "24f8a59c-5749-4c46-8ff3-769d98d0906e",
    NYT_API_KEY: "pqbsnKuUKRNOq3KyaxFrZz0AaqS95mmh",
    
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