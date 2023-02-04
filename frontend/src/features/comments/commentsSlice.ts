import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addComment, fetchComment, fetchComments } from './commentsThunks';
import { Comment } from '../../../types';


interface CommentsState {
  comments: Comment[] | [];
  comment: Comment | null;
  fetchAllLoading: boolean;
  addLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  comment: null,
  fetchAllLoading: false,
  addLoading: false,
}

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchComment.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.comment = action.payload;
    });
    builder.addCase(fetchComment.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(addComment.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state) => {
      state.addLoading = false;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.addLoading = false;
    });
  }});

export const commentsReducer = CommentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectComment = (state: RootState) => state.comments.comment;

export const selectFetchAllLoading = (state: RootState) => state.comments.fetchAllLoading;