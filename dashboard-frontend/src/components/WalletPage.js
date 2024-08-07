import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const WalletPage = ({ totalEarnings, ordersDelivered }) => {
  return (
    <Card sx={{ flexGrow: 1, p: 7 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Wallet
        </Typography>
        <Box mt={2}>
          <Typography variant="h4">
            Total Earnings: ${totalEarnings}
          </Typography>
          <Typography variant="subtitle1">
            Orders Delivered: {ordersDelivered}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WalletPage;