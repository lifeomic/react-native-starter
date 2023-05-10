# react-native-starter

This repo demonstrates utilizing [@lifeomic/react-native-sdk] for a branded app.

## Getting Started

- `yarn install`
- `bundle install && cd ios && bundle exec pod install && cd ../`
- `yarn start`
- type `i` or `a` to run on either platform

## Where to look

We generated this app by running `npx react-native init StarterApp`. There are a
lot of files and config here, but it's important to understand that 99% of that
is boilerplate react-native. You might want to focus in on the files in the
`src` directory - which should be minimal. With the shell of a react-native app
and `@lifeomic/react-native-sdk` (and its peer dependencies), you can have an
app running locally in minutes.

[@lifeomic/react-native-sdk]: https://github.com/lifeomic/react-native-sdk

## Registering your device to recieve push notifications

We use the `react-native-notifications` library for all of our notifications
handling in this application: https://github.com/wix/react-native-notifications

#### Android

This guide provides the necessary steps to get push notifications working on
android devices:
https://wix.github.io/react-native-notifications/docs/installation-android

#### iOS

This guide provides the necessary steps to get push notifications working on iOS
devices: https://wix.github.io/react-native-notifications/docs/installation-ios

In addition, it is necessary to allow push notification entitlement/capabilities
through XCode. Official documentation:
https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns

- Start by signing in to your Apple Developer account and navigating to the
  Certificates, Identifiers & Profiles section.
- Create an App ID for your application if you haven't already done so. Make
  sure the App ID has the "Push Notifications" capability enabled.
- Generate a push notification SSL certificate, either for development or
  production, and download it.
- In Xcode, open your project and select the target for your app.
- Go to the "Signing & Capabilities" tab in the project settings.
- Click the "+ Capability" button and select "Push Notifications" from the list.
- Xcode will automatically enable the necessary entitlements and prompt you to
  upload the push notification certificate (.p12 file) you generated earlier.
- Provide the certificate password, if required, and Xcode will configure the
  necessary settings for push notifications.
- With the properly set up push notification code, your app should now be ready
  to recieve push notifications
