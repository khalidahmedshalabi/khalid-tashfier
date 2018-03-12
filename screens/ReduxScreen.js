import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Provider, connect } from 'react-redux';
import store from '../redux/store.js';
import ReduxApp from './ReduxApp';

export default class ReduxScreen extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ReduxApp />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
