import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';

const RecentOrders = ({ orders }) => {

  const StatusCell = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status.toLowerCase()) {
        case 'delivered':
          return { backgroundColor: '#699e59', color: '#1d6e04' };
        case 'cancelled':
          return { backgroundColor: '#915659', color: '#940910' };
        case 'pending':
          return { backgroundColor: '#915659', color: '#940910' };
        default:
          return { backgroundColor: '#9e9e9e', color: 'white' };
      }
    };

    return (
      <span style={{
        padding: '6px 15px',
        borderRadius: '16px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        ...getStatusStyle(status)
      }}>
        {status}
      </span>
    );
  };


  return (
    <Card sx={{ backgroundColor: '#202022', color: 'white', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Orders
        </Typography>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell></TableCell> */}
                <TableCell>Customer</TableCell>
                <TableCell>Order No.</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderNumber}>
                  <TableCell>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={order.customerImage} alt={order.customerName}>
                        {order.customerName.charAt(0)}
                      </Avatar>
                      <span style={{ marginLeft: '6px' }}>{order.customerName}</span>
                    </div>

                  </TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>${order.soldAtAmount}</TableCell>
                  {/* <TableCell>{order.deliveryStatus}</TableCell> */}
                  <TableCell>
                    <StatusCell status={order.deliveryStatus} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;