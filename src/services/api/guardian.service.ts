import baseAxios from "./axios";
import { API_CONFIG } from "../../config/api.config";
import { Article, NewsFilters } from "../../types/article.types";

// Adapter to standardize API responses
const formatGuardianArticle = (article: any): Article => ({
  id: article.id,
  title: article.webTitle || "No title",
  description: article.fields?.trailText || "",
  content: article.fields?.bodyText || "",
  url: article.webUrl,
  imageUrl: article.fields?.thumbnail || "",
  source: {
    id: "the-guardian",
    name: "The Guardian",
  },
  author: article.fields?.byline || "The Guardian",
  publishedAt: article.webPublicationDate,
  category: article.sectionName || "general",
});

export const fetchGuardianArticles = async (
  filters: NewsFilters
): Promise<{
  articles: Article[];
  totalResults: number;
}> => {
  try {
    const { keywords, category, fromDate, toDate, page, pageSize } = filters;

    const params: Record<string, string> = {
      "api-key": API_CONFIG.GUARDIAN_API_KEY,
      page: String(page),
      "page-size": String(pageSize),
      "show-fields": "trailText,thumbnail,bodyText,byline",
    };

    if (keywords) params.q = keywords;
    if (category) params.section = category;
    if (fromDate) params["from-date"] = fromDate;
    if (toDate) params["to-date"] = toDate;

    const response = await baseAxios.get(
      `${API_CONFIG.GUARDIAN_API_URL}/search`,
      { params }
    );

    return {
      articles: response.data.response.results.map(formatGuardianArticle),
      totalResults: response.data.response.total,
    };
  } catch (error) {
    console.error("Error fetching from Guardian API:", error);
    return { articles: [], totalResults: 0 };
  }
};
