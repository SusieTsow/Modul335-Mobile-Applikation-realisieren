import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Btn from '../components/atom/Btn';
import theme from '../constants/theme';

const Levels = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Welcome'); // Redirect to Login screen
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Levels!</Text>
      {
        //TODO: Add levels components here
      }
      <Btn title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.squirrel,
    fontFamily: theme.font.fontFamily,
    fontWeight: theme.font.fontWeight.bold,
  },
});

export default Levels;
