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

#### Android

Add Firebase to your android project:
https://firebase.google.com/docs/android/setup

#### iOS

Allow push notification entitlement/capabilities through XCode:
https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns

After generating your certificates for either platform, you can collaborate with
LifeOmic to share these certificates and enable push notifications in your
project.
