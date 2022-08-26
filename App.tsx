import React, {useEffect} from 'react';
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

import {AppProvider, UserProvider, useUser} from '@realm/react';
import {TodoList} from './app/TodoList';
import secrets from './app/secrets';
import {LoginScreen} from './app/LoginScreen';

import {todoContext} from './app/realm';
const {RealmProvider, useRealm} = todoContext;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const user = useUser()!;
  const realm = useRealm();

  useEffect(() => {
    realm.subscriptions.update(subs => {
      subs.add(realm.objects('Todo').filtered('_real_owner_id = $0', user.id), {
        name: 'TodoSubscription',
      });
    });

    return () => {
      realm.subscriptions.update(subs => {
        subs.removeByName('TodoSubscription');
      });
    };
  }, [realm, user]);

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
        <RealmProvider sync={{flexible: true}}>
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
