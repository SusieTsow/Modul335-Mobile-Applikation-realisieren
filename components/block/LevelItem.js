import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

import shields from '../../assets';
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
      <Image source={shields[level]} style={styles.shield} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <PrgrsBar progress={progress} style={styles.progressBar} />
      </View>
    </View>
  );
};

export default LevelItem;
