import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feed from './Pages/Feed';
import Profile from './Pages/Profile';
import Encyclopedia from './Pages/Encyclopedia';
import Upload from './Pages/Upload';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Landing from './Pages/Landing';
import Post from './Pages/Post';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('mydb.db');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const UploadStack = createNativeStackNavigator();

function MyTabs({navigation}) {
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
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}>
          {() => (
            <UploadStack.Navigator>
              <UploadStack.Screen name="Record" component={Upload} />
              <UploadStack.Screen name="Post" component={Post} />
            </UploadStack.Navigator>
          )}
          
        </Tab.Screen>
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
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App({navigation}) {

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, bird TEXT, description TEXT, imageUri TEXT);'
      );
    });
  }, []);

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Landing" component={Landing}/>
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen 
        name="MyTabs"
        component={MyTabs}
      />
      </Stack.Navigator>
    </NavigationContainer>
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
