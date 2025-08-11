import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function Update({ prod, setProd, setDrawerOpen, productToEdit }) {
  const [item, setItem] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });


  useEffect(() => {
    if (productToEdit) {
      setItem(productToEdit);
    }
  }, [productToEdit]);

  const handleEditButton = () => {
    axios.put(`https://fakestoreapi.com/products/${item.id}`, item)
      .then((res) => {
       console.log(res.data, 'response from API');

        
        const updatedList = prod.map(p =>
          p.id === res.data.id ? res.data : p
        );
        setProd(updatedList);
        setDrawerOpen(false);
          toast.success("Updated successfully")

      })
      .catch(err => console.error("Update failed", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
setItem(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr' },
        gap: 2,
        maxWidth: '700px',
        margin: '0px auto',
        padding: '20px',
        border: '1px solid rgb(204, 204, 204)',
        borderRadius: '10px',
        backgroundColor: 'rgb(249, 249, 249)',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 5px',
      }}
    >
      <h1>Edit Product</h1>

      <FormControl variant="standard">
        <InputLabel shrink>Title</InputLabel>
        <BootstrapInput value={item.title} name="title" onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink>Price</InputLabel>
        <BootstrapInput type="number" value={item.price} name="price" onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink>Category</InputLabel>
        <BootstrapInput value={item.category} name="category" onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink>Image Url</InputLabel>
        <BootstrapInput value={item.image} name="image" onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink>Description</InputLabel>
        <BootstrapInput
          multiline
          rows={4}
          value={item.description}
          name="description"
          onChange={handleChange}
          sx={{ '& .MuiInputBase-input': { width: '21ch' } }}
        />
      </FormControl>

      <Button variant="contained" sx={{ fontWeight: 'bold' }} onClick={handleEditButton}>
        Update Product
      </Button>
    </Box>
  );
}
