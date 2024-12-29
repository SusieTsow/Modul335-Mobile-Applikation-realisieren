import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import theme from '../constants/theme';
import ArticleBtns from '../components/block/ArticleBtns';
import Btn from '../components/atom/Btn';
import PrgrsBar from '../components/atom/PrgrsBar';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito: require('../assets/fonts/Nunito-VariableFont_wght.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [progress, setProgress] = useState(0); // Example progress value
  const [currentStep, setCurrentStep] = useState(0); // Current step value

  if (!fontsLoaded) {
    return null;
  }

  const increaseProgress = () => {
    const newStep = currentStep + 1;
    if (newStep <= 20) {
      setCurrentStep(newStep);
      setProgress(newStep / 20);
    }
  };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.text}>
        dWas, ein kleines Spiel zum Üben der deutschen bestimmten Artikel.
      </Text>
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
