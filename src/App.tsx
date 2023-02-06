import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import OAuth from './oauthConfig';
import { AuthConfiguration } from 'react-native-app-auth';
import {
  AuthContextProvider,
  OAuthContextProvider,
  OAuthLoginButton,
  OAuthLogoutButton,
  useAuth,
} from '@lifeomic/react-native-components';

const authConfig: AuthConfiguration = {
  clientId: OAuth.clientId,
  redirectUrl: OAuth.redirectUrl,
  serviceConfiguration: {
    authorizationEndpoint: OAuth.authorizationEndpoint,
    tokenEndpoint: OAuth.tokenEndpoint,
    revocationEndpoint: OAuth.revokeEndpoint,
  },
  scopes: ['openid', 'profile'],
  usePKCE: true,
};

const App: FC = () => {
  const { buttonStyle, textStyle } = styles;

  return (
    <SafeAreaView>
      <AuthContextProvider>
        <IsSignedIn />
        <OAuthContextProvider authConfig={authConfig}>
          <OAuthLoginButton
            onSuccess={noop}
            onFail={onFail}
            style={buttonStyle}
          >
            <Text style={textStyle}>Login</Text>
          </OAuthLoginButton>
          <OAuthLogoutButton
            onSuccess={noop}
            onFail={onFail}
            style={buttonStyle}
          >
            <Text style={textStyle}>Logout</Text>
          </OAuthLogoutButton>
        </OAuthContextProvider>
      </AuthContextProvider>
    </SafeAreaView>
  );
};

const IsSignedIn: FC = () => {
  const { isLoggedIn, authResult } = useAuth();
  return (
    <Text>
      {isLoggedIn
        ? `Logged in until ${authResult?.accessTokenExpirationDate}`
        : 'Logged out'}
    </Text>
  );
};

const noop = () => {};
const onFail = console.error;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: 40,
    backgroundColor: '#e3e3e3',
    marginTop: 40,
    paddingTop: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
});

export default App;
