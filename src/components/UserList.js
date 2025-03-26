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
import UserService from "../services/UserService"; // ✅ Corrected Import Path

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const userData = await UserService.getAllUsers();
                setUsers(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await UserService.deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <CircularProgress sx={{ display: 'block', margin: '50px auto' }} />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                User Management
            </Typography>
            <Button 
                component={Link} 
                to="/add-user"
                variant="contained" 
                color="primary"
                sx={{ mb: 3 }}
            >
                Add New User
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button 
                                        component={Link} 
                                        to={`/users/${user.id}`} 
                                        variant="outlined" 
                                        sx={{ mr: 1 }}
                                    >
                                        View
                                    </Button>
                                    <Button 
                                        onClick={() => handleDelete(user.id)} 
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
}

export default UserList;
