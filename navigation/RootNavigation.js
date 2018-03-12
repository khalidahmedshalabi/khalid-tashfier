import { Notifications } from 'expo';
import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import EntryScreen from '../screens/EntryScreen';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import PushNotfScreen from '../screens/PushNotfScreen';
import ReduxScreen from '../screens/ReduxScreen';

const DrawerStack = DrawerNavigator({
    'الرئيسية': { screen: HomeScreen },
    'الاشعارات': { screen: PushNotfScreen },
    'الخريطة': { screen: MapScreen },
    'ريدكس': { screen: ReduxScreen },
})

const RootStackNavigator = StackNavigator(
    {
        EntryScreen: { screen: EntryScreen },
        DrawerStack: { screen: DrawerStack },
    },
    {
        headerMode: 'float',
        navigationOptions: ({navigation}) => ({
            headerStyle: {backgroundColor: 'white', height: (Platform.OS === 'ios') ? 40 : 28 },
            title: null,
            headerLeft: <TouchableOpacity
                 onPress={() => navigation.navigate('DrawerToggle')}>
                <Ionicons
                  name={'md-menu'}
                  size={30}
                  style={{ marginLeft: 10, marginBottom:12, marginTop: (Platform.OS === 'ios') ? 8 : 0 }}
                  color='#007AFF'
                />
            </TouchableOpacity>
        })
    }
);


export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
