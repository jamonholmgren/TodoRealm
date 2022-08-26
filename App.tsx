import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {todoContext} from './app/realm';
import {AppProvider, UserProvider} from '@realm/react';
import {TodoList} from './app/TodoList';
import secrets from './app/secrets';
import {LoginScreen} from './app/LoginScreen';
const {RealmProvider} = todoContext;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TodoList />
    </SafeAreaView>
  );
};

const AppWrapper = () => {
  return (
    <AppProvider id={secrets.atlasAppId}>
      <UserProvider fallback={<LoginScreen />}>
        <RealmProvider>
          <App />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AppWrapper;
