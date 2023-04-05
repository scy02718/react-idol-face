import * as React from 'react';
//import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
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
    textAlign: 'center',
    mx : 1,
    mb : 1.5  
  }} onClick={(event)=>{ 
    const tempSeed = Math.floor(Math.random() * (2**32-1));
    event.preventDefault(); 
    props.onChangeMode(tempSeed); 
  }}>Generate Image</Button>
}

export default function BasicGrid() {
  const [seed, setSeed] = useState(window.localStorage.getItem('seed'));
  const [noise, setNoise] = useState(true);
  const [psi, setPsi] = useState(0.3);

  const handleSliderChange = (event, newPsi) => {
    setPsi(newPsi);
  };

  const handleChange = (event) => {
    setNoise(event.target.checked);
  };

  useEffect(() => {
    setSeed(JSON.parse(window.localStorage.getItem('seed')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('seed', seed);
  }, [seed]);

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
            <img src={'seed'+seed+'.png'} alt="IDOL_FACE"/>
          </ImageList>
        </Box>
          <Generate onChangeMode={async (tempSeed)=>{
            setSeed(tempSeed)
            await fetch('http://127.0.0.1:7000/image?seed=' + tempSeed + '&noise=' + noise + '&psi='+psi); 
          }}></Generate>
          <FormControlLabel control={
            <Switch checked={noise} onChange={handleChange} colour='default'/>
              } label={<Typography sx={{
                fontSize: 12,
                fontFamily: 'Arial',
                fontWeight: 'bold'
              }}>Noise</Typography>} sx={{mx : 1, mb:1.5}}/>
          <Typography id="psi-slider" sx={{
            fontSize: 12,
            fontFamily: 'Arial',
            fontWeight: 'bold'
          }}>
            Truncation Psi
          </Typography>
          <Slider defaultValue={0.3} aria-label="PsiSlider" max={1.0} min={0.0} name="psi" step={0.01}
          valueLabelDisplay="auto" sx={{ width : 0.65}} onChangeCommitted={handleSliderChange}/>
    </Container>
  );
}
