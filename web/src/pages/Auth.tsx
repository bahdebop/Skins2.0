import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../shared/api/supabase';
import { useAppDispatch } from '../shared/store/store';
import { setUser, setError, setLoading } from '../shared/store/authSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setErrorMessage] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setErrorMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      if (tab === 0) {
        // Login
        const { data, error } = await signIn(email, password);
        if (error) throw error;
        if (data.user) {
          dispatch(setUser(data.user));
          navigate('/events');
        }
      } else {
        // Register
        const { data, error } = await signUp(email, password);
        if (error) throw error;
        if (data.user) {
          dispatch(setUser(data.user));
          navigate('/events');
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setErrorMessage(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', m: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome to Skins 2.0
          </Typography>

          <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TabPanel value={tab} index={0}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Loading...' : 'Register'}
              </Button>
            </form>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;
