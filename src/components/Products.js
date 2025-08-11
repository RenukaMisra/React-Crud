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
  const itemsPerPage = 8;

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

  const handleProductAdded = (newProduct) => {
    const updatedList = [...listItem, newProduct];
    setListItem(updatedList);

    const newTotal = updatedList.length;
    const newPage = Math.ceil(newTotal / itemsPerPage);
    setPage(newPage);
  };

  const handleProductUpdated = (updatedProduct) => {
    const updatedList = listItem.map(item =>
      item.id === updatedProduct.id ? updatedProduct : item
    );
    setListItem(updatedList);
  };

  const handleProductDeleted = (id) => {
    const updatedList = listItem.filter(item => item.id !== id);
    setListItem(updatedList);

    const newTotal = updatedList.length;
    const newPage = Math.min(page, Math.ceil(newTotal / itemsPerPage));
    setPage(newPage);
  };

  const getPaginatedProducts = () => {
    const startIndex = (page - 1) * itemsPerPage;
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
          <Cards
            data={getPaginatedProducts()}
            onEdit={handleEditClick}
            onDelete={handleProductDeleted}
          />
        </div>
      </Grid>

      <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(listItem.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>

      <RightDrawer
        addDrawerOpen={addDrawerOpen}
        setAddDrawerOpen={setAddDrawerOpen}
        editDrawerOpen={editDrawerOpen}
        setEditDrawerOpen={setEditDrawerOpen}
        prod={listItem}
        setProd={setListItem}
        productToEdit={editingProduct}
        onProductAdded={handleProductAdded}
        onProductUpdated={handleProductUpdated}
      />
    </>
  );
};

export default Product;
