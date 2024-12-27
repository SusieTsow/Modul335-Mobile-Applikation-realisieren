import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PrgrsBar from '../atom/PrgrsBar';
import theme from '../../constants/theme';

const LevelItem = ({
  title,
  type = 'disable',
  disable = true,
  level,
  progress,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/level.png')} style={styles.image} />
      <View>
        <PrgrsBar progress={progress} style={styles.progressBar} />
      </View>
    </View>
  );
};

export default LevelItem;
