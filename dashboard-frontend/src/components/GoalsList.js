import React from 'react';
import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import { List as ChevronRight } from 'react-bootstrap-icons';


const GoalsList = () => {

  const Goal = () => {
    return <img src={"/images/3d-target.png"} alt='Goals' style={{ height: '80px', width: '80px' }} />
  }

  const Dish = () => {
    return <img src={"/images/hamburger.png"} alt='Goals' style={{ height: '80px', width: '80px' }} />
  }

  const Menus = () => {
    return <img src={"/images/dish.png"} alt='Goals' style={{ height: '80px', width: '80px' }} />
  }

  const items = [
    { title: 'Goals', icon: <Goal /> },
    { title: 'Popular Dishes', icon: <Dish /> },
    { title: 'Menus', icon: <Menus /> },
  ];

  return (
    <Card sx={{ backgroundColor: '#202022', color: 'white', height: '100%' }}>
      <CardContent>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} button sx={{ p: '7px', m:'7px'}}>

              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>

              <h3 style={{ 'margin-left': '30px' }}>
                {item.title}
              </h3>

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="go to" sx={{ color: 'white', mr:'7px' }}>
                  <ChevronRight />
                </IconButton>
              </ListItemSecondaryAction>

            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default GoalsList;