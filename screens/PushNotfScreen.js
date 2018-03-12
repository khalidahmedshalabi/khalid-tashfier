import React from 'react';
import {
    View,
    TextInput,
    Text,
    AsyncStorage,
    Linking
} from 'react-native';

export default class PushNotfScreen extends React.Component {

  state = { token: 'No permissions' };

  componentDidMount () {
      AsyncStorage.getItem('token', (err, result) => {
          this.setState({token: result});
    });
  }

  render() {
      return (
        <View style={{ flex:1, flexDirection: 'column', justifyContent:'flex-start', padding:7, paddingTop: 15 }}>
            <Text style={{ marginBottom: 10, fontFamily: 'myfont' }}>
                انسخ التوكن التى باللون الاخضر كاملةً لكى تستخدمها على الموقع التالى

                <Text style={{color: 'blue'}}
                      onPress={() => Linking.openURL('https://expo.io/dashboard/notifications')}>
                  https://expo.io/dashboard/notifications
                </Text>
            </Text>

            <TextInput
                style={{ color:'green' }}
                underlineColorAndroid ='transparent'
                value={this.state.token}
                editable={true}
            />
        </View>
      );
  }
}
