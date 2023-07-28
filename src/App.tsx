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
  scopes: ['openid', 'profile'],
  usePKCE: true,
  additionalParameters: {
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
