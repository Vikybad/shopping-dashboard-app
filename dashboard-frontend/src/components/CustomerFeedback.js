import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, Rating, Box, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const feedbacks = [
  { id: 1, name: 'Jenny Wilson', rating: 5, comment: 'The food was excellent and so was the service. I had the mushroom risotto with scallops which was awesome. Had a burger next week which was also very good. They were very conscientious about gluten allergies.' },
  { id: 2, name: 'Dianne Russell', rating: 5, comment: 'We enjoyed the Eggs Benedict served on homemade focaccia bread and hot coffee. Perfect service' },
  { id: 3, name: 'Devon Lane', rating: 4, comment: 'Normally we love this place, but this was sadly disappointing...' },
];

const CustomerFeedback = () => {
  return (
    <Card sx={{ backgroundColor: '#202022', color: 'white', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Customer's Feedback
        </Typography>
        <List sx={{ width: '100%' }}>
          {feedbacks.map((feedback, index) => (
            <React.Fragment key={feedback.id}>
              <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>

                <Box display="flex" alignItems="center" width="100%" mb={1}>
                  <ListItemAvatar>
                    <Avatar alt={feedback.name} src={`/static/images/avatar/${feedback.id}.jpg`} />
                  </ListItemAvatar>
                  
                  <Typography variant="subtitle1">
                    {feedback.name}
                  </Typography>
                </Box>

                <Box pl={0} width="100%">
                  {/* <Rating name={`rating-${feedback.id}`} value={feedback.rating} size="medium" readOnly sx={{ mb: 1 }} /> */}
                  <Rating
                    name={`rating-${feedback.id}`}
                    value={feedback.rating}
                    size="medium"
                    readOnly
                    sx={{ mb: 1 }}
                    icon={<StarIcon fontSize="inherit" sx={{ color: 'gold' }} />}
                    emptyIcon={<StarIcon fontSize="inherit" sx={{ color: 'white' }} />}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {feedback.comment}
                  </Typography>
                </Box>

              </ListItem>
              {index < feedbacks.length - 1 && (
                <Divider variant="fullWidth" component="li" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', my: 1 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CustomerFeedback;