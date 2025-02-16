import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import Auth from './pages/Auth';
import Events from './pages/Events';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import { useAppSelector } from './shared/store/store';

const App = () => {
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: '240px', // Match the width of the Navigation drawer
          width: 'calc(100% - 240px)',
          overflowY: 'auto'
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/auth" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<Events />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
