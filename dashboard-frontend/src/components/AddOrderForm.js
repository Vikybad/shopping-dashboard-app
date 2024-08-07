import React, { useState, useContext } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const AddOrderForm = ({ showSnackbar }) => {

  const { token } = useContext(AuthContext)
  const [orderData, setOrderData] = useState({
    customerName: '',
    dishName: '',
    actualAmount: '',
    soldAtAmount: '',
    instructions: ''
  });

  const snackBarMssg = (message, severity = 'error', redirectToPath = '') => {
    showSnackbar({
      message: message,
      severity: severity,
      autoHideDuration: 500,
      redirectToPath: redirectToPath
    });
  }

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/orders/add-order', orderData, {
      headers: { 'x-auth-token': token },
    }).then(res => {
      console.log(res);
      // Clear the form for next order
      setOrderData({
        customerName: '',
        dishName: '',
        actualAmount: '',
        soldAtAmount: '',
        instructions: ''
      });
      return snackBarMssg('Order added successfully!', 'success')
    }).catch(error => {
      let errorMssgFromApi = error?.response?.data?.msg
      if (errorMssgFromApi) {
        console.log('errorMssgFromApi to get orders', errorMssgFromApi);
        if (errorMssgFromApi === "No token, authorization denied") {
          return snackBarMssg(`Session expired, please signin again`, 'error', '/login')
        }
      } else {
        console.error(error);
      }
      snackBarMssg('Error adding order. Please try again.')
    })
  };


  return (
    <Card sx={{ flexGrow: 1, p: 7 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Order
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="customerName"
            label="Customer Name"
            value={orderData.customerName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="dishName"
            label="Dish Name"
            value={orderData.dishName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="actualAmount"
            label="Actual Amount"
            type="number"
            value={orderData.actualAmount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="soldAtAmount"
            label="Sold At Amount"
            type="number"
            value={orderData.soldAtAmount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="instructions"
            label="Special Instructions"
            multiline
            rows={4}
            value={orderData.instructions}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Order
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddOrderForm;