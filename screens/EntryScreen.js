import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import AuthScreen from './containers/AuthScreen'

/**
 * The root component of the application.
 * In this component I am handling the entire application state, but in a real app you should
 * probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
 */
export class EntryScreen extends Component {
    static navigationOptions = {
      header: null,
    };

    componentWillMount() {
        if(!firebase.apps.length)
        {
            firebase.initializeApp({
                apiKey: 'AIzaSyDGrAsyKq2XlPi_UDxjSoyMWe9bJMthyDM',
                authDomain: 'khalid-tashfier.firebaseapp.com',
                databaseURL: 'https://khalid-tashfier.firebaseio.com',
                projectId: 'khalid-tashfier',
                storageBucket: 'khalid-tashfier.appspot.com',
                messagingSenderId: '453380982015'
            });
        }
    };

  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?
  }

  /**
   * Two login function that waits 1000 ms and then authenticates the user succesfully.
   * In your real app they should be replaced with an API call to you backend.
   */
  _simulateLogin = (email, password) => {
    this.setState({ isLoading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => { setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000) })
        .catch((error) => {
            alert(error);
            this.setState({ isLoading: false });
        });
  }

  _simulateSignup = (email, password, fullName) => {
    this.setState({ isLoading: true })

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => { setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000) })
        .catch((error) => {
            alert(error);
            this.setState({ isLoading: false });
        });
  }

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  render () {
    return (
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => {
            this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
            NavigationActions.navigate({ routeName: 'DrawerStack' })
            ]
            }));
          } }
        />
      )
  }
}

export default EntryScreen
