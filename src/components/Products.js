import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';
import RightDrawer from './Drawer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';

const Product = () => {
  const [listItem, setListItem] = useState([]);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((res) => {
      setListItem(res.data);
    });
  }, []);

  const handleAddClick = () => {
    setEditingProduct(null);
    setAddDrawerOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditDrawerOpen(true);
          
  };

  // Pagination logic
  const getItemsPerPage = (page) => {
    if (page === 3) return 4;
    return 8;
  };

  const getPaginatedProducts = () => {
    const itemsPerPage = getItemsPerPage(page);
    const startIndex = page === 3 ? 16 : (page - 1) * 8;
    return listItem.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <h1>All Products</h1>
        <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleAddClick}>
          ADD PRODUCT
        </button>
      </div>

      <Grid>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto',
            marginLeft: '90px',
            marginRight: '90px',
            gap: '20px',
          }}
        >
          <Cards data={getPaginatedProducts()} onEdit={handleEditClick} setProd={setListItem} />
        </div>
      </Grid>

      <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
        <Pagination count={3} page={page} onChange={handlePageChange} />
      </Stack>

      <RightDrawer
        addDrawerOpen={addDrawerOpen}
        setAddDrawerOpen={setAddDrawerOpen}
        editDrawerOpen={editDrawerOpen}
        setEditDrawerOpen={setEditDrawerOpen}
        prod={listItem}
        setProd={setListItem}
        productToEdit={editingProduct}
      />
    </>
  );
};

export default Product;
