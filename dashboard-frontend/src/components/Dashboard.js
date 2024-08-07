import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import SummaryCard from './SummaryCard';
import ActivityChart from './ActivityChart';
import RecentOrders from './RecentOrders';
import CustomerFeedback from './CustomerFeedback';
import GoalsList from './GoalsList';
import { AuthContext } from '../contexts/AuthContext';



const PieChart = ({ percentage, text }) => {
  const radius = 30; // Reduced radius
  const strokeWidth = 10; // Adjust stroke width to fit the new radius
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={80} height={80} > {/* Adjusted width and height */}
      <circle
        cx={40}
        cy={40}
        r={radius}
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={40}
        cy={40}
        r={radius}
        stroke="#6977e0"
        strokeWidth={strokeWidth - 1} // Slightly smaller strokeWidth for visual clarity
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 40 40)"
      />
      <text
        x={40}
        y={40}
        textAnchor="middle"
        dominantBaseline="middle"
        fill='white'
        fontSize={14}
      >
        {percentage}%
      </text>
    </svg>
  );
};





const Dashboard = ({ showSnackbar }) => {

  const [orders, setOrders] = useState([]);
  const [netProfit, setNetProfit] = useState(0);
  const [progress, setProgress] = useState(0);
  const { token } = useContext(AuthContext);

  const sessionExpired = () => {
    showSnackbar({
      message: `Session expired, please signin again`,
      severity: 'error',
      autoHideDuration: 500,
      redirectToPath: '/login'
    });
  }

  useEffect(() => {
    if (!token) {
      return sessionExpired()
    }
    async function getOrders() {
      await axios.get('http://localhost:5000/api/orders/get-orders', {
        headers: { 'x-auth-token': token },
      }).then(response => {
        setOrders(response.data);
        // Calculate net profit based on orders data
        setNetProfit(6759.25);
        // Calculate progress based on net profit and goal
        setProgress(70);

      }).catch((error) => {
        let errorMssgFromApi = error?.response?.data?.msg
        if (errorMssgFromApi) {
          console.log('errorMssgFromApi to get orders', errorMssgFromApi);
          if (errorMssgFromApi === "No token, authorization denied") {
            return sessionExpired();
          }
        }
        console.log('error', error);
      });
    }
    getOrders()
  }, [token]);



  return (
    <Box component="main" sx={{ flexGrow: 1, pl: 9, pt: 8 }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2.25}>
          <SummaryCard title="Total Orders" value="75" change={3} icon="TotalOrders" />
        </Grid>
        <Grid item xs={12} md={2.25}>
          <SummaryCard title="Total Delivered" value="70" change={-3} icon="TotalDelivered" />
        </Grid>
        <Grid item xs={12} md={2.25}>
          <SummaryCard title="Total Cancelled" value="05" change={3} icon="TotalCancelled" />
        </Grid>
        <Grid item xs={12} md={2.25}>
          <SummaryCard title="Total Revenue" value="$12k" change={-3} icon="TotalRevenue" />
        </Grid>


        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#202022', color: 'white', height: '100%' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Left Section */}
                <div style={{ flex: '1', paddingRight: '16px' }}>
                  <Typography variant="p">Net Profit</Typography>
                  <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>${netProfit}</Typography>
                  <Typography variant="h6" color="success.main">↑ 3%</Typography>
                </div>

                {/* Right Section */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <PieChart percentage={progress} text={'Goal Completed'}>
                    <Typography variant="body2" sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {progress.toFixed(0)}%
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1, color: 'white' }}>Goal Completed</Typography>
                  </PieChart>

                  {/* Adjusted Text Size */}
                  <Typography variant="caption" sx={{ color: 'white', mt: 1 }}>
                    *The values here have been rounded off.
                  </Typography>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>


        {/* Activity Bar Chart */}
        <Grid item xs={12} md={9}>
          <ActivityChart />
        </Grid>

        <Grid item xs={12} md={3}>
          <GoalsList />
        </Grid>

        <Grid item xs={12} md={9}>
          <RecentOrders orders={orders} />
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomerFeedback />
        </Grid>
      </Grid>

    </Box >
  );
};

export default Dashboard;


