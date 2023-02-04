import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { deleteComment, fetchComments } from '../../../features/comments/commentsThunks';
import { useAppDispatch } from '../../../app/hooks';

interface Props {
  id: number;
  author: string;
  message: string;
}

const CardForComment: React.FC<Props> = ({author,message,id}) => {
  const dispatch = useAppDispatch();

  const removeDish = async (id: string) => {
    await dispatch(deleteComment(id));
    await dispatch(fetchComments());
  }

  return (
    <Box sx={{border: 1, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <Box>
        <Typography variant="body1" color="text.secondary">
          {author + " wrote: "}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Box>
      <Button onClick={() => removeDish(id.toString())} variant="contained">Delete</Button>
    </Box>
  );
};

export default CardForComment;