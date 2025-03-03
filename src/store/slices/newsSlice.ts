import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Article, NewsFilters } from "../../types/article.types";
import { fetchAllNewsArticles } from "../../services/api/news.service";

// Define initial state
interface NewsState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  filters: NewsFilters;
  activeSources: string[];
}

const initialState: NewsState = {
  articles: [],
  isLoading: false,
  error: null,
  totalResults: 0,
  filters: {
    keywords: "",
    category: "",
    source: "",
    fromDate: "",
    toDate: "",
    page: 1,
    pageSize: 20,
  },
  activeSources: [],
};

// Async thunk for fetching news
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (
    { filters, sources }: { filters: NewsFilters; sources: string[] },
    { rejectWithValue }
  ) => {
    try {
      const result = await fetchAllNewsArticles(filters, sources);
      return result;
    } catch (error) {
      return rejectWithValue("Failed to fetch news articles");
    }
  }
);

// Create slice
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<NewsFilters>>) => {
      state.filters = { ...state.filters, ...action.payload, page: 1 }; // Reset to page 1 on filter changes
    },
    setActiveSources: (state, action: PayloadAction<string[]>) => {
      state.activeSources = action.payload;
    },
    nextPage: (state) => {
      state.filters.page += 1;
    },
    prevPage: (state) => {
      if (state.filters.page > 1) {
        state.filters.page -= 1;
      }
    },
    clearArticles: (state) => {
      state.articles = [];
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  setActiveSources,
  nextPage,
  prevPage,
  clearArticles,
} = newsSlice.actions;
export default newsSlice.reducer;
