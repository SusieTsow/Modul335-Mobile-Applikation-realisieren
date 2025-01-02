import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import PrgrsBar from '../atom/PrgrsBar';
import theme from '../../constants/theme';

const shields = {
  1: {
    default: require('../../assets/shields/level__1__default.png'),
    active: require('../../assets/shields/level__1__active.png'),
  },
  2: {
    default: require('../../assets/shields/level__2__default.png'),
    active: require('../../assets/shields/level__2__active.png'),
  },
  3: {
    default: require('../../assets/shields/level__3__default.png'),
    active: require('../../assets/shields/level__3__active.png'),
  },
  4: {
    default: require('../../assets/shields/level__4__default.png'),
    active: require('../../assets/shields/level__4__active.png'),
  },
  5: {
    default: require('../../assets/shields/level__5__default.png'),
    active: require('../../assets/shields/level__5__active.png'),
  },
};

const LevelItem = ({ level, title, progress, isActive, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={isActive ? shields[level].active : shields[level].default}
        style={styles.shield}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <PrgrsBar progress={progress} style={styles.progressBar} />
      </View>
    </TouchableOpacity>
  );
};

LevelItem.propTypes = {
  level: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  shield: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.oat_300,
  },
});

export default LevelItem;
