import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from './app/App';
import Levels from './app/Levels';
import Challenge from './app/Challenge';
import Congrats from './app/Congrats';

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={App} />
        <Stack.Screen name="Levels" component={Levels} />
        <Stack.Screen name="Challenge" component={Challenge} />

        <Stack.Screen name="Congrats" component={Congrats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(AppWrapper);
