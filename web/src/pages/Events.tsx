import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
} from '@mui/material';
import { SportsGolf, SportsHockey } from '@mui/icons-material';

const Events = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  // Mock data - replace with API calls
  const pgatEvents = [
    {
      id: 1,
      name: 'PGA Championship',
      date: '2025-03-01',
      location: 'Augusta National',
      status: 'upcoming',
    },
    {
      id: 2,
      name: 'US Open',
      date: '2025-03-15',
      location: 'Pebble Beach',
      status: 'upcoming',
    },
  ];

  const nhlEvents = [
    {
      id: 1,
      name: 'NHL Playoffs R1G1',
      date: '2025-03-02',
      teams: 'BOS vs TOR',
      status: 'upcoming',
    },
    {
      id: 2,
      name: 'NHL Playoffs R1G2',
      date: '2025-03-04',
      teams: 'BOS vs TOR',
      status: 'upcoming',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab icon={<SportsGolf />} label="PGA" />
        <Tab icon={<SportsHockey />} label="NHL" />
      </Tabs>

      {selectedTab === 0 && (
        <Grid container spacing={3}>
          {pgatEvents.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography color="textSecondary">
                    Date: {event.date}
                  </Typography>
                  <Typography color="textSecondary">
                    Location: {event.location}
                  </Typography>
                  <Typography color="primary" sx={{ mt: 1 }}>
                    Status: {event.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedTab === 1 && (
        <Grid container spacing={3}>
          {nhlEvents.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography color="textSecondary">
                    Date: {event.date}
                  </Typography>
                  <Typography color="textSecondary">
                    Teams: {event.teams}
                  </Typography>
                  <Typography color="primary" sx={{ mt: 1 }}>
                    Status: {event.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Events;
