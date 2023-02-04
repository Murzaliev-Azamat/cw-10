import React from 'react';
import './App.css';
import FormForNews from './features/news/FormForNews';
import { Container, styled } from '@mui/material';
import News from './features/news/News';
import { NavLink, Route, Routes } from 'react-router-dom';
import FullOneNews from './components/UI/FullOneNews/FullOneNews';

const MyContainer = styled(Container)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: '2px',
  paddingTop: 2,
  paddingBottom: 2,
  marginTop: 2,
});

function App() {
  return (
    <div className="App">
      <MyContainer maxWidth="sm" sx={{mt: 2}} >
        <h2>Contacts</h2>
        <NavLink to={"/add-one-news"} className="btn btn-primary">
          Add one news
        </NavLink>
      </MyContainer>
        <Container maxWidth="sm" sx={{mt: 2}}>
      <Routes>
        <Route path="/" element={(
          <News/>
        )}/>
        <Route path="/add-one-news" element={(
          <FormForNews/>
        )}/>
        <Route path="/news/:id" element={(
          <FullOneNews/>
        )}/>
      </Routes>
        </Container>
    </div>
    // <div className="App">
    //   <Container maxWidth="sm" sx={{mt: 2}} >
    //
    //
    //   </Container>
    // </div>
  );
}

export default App;


