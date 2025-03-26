import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Button, 
    CircularProgress 
} from '@mui/material';
import { Link } from 'react-router-dom';
import ProductService from "../services/ProductService"; // ✅ Corrected Import Path

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await ProductService.getAllProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await ProductService.deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                Product Management
            </Typography>
            <Button 
                component={Link} 
                to="/add-product"
                variant="contained" 
                color="primary"
                sx={{ mb: 3 }}
            >
                Add New Product
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <Button 
                                        component={Link} 
                                        to={`/products/${product.id}`} 
                                        variant="outlined" 
                                        sx={{ mr: 1 }}
                                    >
                                        View
                                    </Button>
                                    <Button 
                                        onClick={() => handleDelete(product.id)} 
                                        variant="contained" 
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ProductList;
