import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography 
} from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5, textAlign: "center" }}>
      {/* Dashboard Title */}
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: "bold", 
          mb: 4, 
          color: "#1565C0", // Deep Blue
          textShadow: "2px 2px 10px rgba(21, 101, 192, 0.3)"
        }}
      >
        BlueMedix Dashboard
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        
        {/* User Management Section */}
        <Grid item xs={12} md={5}>
          <Card 
            component={Link} 
            to="/users" 
            sx={{
              textDecoration: "none",
              borderRadius: "50px", // Capsule Shape
              boxShadow: "0px 10px 25px rgba(21, 101, 192, 0.2)",
              background: "linear-gradient(135deg, #64B5F6, #1976D2)", // Soft Blue Gradient
              transition: "0.3s",
              height: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0px 15px 35px rgba(21, 101, 192, 0.3)" }
            }}
          >
            <CardContent>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: "bold", 
                  color: "#fff", 
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textAlign: "center"
                }}
              >
                User Management
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Product Management Section */}
        <Grid item xs={12} md={5}>
          <Card 
            component={Link} 
            to="/products" 
            sx={{
              textDecoration: "none",
              borderRadius: "50px", // Capsule Shape
              boxShadow: "0px 10px 25px rgba(255, 87, 34, 0.2)",
              background: "linear-gradient(135deg, #FF8A65, #E64A19)", // Soft Orange Gradient
              transition: "0.3s",
              height: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0px 15px 35px rgba(255, 87, 34, 0.3)" }
            }}
          >
            <CardContent>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: "bold", 
                  color: "#fff", 
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textAlign: "center"
                }}
              >
                Product Management
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Dashboard;
