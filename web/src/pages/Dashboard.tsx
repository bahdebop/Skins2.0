import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import {
  SportsGolf as GolfIcon,
  SportsHockey as HockeyIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../shared/store/store';

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth?.user);

  // Mock data - replace with real data from API
  const upcomingEvents = [
    { id: 1, name: 'PGA Championship', type: 'PGA', date: '2025-03-01' },
    { id: 2, name: 'NHL Playoffs R1G1', type: 'NHL', date: '2025-03-02' },
  ];

  const activeGroups = [
    { id: 1, name: 'Weekend Warriors', members: 8, activeEvents: 2 },
    { id: 2, name: 'NHL Betting Club', members: 12, activeEvents: 1 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Balance
              </Typography>
              <Typography variant="h3" color="primary">
                ${user?.currentBalance?.toFixed(2) || '0.00'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Settle Up
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {upcomingEvents.map((event) => (
                  <ListItem key={event.id}>
                    <ListItemIcon>
                      {event.type === 'PGA' ? <GolfIcon /> : <HockeyIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={event.name}
                      secondary={event.date}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Groups
              </Typography>
              <List>
                {activeGroups.map((group) => (
                  <ListItem key={group.id}>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={group.name}
                      secondary={`${group.members} members • ${group.activeEvents} active events`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
