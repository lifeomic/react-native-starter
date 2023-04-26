import React from 'react';
import { Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  SettingsStack,
  SettingsStackParamList,
  HomeStack,
} from '@lifeomic/react-native-sdk';
import { NotificationsStack } from './NotificationsStack';

export type TabParamList = {
  HomeTab: undefined;
  NotificationsTab: undefined;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator shifting={true}>
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsStack}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: () => <Text>🛎️</Text>,
        }}
      />

      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => <Text>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
