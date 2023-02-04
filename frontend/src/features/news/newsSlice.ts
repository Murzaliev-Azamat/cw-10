import { createSlice } from '@reduxjs/toolkit';
import { OneNews } from '../../../types';
import { RootState } from '../../app/store';
import { addOneNews, fetchAllNews, fetchOneNews } from './newsThunks';


interface NewsState {
  news: OneNews[] | [];
  oneNews: OneNews | null;
  fetchAllLoading: boolean;
  addLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  oneNews: null,
  fetchAllLoading: false,
  addLoading: false,
}

export const NewsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllNews.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchAllNews.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.news = action.payload;
    });
    builder.addCase(fetchAllNews.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchOneNews.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchOneNews.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.oneNews = action.payload;
    });
    builder.addCase(fetchOneNews.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(addOneNews.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(addOneNews.fulfilled, (state) => {
      state.addLoading = false;
    });
    builder.addCase(addOneNews.rejected, (state) => {
      state.addLoading = false;
    });
  }});

export const newsReducer = NewsSlice.reducer;
export const selectNews = (state: RootState) => state.news.news;
export const selectOneNews = (state: RootState) => state.news.oneNews;

export const selectFetchAllLoading = (state: RootState) => state.news.fetchAllLoading;