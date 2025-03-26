import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Button,
  Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from "../services/ProductService"; 


function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await ProductService.getProductById(id);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product', error);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(id);
      navigate('/products');
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card 
        sx={{ 
          borderRadius: 3, 
          boxShadow: 6,
          background: 'linear-gradient(145deg, #f0f9ff, #e6f2ff)'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              image={product.image || '/default-medical-product.jpg'}
              alt={product.title}
              sx={{
                height: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item>
                  <Chip 
                    label={`Price: $${product.price}`} 
                    color="primary" 
                    variant="outlined" 
                  />
                </Grid>
                <Grid item>
                  <Chip 
                    label={product.category} 
                    color="secondary" 
                  />
                </Grid>
              </Grid>

              <Typography 
                variant="body1" 
                color="text.secondary" 
                paragraph
              >
                {product.description}
              </Typography>

              <Grid container spacing={2}>
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
                    Edit Product
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
                    Delete Product
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default ProductDetails;