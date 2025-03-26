import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2c3e50, #3498db)' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          BlueMedix Dashboard
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>Home</Button>
          <Button color="inherit" component={Link} to="/users" sx={{ mx: 1 }}>Users</Button>
          <Button color="inherit" component={Link} to="/products" sx={{ mx: 1 }}>Products</Button>
          <Button color="inherit" component={Link} to="/add-user" sx={{ mx: 1 }}>+ Add User</Button>
          <Button color="inherit" component={Link} to="/add-product" sx={{ mx: 1 }}>+ Add Product</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
