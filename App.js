import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feed from './Pages/Feed';
import Profile from './Pages/Profile';
import Encyclopedia from './Pages/Encyclopedia';
import Upload from './Pages/Upload';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Landing from './Pages/Landing';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs({onLogout}) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#45A9CD',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Encyclopedia"
        component={Encyclopedia}
        options={{
          tabBarLabel: 'Encyclopedia',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-page-variant-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      >
        {() => <Profile onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    // TODO: set up authentication
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    // TODO: set up authentication
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // TODO: set up authentication
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen 
          name=" "
          component={MyTabs}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
            {isLoggedIn ? <MyTabs onLogout={handleLogout} /> : <Landing onLogin={handleLogin} onSignUp={handleSignUp}/>}
      </Stack.Navigator>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7E8',
  },
});
