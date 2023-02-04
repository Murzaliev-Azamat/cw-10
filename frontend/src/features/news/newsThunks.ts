import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import { OneNews, OneNewsApi} from '../../../types';

export const fetchAllNews = createAsyncThunk<OneNews[]>(
  'news/fetchAll',
  async () => {
    const newsResponse = await axiosApi.get<OneNews[]>('/news');
    return newsResponse.data;
  }
);

export const fetchOneNews = createAsyncThunk<OneNews, string>(
  'news/fetchOne',
  async (id) => {
    const oneNewsResponse = await axiosApi.get<OneNews | null>('news/' + id);
    const oneNews = oneNewsResponse.data;

    if (oneNews === null) {
      throw new Error('Not found!')
    }

    return oneNews;
  },
);

export const addOneNews = createAsyncThunk<void, OneNewsApi>(
  'news/add',
  async (oneNews) => {
    const formData = new FormData();

    const keys = Object.keys(oneNews) as (keyof OneNewsApi)[];
    keys.forEach(key => {
      const value = oneNews[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post<OneNewsApi>('/news', formData);
  }
);

export const deleteOneNews = createAsyncThunk<void, string>(
  'news/deleteOne',
  async (id) => {
    await axiosApi.delete('/news/' + id);
  }
);