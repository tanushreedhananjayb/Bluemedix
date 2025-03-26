import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button,
  Chip,
  Avatar
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from "../services/UserService";

function UserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await UserService.getUserById(id);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user', error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = async () => {
    try {
      await UserService.deleteUser(id);
      navigate('/users');
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card 
        sx={{ 
          borderRadius: 3, 
          boxShadow: 6,
          background: 'linear-gradient(145deg, #f0f9ff, #e6f2ff)'
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid 
              item 
              xs={12} 
              md={4} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              }}
            >
              <Avatar 
                sx={{ 
                  width: 150, 
                  height: 150, 
                  mb: 2,
                  background: 'linear-gradient(45deg, #2c3e50, #3498db)'
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user.email}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                User Details
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item>
                  <Chip 
                    label={`Username: ${user.username}`} 
                    color="primary" 
                    variant="outlined" 
                  />
                </Grid>
                <Grid item>
                  <Chip 
                    label={`Role: ${user.role || 'Not Specified'}`} 
                    color="secondary" 
                  />
                </Grid>
                <Grid item>
                  <Chip 
                    label={`Department: ${user.department || 'Not Specified'}`} 
                    color="info" 
                  />
                </Grid>
              </Grid>

              <Typography variant="body1" paragraph>
                Contact Information:
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {user.phone || 'Not Provided'}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={handleEdit}
                    sx={{
                      background: 'linear-gradient(45deg, #2c3e50, #3498db)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #3498db, #2c3e50)'
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="contained" 
                    color="error" 
                    fullWidth
                    onClick={handleDelete}
                    sx={{
                      background: 'linear-gradient(45deg, #c0392b, #e74c3c)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #e74c3c, #c0392b)'
                      }
                    }}
                  >
                    Delete Profile
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default UserDetails;