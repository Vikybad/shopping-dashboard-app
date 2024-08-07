import React, { useState } from 'react';
import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for demonstration purposes. Replace with actual data as needed.
const allData = {
  daily: [
    { name: '5', value: 2000 },
    { name: '', value: 2000 },
    { name: '7', value: 2780 },
    { name: '', value: 2780 },
    { name: '9', value: 1890 },
    { name: '', value: 1890 },
    { name: '11', value: 2390 },
    { name: '', value: 2390 },
    { name: '13', value: 2490 },
    { name: '', value: 2790 },
    { name: '15', value: 3090 },
    { name: '', value: 4090 },
    { name: '17', value: 5090 },
    { name: '', value: 3790 },
    { name: '19', value: 3590 },
    { name: '', value: 2590 },
    { name: '21', value: 2090 },
    { name: '', value: 2490 },
    { name: '23', value: 3490 },
    { name: '', value: 3490 },
    { name: '25', value: 4190 },
    { name: '', value: 4190 },
    { name: '27', value: 4990 },
  ],
  weekly: [
    { name: 'Week 1', value: 6000 },
    { name: 'Week 2', value: 3000 },
    { name: 'Week 3', value: 4000 },
    { name: 'Week 4', value: 1800 },
  ],
  monthly: [
    { name: 'January', value: 5000 },
    { name: 'February', value: 6000 },
    { name: 'March', value: 2000 },
    { name: 'April', value: 1200 },
  ],
  yearly: [
    { name: '2021', value: 7000 },
    { name: '2022', value: 8000 },
    { name: '2023', value: 9000 },
  ],
};

const CustomTooltip = ({ payload, label }) => {
  if (payload && payload.length) {
    const { value } = payload[0];
    return (
      <div style={{ backgroundColor: '#333', padding: '5px', borderRadius: '4px' }}>
        <Typography variant="body2" color="inherit">
          {`Value: ${value}`}
        </Typography>
      </div>
    );
  }
  return null;
};



const ActivityChart = () => {
  const [timePeriod, setTimePeriod] = useState('daily');

  return (
    <Card sx={{ backgroundColor: '#202022', color: 'white', height: '100%' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ ml: 2 }} gutterBottom>
            Activity
          </Typography>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Period</InputLabel>
            <Select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              label="Period"
              sx={{ color: 'white' }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </div>


        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={allData[timePeriod]}>
            <CartesianGrid stroke="#444" strokeDasharray="0 1" />
            <XAxis dataKey="name" />
            <YAxis axisLine={false} />
            {<Tooltip content={<CustomTooltip />} />}

            <Bar dataKey="value" fill="#6977e0" radius={[20, 20, 20, 20]} />
          </BarChart>
        </ResponsiveContainer>


      </CardContent>
    </Card>
  );
};

export default ActivityChart;
