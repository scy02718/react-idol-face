import * as React from 'react';
//import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
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
  const [seed, setSeed] = useState('3952177198');
  const [image, setImage] = useState('seed3952177198.png');
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
          <ImageList sx={{ width: 256, height: 256, borderRadius: 5, marginTop: -2}} cols={1}>
            <img src={image} alt="IDOL_FACE"/>
          </ImageList>
        </Box>
          <Generate onChangeMode={async ()=>{
            setSeed(Math.floor(Math.random() * (2**32-1)));
            console.log(seed);
            await fetch('http://127.0.0.1:5000/image?seed=' + seed);
            setImage('seed3952177198.png');
            
          }}></Generate>
    </Container>
  );
}
