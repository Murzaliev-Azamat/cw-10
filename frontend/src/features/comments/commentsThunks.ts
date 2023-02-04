import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import { Comment, CommentApi } from '../../../types';

export const fetchComments = createAsyncThunk<Comment[]>(
  'comments/fetchAll',
  async () => {
    const commentsResponse = await axiosApi.get<Comment[]>('/comments');
    return commentsResponse.data;
  }
);

export const fetchComment = createAsyncThunk<Comment, string>(
  'comments/fetchOne',
  async (id) => {
    const commentResponse = await axiosApi.get<Comment | null>('comments/' + id);
    const comment = commentResponse.data;

    if (comment === null) {
      throw new Error('Not found!')
    }

    return comment;
  },
);

// export const addOrder = createAsyncThunk<void, OrderApi>(
//   'home/addOrder',
//   async (order) => {
//     await axiosApi.post<OrderApi>('/orders.json', order);
//   }
// );

export const addComment = createAsyncThunk<void, CommentApi>(
  'comments/add',
  async (comment) => {
    // const formData = new FormData();
    //
    // const keys = Object.keys(comment) as (keyof CommentApi)[];
    // keys.forEach(key => {
    //   const value = comment[key];
    //
    //   if (value !== null) {
    //     formData.append(key, value);
    //   }
    // });

    await axiosApi.post<CommentApi>('/comments', comment);
  }
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/deleteOne',
  async (id) => {
    await axiosApi.delete('/comments/' + id);
  }
);