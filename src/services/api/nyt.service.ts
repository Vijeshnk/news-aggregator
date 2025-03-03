import baseAxios from "./axios";
import { API_CONFIG } from "../../config/api.config";
import { Article, NewsFilters } from "../../types/article.types";

// Adapter to standardize API responses
const formatNYTArticle = (article: any): Article => ({
  id: article._id || article.uri,
  title: article.headline.main || "No title",
  description: article.abstract || "",
  content: article.lead_paragraph || "",
  url: article.web_url,
  imageUrl:
    article.multimedia?.length > 0
      ? `https://www.nytimes.com/${article.multimedia[0].url}`
      : "",
  source: {
    id: "new-york-times",
    name: "The New York Times",
  },
  author: article.byline?.original?.replace("By ", "") || "NYT",
  publishedAt: article.pub_date,
  category: article.section_name || "general",
});

export const fetchNYTArticles = async (
  filters: NewsFilters
): Promise<{
  articles: Article[];
  totalResults: number;
}> => {
  try {
    const { keywords, category, fromDate, toDate, page } = filters;

    const params: Record<string, string> = {
      "api-key": API_CONFIG.NYT_API_KEY,
      page: String(page),
    };

    if (keywords) params.q = keywords;
    if (category) params.fq = `section_name:${category}`;
    if (fromDate) params.begin_date = fromDate.replace(/-/g, "");
    if (toDate) params.end_date = toDate.replace(/-/g, "");

    const response = await baseAxios.get(API_CONFIG.NYT_API_URL, { params });

    return {
      articles: response.data.response.docs.map(formatNYTArticle),
      totalResults: response.data.response.meta.hits,
    };
  } catch (error) {
    console.error("Error fetching from NYT API:", error);
    return { articles: [], totalResults: 0 };
  }
};
