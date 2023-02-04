import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { addOneNews, fetchAllNews } from './newsThunks';
import FileInput from '../../components/UI/FileInput/FileInput';
import { OneNewsApi } from '../../../types';
import { useNavigate } from 'react-router-dom';

const FormForNews = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [state, setState] = useState<OneNewsApi>({
    title: '',
    info: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addOneNews({
      title: state.title,
      info: state.info,
      image: state.image,
    }));
    setState({title: '', info: '', image: null});
    await dispatch(fetchAllNews());
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files && files[0]) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    } else {
      setState(prevState => ({
        ...prevState, [name]: null,
      }))
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid item container justifyContent="space-between" alignItems="center" xs sx={{mb: 1}}>
        <TextField
          sx={{width: '100%'}}
          id="title" label="Title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
        />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{mb: 1}}>
        <Grid item xs>
          <TextField
            sx={{width: 1}}
            multiline rows={3}
            id="info" label="Info"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            name="image"
            label="Image"
          />
        </Grid>
      </Grid>

      <Button type="submit" color="primary" variant="contained">
        Add news
      </Button>
    </form>
  );

};

export default FormForNews;