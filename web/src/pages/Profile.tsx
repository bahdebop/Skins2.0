import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useAppSelector } from '../shared/store/store';

const Profile = () => {
  const user = useAppSelector((state) => state.auth?.user);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Box component="form" sx={{ '& > :not(style)': { m: 1 } }}>
            <TextField
              fullWidth
              label="Screen Name"
              defaultValue={user?.screenName}
            />
            <TextField
              fullWidth
              label="Email"
              defaultValue={user?.email}
              disabled
            />
            <TextField
              fullWidth
              label="Phone Number"
              defaultValue={user?.phoneNumber}
            />
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={user?.notificationPreferences?.gameStarts}
                />
              }
              label="Game/Tournament Starts"
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={user?.notificationPreferences?.playerScoring}
                />
              }
              label="Player Scoring Events"
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={user?.notificationPreferences?.settlementRequests}
                />
              }
              label="Settlement Requests"
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={user?.notificationPreferences?.groupChat}
                />
              }
              label="Group Chat Messages"
            />
          </FormGroup>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
