import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import AddForm from './Form';
import Update from './Update';

// export default function RightDrawer({ open, onClose, setDrawerOpen, prod, setProd }) {
// export default function RightDrawer({
//   addDrawerOpen,
//   setAddDrawerOpen,
//   editDrawerOpen,
//   setEditDrawerOpen,
//   prod,
//   setProd,
//   productToEdit
// }) {


//   return (
//     <div>
//       <Drawer anchor="right" open={open} onClose={onClose}>
//         <AddForm   setDrawerOpen={setDrawerOpen}
//           prod={prod}
//           setProd={setProd}
//         />
//       </Drawer>
//     </div>
//   );
// }





export default function RightDrawer({
  addDrawerOpen,
  setAddDrawerOpen,
  editDrawerOpen,
  setEditDrawerOpen,
  prod,
  setProd,
  productToEdit
}) {

  console.log(productToEdit,'productupdate')
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
        />
      </Drawer>
    </>
  );
}
