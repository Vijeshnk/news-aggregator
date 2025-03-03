import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '../../types/article.types';

const initialState: UserPreferences = {
  preferredSources: [],
  preferredCategories: [],
  preferredAuthors: [],
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPreferredSources: (state, action: PayloadAction<string[]>) => {
      state.preferredSources = action.payload;
    },
    setPreferredCategories: (state, action: PayloadAction<string[]>) => {
      state.preferredCategories = action.payload;
    },
    setPreferredAuthors: (state, action: PayloadAction<string[]>) => {
      state.preferredAuthors = action.payload;
    },
    addPreferredSource: (state, action: PayloadAction<string>) => {
      if (!state.preferredSources.includes(action.payload)) {
        state.preferredSources.push(action.payload);
      }
    },
    removePreferredSource: (state, action: PayloadAction<string>) => {
      state.preferredSources = state.preferredSources.filter(source => source !== action.payload);
    },
    addPreferredCategory: (state, action: PayloadAction<string>) => {
      if (!state.preferredCategories.includes(action.payload)) {
        state.preferredCategories.push(action.payload);
      }
    },
    removePreferredCategory: (state, action: PayloadAction<string>) => {
      state.preferredCategories = state.preferredCategories.filter(category => category !== action.payload);
    },
    addPreferredAuthor: (state, action: PayloadAction<string>) => {
      if (!state.preferredAuthors.includes(action.payload)) {
        state.preferredAuthors.push(action.payload);
      }
    },
    removePreferredAuthor: (state, action: PayloadAction<string>) => {
      state.preferredAuthors = state.preferredAuthors.filter(author => author !== action.payload);
    },
    resetPreferences: () => initialState,
  },
});

export const {
  setPreferredSources,
  setPreferredCategories,
  setPreferredAuthors,
  addPreferredSource,
  removePreferredSource,
  addPreferredCategory,
  removePreferredCategory,
  addPreferredAuthor,
  removePreferredAuthor,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;