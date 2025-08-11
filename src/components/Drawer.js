import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import AddForm from './Form';
import Update from './Update';

export default function RightDrawer({
  addDrawerOpen,
  setAddDrawerOpen,
  editDrawerOpen,
  setEditDrawerOpen,
  prod,
  setProd,
  productToEdit,
  onProductAdded  
}) {
  return (
    <>
      <Drawer anchor="right" open={editDrawerOpen} onClose={() => setEditDrawerOpen(false)}>
        <Update
          setDrawerOpen={setEditDrawerOpen}
          prod={prod}
          setProd={setProd}
          productToEdit={productToEdit}
        />
      </Drawer>

      <Drawer anchor="right" open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)}>
        <AddForm
          setDrawerOpen={setAddDrawerOpen}
          prod={prod}
          setProd={setProd}
          onProductAdded={onProductAdded} 
        />
      </Drawer>
    </>
  );
}
