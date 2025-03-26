import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import Components
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import ErrorBoundary from "./components/ErrorBoundary";
import UserForm from './components/UserForm';
import ProductForm from './components/ProductForm';
import UserDetails from './pages/UserDetails';
import ProductDetails from './pages/ProductDetails';

// Create a theme for MUI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* ✅ Removed extra <Router> (It's already in index.js) */}
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/add-product" element={<ProductForm />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
