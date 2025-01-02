import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Btn from '../components/atom/Btn';
import theme from '../constants/theme';

const Congrats = () => {
  const navigation = useNavigation();
  console.log(navigation);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/congrats.png')} style={styles.image} />
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.subtitle}>You have completed all levels!</Text>
      <Btn title="weiter" onPress={() => navigation.replace('Welcome')} />
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
  subtitle: {
    fontSize: 18,
    color: theme.colors.squirrel,
    fontFamily: theme.font.fontFamily,
    fontWeight: theme.font.fontWeight.regular,
  },
});

export default Congrats;
