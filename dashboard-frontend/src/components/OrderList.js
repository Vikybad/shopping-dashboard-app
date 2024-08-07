import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const OrderList = ({ showSnackbar }) => {

  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const { token } = useContext(AuthContext);

  const sessionExpired = () => {
    showSnackbar({
      message: `Session expired, please signin again`,
      severity: 'error',
      autoHideDuration: 500,
      redirectToPath: '/login'
    });
  }


  const getOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/get-orders', { headers: { 'x-auth-token': token } });
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders', error);
      let errorMssgFromApi = error?.response?.data?.msg
      if (errorMssgFromApi) {
        console.log('errorMssgFromApi to get orders', errorMssgFromApi);
        if (errorMssgFromApi === "No token, authorization denied") {
          return sessionExpired();
        }
      }
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      return await getOrders();
    };
    if (token) fetchOrders();
  }, [token]);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.deliveryStatus);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
    setNewStatus('');
  };

  const handleStatusChange = async () => {
    try {
      const url = `http://localhost:5000/api/orders/orderNumber/${selectedOrder.orderNumber}`;
      await axios.post(url, { deliveryStatus: newStatus }, { headers: { 'x-auth-token': token } });

      await getOrders();

      handleCloseDialog();
    } catch (error) {
      let errorMssgFromApi = error?.response?.data?.msg
      if (errorMssgFromApi) {
        console.log('errorMssgFromApi to get orders', errorMssgFromApi);
        if (errorMssgFromApi === "No token, authorization denied") {
          return sessionExpired();
        }
      }
      console.log('error', error);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ flexGrow: 1, pl: 10, pt: 7 }} >
        <Typography variant="h4" gutterBottom component="div">
          Orders
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell align="center" >Order Number</TableCell>
              <TableCell align="center">Customer Name</TableCell>
              <TableCell align="center">Dish Name</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">{order.orderNumber}</TableCell>
                  <TableCell align="center">{order.customerName}</TableCell>
                  <TableCell align="center">{order.dishName}</TableCell>
                  <TableCell align="center">${order.soldAtAmount}</TableCell>
                  <TableCell align="center">{order.deliveryStatus}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(order)}
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="PENDING">PENDING</MenuItem>
              <MenuItem value="SHIPPED">SHIPPED</MenuItem>
              <MenuItem value="DELIVERED">DELIVERED</MenuItem>
              <MenuItem value="CANCELLED">CANCELLED</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleStatusChange} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderList;
