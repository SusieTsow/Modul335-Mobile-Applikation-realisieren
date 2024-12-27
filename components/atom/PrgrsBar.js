import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../constants/theme';

const PrgrsBar = ({ progress, style, totalSteps = 20 }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]}>
        <View
          style={[styles.highlight, { width: `${progress * 100}% - 10px` }]}
        />
      </View>
    </View>
  );
};

PrgrsBar.propTypes = {
  progress: PropTypes.number.isRequired, // Value between 0 and 1
  style: PropTypes.object,
  totalSteps: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: '100%',
    backgroundColor: theme.colors.oat_300,
    borderRadius: theme.btnBorder.default.borderRadius,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progress: {
    height: '100%',
    backgroundColor: theme.colors.honey_500,
    borderRadius: theme.btnBorder.default.borderRadius,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
  },
  highlight: {
    height: '20%',
    backgroundColor: theme.colors.ferret,
    opacity: 0.2,
    borderRadius: theme.btnBorder.default.borderRadius,
    marginHorizontal: 5,
    top: -2,
  },
});

export default PrgrsBar;
