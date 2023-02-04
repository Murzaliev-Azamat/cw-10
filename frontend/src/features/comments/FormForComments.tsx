import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { CommentApi } from '../../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment, fetchComments } from './commentsThunks';


const FormForComments = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [state, setState] = useState<CommentApi>({
    author: '',
    message: '',
    news_id: 0,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addComment({
      author: state.author,
      message: state.message,
      news_id: Number(id),
    }));
    setState({author: '', message: '', news_id: Number(id)});
    await dispatch(fetchComments());
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };


  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid item container justifyContent="space-between" alignItems="center" xs sx={{mb: 1}}>
        <TextField
          sx={{width: '100%'}}
          id="author" label="Author"
          value={state.author}
          onChange={inputChangeHandler}
          name="author"
        />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{mb: 1}}>
        <Grid item xs>
          <TextField
            sx={{width: 1}}
            multiline rows={3}
            id="message" label="Message"
            value={state.message}
            onChange={inputChangeHandler}
            name="message"
            required
          />
        </Grid>

      </Grid>

      <Button type="submit" color="primary" variant="contained">
        Add comment
      </Button>
    </form>
  );

};

export default FormForComments;