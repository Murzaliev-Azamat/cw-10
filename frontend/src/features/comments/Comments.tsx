import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchAllLoading } from '../news/newsSlice';
import { fetchComments } from './commentsThunks';
import { selectComments } from './commentsSlice';
import CardForComment from '../../components/UI/CardForComment/CardForComment';

const Comments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <CardForComment key={comment.id} author={comment.author} message={comment.message} id={comment.id}/>
        ))}
    </div>
  );
};

export default Comments;