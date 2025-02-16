import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Auth from '../screens/Auth';
import Dashboard from '../screens/Dashboard';
import Events from '../screens/Events';
import Groups from '../screens/Groups';
import Profile from '../screens/Profile';
import { useAppSelector } from '../../../shared/store/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="view-dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="golf" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account-group" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated);

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
