import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import CreateAccount from './CreateAccount';
import CragFinder from './CragFinder';
import Filters from './Filters';
import HomePage from './HomePage';
import StoreClimb from './StoreClimb';
import StoreClimbQueryViewer from './StoreClimbQueryViewer';


const Stack = createStackNavigator();



class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Create Account"
                component={CreateAccount}
            />
            <Stack.Screen
                name="Welcome"
                component={Welcome}
            />
            <Stack.Screen
                name="Crag Finder"
                component={CragFinder}
            />
            <Stack.Screen
                name="Filters"
                component={Filters}
            />
            <Stack.Screen
                name="HomePage"
                component={HomePage}
            />
            <Stack.Screen
                name="StoreClimb"
                component={StoreClimb}
            />
            <Stack.Screen
                name="StoreClimbQueryViewer"
                component={StoreClimbQueryViewer}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
export default App;
