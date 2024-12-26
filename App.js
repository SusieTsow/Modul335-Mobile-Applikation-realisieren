import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, View } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import theme from './constants/theme'; 
import ArticleBtns from './components/block/ArticleBtns';
import Btn from './components/atom/Btn';
import PrgrsBar from './components/atom/PrgrsBar';

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito-VariableFont_wght.ttf'),
  });

  const [progress, setProgress] = useState(0); // Example progress value
  const [currentStep, setCurrentStep] = useState(0); // Current step value

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const increaseProgress = () => {
    const newStep = currentStep + 1;
    if (newStep <= 20) {
      setCurrentStep(newStep);
      setProgress(newStep / 20);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>dWas, ein kleines Spiel zum Üben der deutschen bestimmten Artikel.</Text>
      <StatusBar style="auto" />
      <ArticleBtns />
      <View style={styles.progressContainer}>
        <PrgrsBar progress={progress} style={styles.progressBar} />
        <Text style={styles.stepText}>{currentStep}/20</Text>
      </View>
      <Btn title="INCREASE PROGRESS" onPress={increaseProgress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.title,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
    marginHorizontal: theme.marginHorizontal.default,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
  progressBar: {
    flex: 1,
    marginRight: 10,
  },
  stepText: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
  },
});