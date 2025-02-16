import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  Card,
  useTheme,
  List,
  Surface,
  Button,
} from 'react-native-paper';
import { useAppSelector } from '../../../shared/store/store';

const Dashboard = () => {
  const theme = useTheme();
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
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Surface style={styles.balanceCard} elevation={2}>
        <Text variant="titleMedium">Current Balance</Text>
        <Text variant="headlineLarge" style={styles.balance}>
          ${user?.currentBalance?.toFixed(2) || '0.00'}
        </Text>
        <Button mode="contained" style={styles.settleButton}>
          Settle Up
        </Button>
      </Surface>

      <Card style={styles.section}>
        <Card.Title title="Upcoming Events" />
        <Card.Content>
          {upcomingEvents.map((event) => (
            <List.Item
              key={event.id}
              title={event.name}
              description={event.date}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={event.type === 'PGA' ? 'golf' : 'hockey-puck'}
                />
              )}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="Active Groups" />
        <Card.Content>
          {activeGroups.map((group) => (
            <List.Item
              key={group.id}
              title={group.name}
              description={`${group.members} members • ${group.activeEvents} active events`}
              left={(props) => (
                <List.Icon {...props} icon="account-group" />
              )}
            />
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  balance: {
    marginVertical: 8,
  },
  settleButton: {
    marginTop: 8,
  },
  section: {
    marginBottom: 16,
  },
});

export default Dashboard;
