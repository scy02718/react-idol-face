import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';

function Seed(props){
  var starColor="default";
  if (props.star){
    starColor="warning";
  }

  return <Grid container>
    <Grid item xs={9}>
    <Box sx={{
    fontSize: 25,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    mb:3,
    ml:8,
    mt:0.3
  }}>SEED: {props.seed}</Box>
  </Grid>
  <Grid item xd={3}>
    <IconButton aria-label="star" color= {starColor} sx={{
      ml:-0.5,
      '&:hover':{
        color:'#ed6c02'
      }
    }} onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>
      <StarIcon/>
    </IconButton>
  </Grid>
  </Grid>
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
  const [keepSeed, setKeepSeed] = useState(false);
  const [psi, setPsi] = useState(0.3);
  const [star, setStar] = useState(false);

  // let testData = JSON.parse(JSON.stringify(favorite));
  // console.log(testData);

  const handleSliderChange = (event, newPsi) => {
    setPsi(newPsi);
  };

  const handleNoiseChange = (event) => {
    setNoise(event.target.checked);
  };

  const handleKeepSeedChange = (event) =>{
    setKeepSeed(event.target.checked);
  }

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
          <Seed seed={seed} star={star} onChangeMode={async ()=>{
            setStar(!star);
            if (!star){
              await fetch('http://127.0.0.1:7000/favorite?seed='+seed+'&psi='+psi+'&delete=false');
            }
            else {
              await fetch('http://127.0.0.1:7000/favorite?seed='+seed+'&psi='+psi+'&delete=true');
            }
          }}></Seed>
          <ImageList sx={{ width: 256, height: 256, borderRadius: 5, marginTop: -2}} cols={1}>
            <img src={'seed'+seed+'psi'+psi+'.png'} alt="IDOL_FACE"/>
          </ImageList>
        </Box>
        <Grid container>
          <Grid item xs={6} sx={{ pl:8}}>
          <Generate onChangeMode={async (tempSeed)=>{
            if (!keepSeed){
              setSeed(tempSeed);
              await fetch('http://127.0.0.1:7000/image?seed=' + tempSeed + '&noise=' + noise + '&psi='+psi); 
            }
            else {
              await fetch('http://127.0.0.1:7000/image?seed=' + seed + '&noise=' + noise + '&psi='+psi); 
            }
          }}></Generate>
          </Grid>
          <Grid item xs={6} sx={{ pl:4}}>
          <FormGroup>
          <FormControlLabel control={
            <Switch checked={noise} onChange={handleNoiseChange} colour='default' size='small'/>
              } label={<Typography sx={{
                fontSize: 12,
                fontFamily: 'Arial',
                fontWeight: 'bold'
              }}>Noise</Typography>} sx={{mx : 1, mt:-0.5, ml: -1}}/>
          <FormControlLabel control={
            <Switch checked={keepSeed} onChange={handleKeepSeedChange} colour='default' size='small'/>
              } label={<Typography sx={{
                fontSize: 12,
                fontFamily: 'Arial',
                fontWeight: 'bold'
              }}>Keep Seed</Typography>} sx={{mx : 1, ml:-1}}/>
          </FormGroup>
          </Grid>
          </Grid>
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
