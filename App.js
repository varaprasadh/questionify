import React from 'react';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';
import Home from './screens/Home';
import { Label } from './screens/components/Global_Components';
import {createAppContainer,createStackNavigator,createDrawerNavigator} from 'react-navigation';
import TestBoard from './screens/TestBoard';
import { URL, URLSearchParams } from 'whatwg-url';
import { Buffer } from 'buffer';

global.Buffer = Buffer;
global.URL = URL;
global.URLSearchParams = URLSearchParams;

const drawer=createDrawerNavigator({
  Home:Home
},{
 
});
const root = createStackNavigator(
            {
              Home: drawer,
              TestBoard:TestBoard
            }, {
              initialRouteName: "Home",
              headerMode:"none"
            });
const AppContainer=createAppContainer(root);
export default class App extends React.Component{

   static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }
  
 
  render(){
      return (
      <View style={styles.container}>
       <AppContainer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
