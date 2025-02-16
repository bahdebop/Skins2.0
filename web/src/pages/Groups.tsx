import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { createGroup } from '../shared/api/supabase';
import { useAppSelector } from '../shared/store/store';
import { Group } from '../shared/types/models';

interface GroupWithStats extends Group {
  memberCount: number;
  activeEvents: number;
}

const Groups = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state: { auth: { user: any } }) => state.auth?.user);

  // Mock data - replace with real data from Supabase
  const groups: GroupWithStats[] = [
    {
      id: '1',
      name: 'Weekend Warriors',
      adminId: '123',
      inviteCode: 'ABC123',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      memberCount: 8,
      activeEvents: 2,
    },
    {
      id: '2',
      name: 'NHL Betting Club',
      adminId: '456',
      inviteCode: 'DEF456',
      createdAt: '2025-01-02',
      updatedAt: '2025-01-02',
      memberCount: 12,
      activeEvents: 1,
    },
  ];

  const handleCreateGroup = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await createGroup(groupName, user.id);
      if (error) throw error;
      setCreateDialogOpen(false);
      setGroupName('');
      // Refresh groups list
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = () => {
    // Implement join group logic
    setJoinDialogOpen(false);
    setInviteCode('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Groups</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateDialogOpen(true)}
            sx={{ mr: 2 }}
          >
            Create Group
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setJoinDialogOpen(true)}
          >
            Join Group
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {groups.map((group) => (
          <Grid item xs={12} md={6} key={group.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {group.name}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Members" />
                    <Chip label={group.memberCount} size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Active Events" />
                    <Chip label={group.activeEvents} size="small" color="primary" />
                  </ListItem>
                  {user?.id === group.adminId && (
                    <ListItem>
                      <ListItemText primary="Invite Code" />
                      <Typography variant="body2" color="textSecondary">
                        {group.inviteCode}
                      </Typography>
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Group Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreateGroup}
            color="primary"
            disabled={!groupName || loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Join Group Dialog */}
      <Dialog
        open={joinDialogOpen}
        onClose={() => setJoinDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Join Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Invite Code"
            fullWidth
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJoinDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleJoinGroup}
            color="primary"
            disabled={!inviteCode || loading}
          >
            {loading ? 'Joining...' : 'Join'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Groups;
