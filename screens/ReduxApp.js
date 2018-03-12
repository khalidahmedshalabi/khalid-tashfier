import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

class ReduxApp extends Component {
  render() {
    return (
      <View>
        <Text style={{ color:'black', fontFamily:'myfont', marginBottom:15 }}>
        هذا مثال بسيط يوضح استخدام ريدكس
        </Text>

        <TouchableOpacity onPress={this.props.increment}
            style={{ padding:10, backgroundColor:'#007AFF', borderRadius:13, flexDirection:'row', justifyContent:'center' }}>
            <Text style={{ color:'white', fontFamily:'myfont' }}>زيادة</Text>
        </TouchableOpacity>

        <Text
          style={styles.counter}
          onPress={this.props.reset}>
          {this.props.count}
        </Text>

        <TouchableOpacity onPress={this.props.decrement}
            style={{ padding:10, backgroundColor:'#007AFF', borderRadius:13, flexDirection:'row', justifyContent:'center' }}>
            <Text style={{ color:'white', fontFamily:'myfont' }}>نقصان</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counter: {
    padding: 30,
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  count: state
})

const mapDispatchToProps = (dispatch) => ({
  increment: () => { dispatch({ type: 'INCREMENT' }) },
  decrement: () => { dispatch({ type: 'DECREMENT' }) },
  reset: () => { dispatch({ type: 'RESET' }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxApp)
