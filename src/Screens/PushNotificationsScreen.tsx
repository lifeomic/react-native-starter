import {
  getInitialNotification,
  isRegisteredForNotifications,
  onNotificationOpened,
  onNotificationReceived,
  requestNotificationsPermissions,
} from '@lifeomic/react-native-sdk';
import { useEffect } from 'react';
import { Notifications } from 'react-native-notifications';
import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 100,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4287f5',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
});

export const PushNotificationsScreen = () => {
  const sendLocalNotification = () => {
    const notification = Notifications.postLocalNotification({
      body: 'Local notification!',
      title: 'Local Notification Title',
      sound: 'chime.aiff',
      //@ts-ignore
      silent: false,
      category: 'SOME_CATEGORY',
      userInfo: {},
    });

    console.log('local: ', notification);
  };

  useEffect(() => {
    requestNotificationsPermissions(({ deviceToken, denied, error }) => {
      console.log({ deviceToken, denied, error });
    });

    onNotificationReceived((notification) => {
      console.log({ receivedNotification: notification });
      console.warn({ receivedNotification: JSON.stringify(notification) });
    });

    onNotificationOpened((notification) => {
      console.log({ openedNotification: notification });
      console.warn({ openedNotification: JSON.stringify(notification) });
    });

    const getInitial = async () => {
      const notification = await getInitialNotification();
      console.log({ initialNotification: notification });
      if (notification) {
        console.warn({ initialNotification: JSON.stringify(notification) });
      }
    };

    const isRegistered = async () => {
      const res = await isRegisteredForNotifications();
      console.log({ isRegistered: res });
    };

    getInitial();
    isRegistered();
  }, []);

  return (
    <Pressable style={styles.button} onPress={sendLocalNotification}>
      <Text style={styles.text}>Send Local</Text>
    </Pressable>
  );
};
