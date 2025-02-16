import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  Button,
  useTheme,
  Portal,
  Modal,
  TextInput,
  List,
  FAB,
  Divider,
  IconButton,
} from 'react-native-paper';
import { createGroup, getGroupMembers } from '../../../shared/api/supabase';
import { useAppSelector } from '../../../shared/store/store';

const Groups = () => {
  const theme = useTheme();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth?.user);

  // Mock data - replace with real data from Supabase
  const groups = [
    {
      id: '1',
      name: 'Weekend Warriors',
      memberCount: 8,
      activeEvents: 2,
      balance: 150.00,
    },
    {
      id: '2',
      name: 'NHL Betting Club',
      memberCount: 12,
      activeEvents: 1,
      balance: -75.50,
    },
  ];

  const handleCreateGroup = async () => {
    if (!newGroupName.trim() || !user?.id) return;

    setLoading(true);
    try {
      await createGroup(newGroupName, user.id);
      setCreateModalVisible(false);
      setNewGroupName('');
      // Refresh groups list
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!inviteCode.trim()) return;

    setLoading(true);
    try {
      // Implement join group functionality
      setJoinModalVisible(false);
      setInviteCode('');
      // Refresh groups list
    } catch (error) {
      console.error('Error joining group:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {groups.map((group) => (
          <Card key={group.id} style={styles.groupCard}>
            <Card.Content>
              <View style={styles.groupHeader}>
                <Text variant="titleLarge">{group.name}</Text>
                <IconButton icon="dots-vertical" onPress={() => {}} />
              </View>
              <Divider style={styles.divider} />
              <List.Item
                title={`${group.memberCount} members`}
                left={props => <List.Icon {...props} icon="account-group" />}
              />
              <List.Item
                title={`${group.activeEvents} active events`}
                left={props => <List.Icon {...props} icon="calendar" />}
              />
              <List.Item
                title={`Balance: $${Math.abs(group.balance).toFixed(2)}`}
                titleStyle={{
                  color: group.balance >= 0 ? theme.colors.primary : theme.colors.error,
                }}
                left={props => <List.Icon {...props} icon="currency-usd" />}
              />
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => {}}>View Details</Button>
              <Button onPress={() => {}}>Place Bet</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <FAB.Group
        open={false}
        visible
        icon="plus"
        actions={[
          {
            icon: 'account-multiple-plus',
            label: 'Join Group',
            onPress: () => setJoinModalVisible(true),
          },
          {
            icon: 'plus',
            label: 'Create Group',
            onPress: () => setCreateModalVisible(true),
          },
        ]}
      />

      <Portal>
        <Modal
          visible={createModalVisible}
          onDismiss={() => setCreateModalVisible(false)}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Create New Group
          </Text>
          <TextInput
            label="Group Name"
            value={newGroupName}
            onChangeText={setNewGroupName}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleCreateGroup}
            loading={loading}
            style={styles.modalButton}
          >
            Create
          </Button>
        </Modal>

        <Modal
          visible={joinModalVisible}
          onDismiss={() => setJoinModalVisible(false)}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Join Group
          </Text>
          <TextInput
            label="Invite Code"
            value={inviteCode}
            onChangeText={setInviteCode}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleJoinGroup}
            loading={loading}
            style={styles.modalButton}
          >
            Join
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  groupCard: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 8,
  },
  modal: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  modalButton: {
    marginTop: 8,
  },
});

export default Groups;
