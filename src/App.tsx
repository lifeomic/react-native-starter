import React from 'react';
import { oauthConfig as OAuth, simpleTheme } from './config';
import { AuthConfiguration } from 'react-native-app-auth';
import {
  DeveloperConfigProvider,
  RootProviders,
  RootStack,
  init,
} from '@lifeomic/react-native-sdk';

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
  scopes: [
    'openid',
    'profile',
    // We must request this scope in order to get a refresh token,
    // and a refresh token is required for this app to function
    // as expected. So, provide it.
    'offline_access',
  ],
  usePKCE: true,
  additionalParameters: {
    // This value must be specified when we are requesting `offline_access`.
    // See for context: https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess
    prompt: 'consent',
  },
  iosPrefersEphemeralSession: true,
};

function App() {
  return (
    <DeveloperConfigProvider
      developerConfig={{
        simpleTheme,
      }}
    >
      <RootProviders authConfig={authConfig}>
        <RootStack />
      </RootProviders>
    </DeveloperConfigProvider>
  );
}

export default App;
