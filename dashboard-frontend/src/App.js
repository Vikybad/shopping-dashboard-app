import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OrdersPage from './components/OrderList';
import TaskBoard from './components/TaskBoard';
import WalletPage from './components/WalletPage';
import AddOrderForm from './components/AddOrderForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SnackbarManager from './components/SnackbarManager';

const darkTheme = createTheme({
  typography: {
    fontWeightBold: 700,
  },
  palette: {
    mode: 'dark',
  },
});

const Layout = ({ children }) => {
  const location = useLocation();

  // Routes where Sidebar and Navbar should not be shown
  const noSidebarNavbarRoutes = ['/', '/login', '/signup'];

  return (
    <>
      {!noSidebarNavbarRoutes.includes(location.pathname) && (
        <>
          <Sidebar />
          <Navbar />
        </>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <SnackbarManager>
            {(showSnackbar) => (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Login showSnackbar={showSnackbar} />
                    </Layout>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Layout>
                      <Login showSnackbar={showSnackbar} />
                    </Layout>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <Layout>
                      <Signup showSnackbar={showSnackbar} />
                    </Layout>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <Layout>
                      <Dashboard showSnackbar={showSnackbar} />
                    </Layout>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <Layout>
                      <OrdersPage showSnackbar={showSnackbar} />
                    </Layout>
                  }
                />
                <Route
                  path="/tasks"
                  element={
                    <Layout>
                      <TaskBoard showSnackbar={showSnackbar} />
                    </Layout>
                  }
                />
                <Route
                  path="/wallet"
                  element={
                    <Layout>
                      <WalletPage />
                    </Layout>
                  }
                />
                <Route
                  path="/add-order"
                  element={
                    <Layout>
                      <AddOrderForm showSnackbar={showSnackbar} />
                    </Layout>
                  }
                />
              </Routes>
            )}
          </SnackbarManager>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
