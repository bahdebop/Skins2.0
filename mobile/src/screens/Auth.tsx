import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  useTheme,
  SegmentedButtons,
} from 'react-native-paper';
import { signIn, signUp } from '../../../shared/api/supabase';

const Auth = () => {
  const theme = useTheme();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        else {
          setError('Please check your email for verification link');
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Surface style={styles.surface} elevation={2}>
        <Text variant="headlineMedium" style={styles.title}>
          Skins 2.0
        </Text>

        <SegmentedButtons
          value={mode}
          onValueChange={setMode}
          buttons={[
            { value: 'login', label: 'Login' },
            { value: 'register', label: 'Register' },
          ]}
          style={styles.segment}
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          style={styles.button}
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  surface: {
    padding: 20,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  segment: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Auth;
