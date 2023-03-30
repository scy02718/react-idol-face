import * as React from 'react';
//import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/system';

function Seed(props){
  return <Box sx={{
    fontSize: 25,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    mb:3
  }}>SEED: {props.seed}</Box>
}

function Generate(props){
  return <Button variant="contained" sx={{
    '&:hover':{
      color:'black',
      backgroundColor: 'gray',
    },
    bgcolor: 'white',
    borderRadius: 3,
    color: 'black',
    fontSize: 10,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    lineHeight: 2,
    padding: 1.2,
    textAlign: 'center'
  }} onClick={(event)=>{ event.preventDefault(); props.onChangeMode();}}>GENERATE</Button>
}

export default function BasicGrid() {
  const [seed, setSeed] = useState(null);

  return (
    <Container component="main" maxWidth="xs" sx={{
      textAlign:'center'
    }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Seed seed={seed}></Seed>
          <ImageList sx={{ width: 256, height: 256, borderRadius: 3, marginTop: -2}} cols={1}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        </Box>
          <Generate onChangeMode={()=>{
            setSeed(Math.floor(Math.random() * (2**32-1)))
          }}></Generate>
    </Container>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  }
];