import React, { useEffect, useState } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import {
  registerDeviceToken,
  requestNotificationsPermissions,
  onNotificationOpened,
  getInitialNotification,
  useHttpClient,
  useActiveAccount,
  onNotificationReceived,
} from '@lifeomic/react-native-sdk';
import { Notifications, Notification } from 'react-native-notifications';

type EventType = 'notificationReceived' | 'notificationOpened';

type Event = {
  type: EventType;
  notification: Notification;
};

export const NotificationsScreen = () => {
  const [deviceToken, setDeviceToken] = useState<string | undefined>();
  const [events, setEvents] = useState<Event[]>([]);
  const { httpClient } = useHttpClient();
  const { account } = useActiveAccount();

  const sendLocalNotification = () => {
    Notifications.postLocalNotification({
      body: 'Local notification!',
      title: 'Local Notification Title',
      sound: 'chime.aiff',
      badge: 0,
      type: '',
      thread: '',
      payload: {
        category: 'SOME_CATEGORY',
        link: 'localNotificationLink',
      },
      //@ts-ignore
      android_channel_id: 'starter-app-channel',
    });
  };

  const renderOpenedNotification = (notification: Notification) => {
    return (
      <View style={{ backgroundColor: 'lightgray', margin: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>Notification Opened</Text>
        <Text>{`Title: ${notification.title}`}</Text>
        <Text>{`Body: ${notification.body}`}</Text>
        <Text>{`Link: ${notification.payload.payload.link}`}</Text>
      </View>
    );
  };

  const renderReceivedNotification = (notification: Notification) => {
    return (
      <View style={{ backgroundColor: 'lightblue', margin: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>Notification Received</Text>
        <Text>{`Title: ${notification.title}`}</Text>
        <Text>{`Body: ${notification.body}`}</Text>
        <Text>{`Link: ${notification.payload.payload.link}`}</Text>
      </View>
    );
  };

  const renderEvent = (event: Event) => {
    if (event.type === 'notificationReceived') {
      return renderReceivedNotification(event.notification);
    }
    return renderOpenedNotification(event.notification);
  };

  // Request the permissions to receive notifications
  useEffect(() => {
    requestNotificationsPermissions(({ deviceToken, denied, error }) => {
      if (deviceToken && account) {
        setDeviceToken(deviceToken);

        // Register the device with the LifeOmic platform to start receiving push notifications
        registerDeviceToken({
          deviceToken,
          // TODO: update the application when the background allows BMAs
          application: 'lifeResearch', // The application name will be provided by LifeOmic upon onboarding
          httpClient,
          //@ts-ignore
          accountId: account.id,
        });
      }
    });
  }, [account]);

  // Set the notification channel for Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannel({
        channelId: 'bma-example-channel',
        name: 'BMA Example',
        importance: 5,
        description: 'Channel for the BMA example',
        enableLights: true,
        enableVibration: true,
        showBadge: true,
        vibrationPattern: [200, 1000, 500, 1000, 500],
      });
    }
  }, []);

  useEffect(() => {
    // Handler called when a notification is pressed
    onNotificationOpened((notification) => {
      setEvents((events) => [
        { type: 'notificationOpened', notification },
        ...events,
      ]);
    });

    onNotificationReceived((notification) => {
      setEvents((events) => [
        { type: 'notificationReceived', notification },
        ...events,
      ]);
    });

    const getInitial = async () => {
      // Get the notification that opened the application
      // Note: this needs to the be on first screen during app startup to work
      const notification = await getInitialNotification();
      if (notification) {
        setEvents((events) => [
          { type: 'notificationOpened', notification },
          ...events,
        ]);
      }
    };

    getInitial();
  }, []);

  return (
    <View>
      <Text style={{ margin: 10 }}>Device Token: {deviceToken}</Text>

      <Button
        title={'Send local notification'}
        onPress={sendLocalNotification}
      />

      {events.map((event, idx) => (
        <View key={`event${idx}`}>{renderEvent(event)}</View>
      ))}
    </View>
  );
};
