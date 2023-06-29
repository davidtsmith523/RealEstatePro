import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PropertiesScreen from './screens/PropertiesScreen';
import HoursLoggedScreen from './screens/HoursLoggedScreen';
import InfoScreen from './screens/InfoScreen';

const propertiesName = 'Properties';
const hoursLoggedName = 'Hours Logged';
const infoName = 'Info';

const Tab = createBottomTabNavigator();



export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName={propertiesName}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'lightcoral',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            display: 'flex',
          },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn == propertiesName) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (rn === hoursLoggedName) {
            iconName = focused ? 'time' : 'time-outline'
          } else if (rn === infoName) {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        },
        
      })}
      >
        <Tab.Screen name= {infoName} component={InfoScreen}/>
        <Tab.Screen name= {propertiesName} component={PropertiesScreen}/>
        <Tab.Screen name= {hoursLoggedName} component={HoursLoggedScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}