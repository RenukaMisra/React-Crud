// import react from 'react';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
// import CircularProgress from '@mui/material/CircularProgress';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';





// export default function MediaControlCard() {
//   const theme = useTheme();
//   const [product, setProduct] = useState([null])
//    const { id } = useParams()

//   useEffect(() => {
//     axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
//       setProduct(res.data);
//     })
//       .then((response) => {
//         setProduct(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching product:", error);
//       });
//   }, []);

//   console.log(product, 'single product')

//   if ( !product ) {
//     return(
//       <div style={{alignContent:'center', height:'100vh', display: 'flex', justifyContent: 'center'}}>
//         <CircularProgress />
//       </div>
//     )
//   }

//   return (
   
// <Box sx={{ 
//       backgroundColor: '#f3f3f3', 
//       maxWidth:'1296px' ,
//       minHeight:'600px',
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center', 
//       padding: '40px',marginLeft:'130px',marginTop:'80px'
//     }}>
//     <Card sx={{ display: 'flex', alignItems: "center", padding: 2 ,borderRadius:'12px',gap:'30px'}}>
//       <CardMedia
//         component="img"
//         sx={{ width:151 }}
//         image={product.image}
//         alt="image"
//       />
//       <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '500px',maxWidth:'300px'}}>
//         <CardContent sx={{ flex: '1 0 auto' }}>
//           <Typography component="div" variant="h5">
//             {product.title}
//           </Typography>
//           <Typography
//             variant="subtitle1" component="div" sx={{ color: 'rgb(0, 128, 0);',fontSize:'25px' ,fontWeight:'bold' }}
//           >
//             {product.price}
//           </Typography>
//             <Typography
//             variant="subtitle1" component="div" sx={{ color: '#C71585' }}
//           > category:
//             {product.category}
//           </Typography>
//             <Typography
//             variant="subtitle1" component="div" sx={{ fontSize:'16px',color:'rgba(51,51,51)',minWidth:'606.66px'}}
//           >
//             {product.description}
//           </Typography>
//             <Link to={'/'}>
//           <Button variant="outlined" sx={{color:'#9c27b0',borderColor:'#9c27b0',marginTop:'25px'}}>Go Back</Button>
//           </Link>
//         </CardContent>
//       </Box>
//     </Card>
//     </Box>


//   )
// }



import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box, Card, CardContent, CardMedia,
  Typography, CircularProgress, Button
} from '@mui/material';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function MediaControlCard() {
  const theme = useTheme();
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />

      <Box sx={{
        backgroundColor: '#f3f3f3',
        maxWidth: '1296px',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        margin: 'auto',
        marginTop: '80px'
      }}>
        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: '12px', gap: '30px' }}>
          <CardMedia
            component="img"
            sx={{ width: 180, objectFit: 'contain' }}
            image={product.image}
            alt={product.title}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" fontWeight={600} mb={1}>
                {product.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: 'green', fontSize: '25px', fontWeight: 'bold', mb: 1 }}
              >
                ${product.price}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ color: '#C71585', mb: 1 }}
              >
                Category: {product.category}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: '16px',
                  color: 'rgba(51,51,51)',
                  mb: 2,
                  lineHeight: 1.5
                }}
              >
                {product.description}
              </Typography>

              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#9c27b0',
                    borderColor: '#9c27b0',
                    marginTop: '25px'
                  }}
                >
                  Go Back
                </Button>
              </Link>
            </CardContent>
          </Box>
        </Card>
      </Box>

      <Footer />
    </>
  );
}
