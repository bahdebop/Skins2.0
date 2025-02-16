import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../shared/store/store';
import { supabase } from '../shared/api/supabase';
import { logout } from '../shared/store/authSlice';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth?.user);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
    { text: 'Groups', icon: <GroupIcon />, path: '/groups' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      dispatch(logout());
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          Skins 2.0
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? 'white' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.email?.[0].toUpperCase()}
            </Avatar>
            <Typography variant="body2" noWrap>
              {user.email}
            </Typography>
          </Box>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSignOut}
          startIcon={<LogoutIcon />}
          fullWidth
        >
          Sign Out
        </Button>
      </Box>
    </Drawer>
  );
};

export default Navigation;
