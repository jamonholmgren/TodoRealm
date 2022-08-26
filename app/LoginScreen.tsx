import React from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';

import {useApp} from '@realm/react';

export const LoginScreen = () => {
  const realmApp = useApp();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = React.useCallback(
    async (newEmail: string, newPassword: string) => {
      const credentials = Realm.Credentials.emailPassword(
        newEmail,
        newPassword,
      );

      try {
        // sign in
        await realmApp.logIn(credentials);
      } catch (error) {
        // sign up instead
        try {
          await realmApp.emailPasswordAuth.registerUser({
            email: newEmail,
            password: newPassword,
          });
        } catch (error) {
          console.log(error);
        }

        // sign in again
        await realmApp.logIn(credentials);
      }
    },
    [realmApp],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 30}}>
        <Text style={$text}>Login Screen</Text>
        <TextInput
          style={$input}
          placeholder="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={$input}
          placeholder="password"
          textContentType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => login(username, password)}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const $text: TextStyle = {
  fontSize: 24,
};

const $input: TextStyle = {
  fontSize: 24,
  paddingVertical: 12,
};
