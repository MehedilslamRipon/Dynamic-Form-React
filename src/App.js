import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import RemoveIcon from '@mui/icons-material/Remove';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

function App() {
   const [inputField, setInputField] = useState([
      {
         name: '',
         price: '',
         quantity: '',
         isAvailable: true,
      },
   ]);

   const handleFormChange = (index, e) => {
      let data = [...inputField];
      data[index][e.target.name] = e.target.value;
      setInputField(data);
   };

   const addNew = () => {
      let newItem = { name: '', price: '', quantity: '', isAvailable: true };

      setInputField([...inputField, newItem]);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputField);
      localStorage.setItem('productInfo', JSON.stringify(inputField));
   };

   const showData = () => {
      const products = JSON.parse(localStorage.getItem('productInfo'));
      if (!products) {
         alert('no product available');
      }
      console.log(products);
   };

   const removeData = () => {
      localStorage.removeItem('productInfo');
   };

   const removeItem = (index) => {
      setInputField([...inputField.splice(index, 1)]);
   };

   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />

         <div className="App">
            {/* add new button */}
            <Button
               sx={{ mt: 3 }}
               color="info"
               type="button"
               variant="contained"
               onClick={addNew}
            >
               Add Item
            </Button>
            <Box
               mt={2}
               mb={3}
               onSubmit={handleSubmit}
               component="form"
               sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
               }}
               noValidate
               autoComplete="off"
            >
               {inputField.map((input, index) => (
                  <React.Fragment key={index}>
                     <Fab
                        onClick={() => removeItem(index)}
                        style={{ width: '7ch' }}
                        color="primary"
                        aria-label="add"
                     >
                        <RemoveIcon />
                     </Fab>
                     <TextField
                        onChange={(e) => handleFormChange(index, e)}
                        name="name"
                        required
                        type="text"
                        id="outlined-required"
                        label="Product Name"
                        defaultValue={input.name}
                     />
                     <TextField
                        onChange={(e) => handleFormChange(index, e)}
                        name="price"
                        required
                        type="number"
                        id="outlined-required"
                        label="Product Price"
                        defaultValue={input.price}
                     />
                     <TextField
                        onChange={(e) => handleFormChange(index, e)}
                        name="quantity"
                        required
                        type="number"
                        id="outlined-required"
                        label="Quantity"
                        defaultValue={input.quantity}
                     />
                     <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Available"
                     />

                     <br />
                  </React.Fragment>
               ))}
               <br />
               <Button type="submit" variant="contained">
                  Submit
               </Button>
            </Box>
            <Button
               color="success"
               onClick={showData}
               type="button"
               variant="contained"
            >
               Show Products
            </Button>{' '}
            <Button
               color="warning"
               onClick={removeData}
               type="button"
               variant="contained"
            >
               Remove Products
            </Button>
         </div>
      </ThemeProvider>
   );
}

export default App;
