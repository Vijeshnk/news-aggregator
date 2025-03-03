import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import newsReducer from './slices/newsSlice';
import preferencesReducer from './slices/preferencesSlice';

// Configure persist for preferences
const preferencesPersistConfig = {
  key: 'preferences',
  storage,
  whitelist: ['preferredSources', 'preferredCategories', 'preferredAuthors'], 
};

const rootReducer = combineReducers({
  news: newsReducer,
  preferences: persistReducer(preferencesPersistConfig, preferencesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in checks
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;