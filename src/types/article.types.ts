export interface Article {
    id: string;
    title: string;
    description: string;
    content?: string;
    url: string;
    imageUrl?: string;
    source: {
      id: string;
      name: string;
    };
    author?: string;
    publishedAt: string;
    category?: string;
  }
  
  export interface NewsApiResponse {
    articles: Article[];
    totalResults: number;
    status: string;
  }
  
  export interface NewsFilters {
    keywords?: string;
    category?: string;
    source?: string;
    fromDate?: string;
    toDate?: string;
    author?: string;
    page: number;
    pageSize: number;
  }
  
  export interface UserPreferences {
    preferredSources: string[];
    preferredCategories: string[];
    preferredAuthors: string[];
  }