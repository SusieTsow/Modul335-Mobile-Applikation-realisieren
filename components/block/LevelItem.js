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
  const [progress, setProgress] = useState(0); // Example progress value
  const [currentStep, setCurrentStep] = useState(0); // Current step value

  const increaseProgress = () => {
    const newStep = currentStep + 1;
    if (newStep <= 20) {
      setCurrentStep(newStep);
      setProgress(newStep / 20);
    }
  };

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
