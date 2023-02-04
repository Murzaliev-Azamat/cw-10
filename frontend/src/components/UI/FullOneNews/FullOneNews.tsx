import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOneNews } from '../../../features/news/newsSlice';
import { fetchOneNews } from '../../../features/news/newsThunks';
import { useParams } from 'react-router-dom';
import Comments from '../../../features/comments/Comments';
import FormForComments from '../../../features/comments/FormForComments';


const FullOneNews = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const oneNews = useAppSelector(selectOneNews);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNews(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <Typography variant="h3" color="text.secondary">
        {oneNews?.title}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        20.03.2202
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {oneNews?.info}
      </Typography>
      <Comments/>
      <FormForComments/>
    </div>
  );
};

export default FullOneNews;