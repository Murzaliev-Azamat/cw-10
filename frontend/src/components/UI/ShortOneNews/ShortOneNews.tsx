import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';
import { NavLink } from 'react-router-dom';
import { deleteOneNews, fetchAllNews } from '../../../features/news/newsThunks';
import { useAppDispatch } from '../../../app/hooks';

interface Props {
  id: number;
  title: string;
  info: string;
  image: string | null;
}

const ShortOneNews: React.FC<Props> = ({title,info,image,id}) => {
  const dispatch = useAppDispatch();

  const removeDish = async (id: string) => {
    await dispatch(deleteOneNews(id));
    await dispatch(fetchAllNews());
  }

  let cardImage = undefined;
  let infoImage = null;

  if (image) {
    cardImage = apiUrl + '/' + image;
    infoImage = (<CardMedia
      sx={{ height: 140 }}
      image={cardImage}
      title="picture"
    />)
  }


  return (
    <Card sx={{ maxWidth: 345, border: 1, mt: 2 }}>
      {infoImage}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title ? title : 'Anonymous'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          20.05.2017
        </Typography>
      </CardContent>
      <NavLink to={"/news/" + id}>Read full post</NavLink>
      <Button onClick={() => removeDish(id.toString())} variant="contained">Delete</Button>
    </Card>
  );
};

export default ShortOneNews;