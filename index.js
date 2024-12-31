import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from './app/App';
import Levels from './app/Levels';

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ECE1D8',
            shadowColor: '#e4d5c8',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 5,
          },
          headerTintColor: '#863758',
          headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Nunito' },
        }}
      >
        <Stack.Screen name="Welcome" component={App} />
        <Stack.Screen name="Levels" component={Levels} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(AppWrapper);
