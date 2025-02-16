import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../../shared/store/store';
import Navigation from './navigation';
import theme from './theme';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
