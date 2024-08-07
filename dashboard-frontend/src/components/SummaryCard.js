import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const SummaryCard = ({ title, value, change, icon }) => {

  const iconList = {
    TotalOrders: <img src={"/images/all-orders.png"} alt='all orders' style={{ height: '55px', width: '65px' }} />,
    TotalDelivered: <img src={"/images/orders-delivered.png"} alt='orders delivered' style={{ height: '55px', width: '60px' }} />,
    TotalCancelled: <img src={"/images/order-cancelled.png"} alt='orders cancelled' style={{ height: '55px', width: '65px' }} />,
    TotalRevenue: <img src={"/images/total-revenue.png"} alt='total revenue' style={{ height: '55px', width: '65px' }} />
  }

  return (
    <Card sx={{ backgroundColor: '#202022', color: 'white', height: '100%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item >

            {iconList[icon]}

            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>

            <Typography variant="h5" component="h2">
              {value}
            </Typography>

          </Grid>

          <Grid item style={{ alignItems: 'center' }}>
            <Box display="flex" alignItems="center" mt={1}>
              {change >= 0 ? (
                <ArrowUpward style={{ color: 'green' }} />
              ) : (
                <ArrowDownward style={{ color: 'red' }} />
              )}
              <Typography color={change >= 0 ? 'green' : 'red'}>
                {Math.abs(change)}%
              </Typography>
            </Box>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;