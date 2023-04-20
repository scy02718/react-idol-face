import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import favorites from './favorite.json'

function Home(){
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
      mx : 5,
      mt : 1.5  
    }} href='/'>Home</Button> 
}

function FavoriteImages(){
    return <ImageList sx={{ width: 512, height: 512, borderRadius: 5 }} cols={3} rowHeight={164}>
        {favorites.map((item) => (
            <ImageListItem key={item.seed}>
                <img src={'seed'+item.seed+'.png'} alt="IDOL_FACE"/>
                </ImageListItem>
            ))}
    </ImageList>
}

export default function Favorites() {
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
            ><Box sx={{
                fontSize: 25,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                mt:0.3
              }}>FAVORITE IMAGES</Box>
                <FavoriteImages></FavoriteImages>
            </Box>
            <Home></Home>
    </Container>
  );
}