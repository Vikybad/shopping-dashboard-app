import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const UserCard = ({ user }) => {
    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Avatar alt={user.name} src={user.image} sx={{ width: 56, height: 56, mr: 2 }} />
                    <Box>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user.email}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user.mobileNumber}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard;