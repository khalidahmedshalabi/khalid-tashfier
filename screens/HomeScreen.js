import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import { NavigationActions } from 'react-navigation';

export default class HomeScreen extends React.Component {

  state = { token: 'No permissions' };

  componentDidMount () {
      AsyncStorage.getItem('token', (err, result) => {
          this.setState({token: result});
    });
  }

  logOut = () => {
      this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({ routeName: 'EntryScreen' })
          ]
      }));
  }

  render() {
      return (
        <View style={{ flex:1, flexDirection: 'column', justifyContent:'flex-start', padding:10, paddingTop: 15 }}>
            <Text style={{ marginBottom: 18, fontFamily: 'myfont' }}>
            مرحباً, لكي تستعرض باقي النقاط التى طُلبت فى التاسك اضغط على ايقونة القائمة بالاعلى
            </Text>

            <Text style={{ fontSize:32, marginBottom: 10, fontFamily: 'myfont', textAlign:'center' }}>
            او
            </Text>

            <TouchableOpacity onPress={this.logOut}
                style={{ padding:10, backgroundColor:'#007AFF', borderRadius:13, flexDirection:'row', justifyContent:'center' }}>
                <Text style={{ color:'white', fontFamily:'myfont' }}>تسجيل خروج</Text>
            </TouchableOpacity>
        </View>
      );
  }
}
