import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Button } from '@mui/material';
import { House, BarChart, ListTask, Wallet2, BagCheck, BoxArrowRight } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { text: 'Dashboard', icon: <House />, path: '/home' },
    { text: 'Analysis', icon: <BarChart />, path: '/orders' },
    { text: 'Tasks', icon: <ListTask />, path: '/tasks' },
    { text: 'Wallet', icon: <Wallet2 />, path: '/wallet' },
    { text: 'Add Order', icon: <BagCheck />, path: '/add-order' },
  ];

  const logoutSession = async (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: 80,
        flexShrink: 0,
        
        [`& .MuiDrawer-paper`]: {
          width: 70,
          boxSizing: 'border-box',
          backgroundColor: '#202022',
          color: '#ffffff',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
        <Box sx={{ mb: 4 }}>
          <img src="images/logo.png" alt="Logo" width="40" height="40" />
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                justifyContent: 'center',
                my: 1,
                '&.Mui-selected': {
                  backgroundColor: '#3f51b5',
                  borderRadius: '12px',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 'auto' }}>{item.icon}</ListItemIcon>
            </ListItem>
          ))}
        </List>

        <Box sx={{ position: 'absolute', bottom: 0, mb: 2 }}>
          <ListItem button onClick={logoutSession} sx={{ justifyContent: 'center' }}>
            <ListItemIcon sx={{ color: '#ffffff', minWidth: 'auto' }}>
              <BoxArrowRight />
            </ListItemIcon>
          </ListItem>
        </Box>

      </Box>
    </Drawer >
  );
};

export default Sidebar;
