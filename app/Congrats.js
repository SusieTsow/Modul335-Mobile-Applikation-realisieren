import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Btn from '../components/atom/Btn';
import theme from '../constants/theme';

const shields = {
  1: require('../assets/shields/level__1__active.png'),
  2: require('../assets/shields/level__2__active.png'),
  3: require('../assets/shields/level__3__active.png'),
  4: require('../assets/shields/level__4__active.png'),
  5: require('../assets/shields/level__5__active.png'),
};

const Congrats = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params;

  return (
    <View style={styles.container}>
      <Image source={shields[level]} style={styles.image} />
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
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.title,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
    marginBottom: 20,
  },
});

export default Congrats;
