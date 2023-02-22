import React from 'react';
import OAuth from './oauthConfig';
import { AuthConfiguration } from 'react-native-app-auth';
import { RootProviders, RootStack, init } from '@lifeomic/react-native-sdk';

// Default LifeOmic app initialization (e.g. i18next, etc.)
init();

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

function App() {
  return (
    <RootProviders authConfig={authConfig}>
      <RootStack />
    </RootProviders>
  );
}

export default App;
