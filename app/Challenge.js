import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatabase, ref, set } from 'firebase/database';

import PrgrsBar from '../atom/PrgrsBar';
import ArticleBtns from '../components/block/ArticleBtns';
import theme from '../constants/theme';

const Challenge = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params;
  const [quizData, setQuizData] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  cosnt[(inputValue, setInputValue)] = useState('');

  useEffect(() => {
    const loadQuizData = async () => {
      const response = await fetch(`../assets/levels/level__${level}.json`);
      const data = await response.json();
      setQuizData(data);
    };
    loadQuizData();
  }, [level]);

  const handleCancel = () => {
    Alert.alert(
      'Cancel Challenge',
      'Are you sure you want to stop the challenge and go back?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => navigation.replace('Levels') },
      ]
    );
  };

  const handleAnswer = (selectedArticle) => {
    const currentQuiz = quizData[currentQuizIndex];
    if (selectedArticle === currentQuiz.artikel) {
      const newProgress = (currentQuizIndex + 1) / 20;
      setProgress(newProgress);
      setCurrentQuizIndex(currentQuizIndex + 1);
      setInputValue('');

      if (currentQuizIndex + 1 === 20) {
        const db = getDatabase();
        const progressRef = ref(db, `progress/level${level}`);
        set(progressRef, { progress: 1, currentStep: 20, isActive: true });
        navigation.replace('Congrats');
      }
    } else {
      Alert.alert('Incorrect', 'The selected article is incorrect.');
    }
  };

  if (quizData.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentQuiz = quizData[currentQuizIndex];

  return (
    <View style={styles.container}>
      <Button title="Cancel" onPress={handleCancel} />
      <PrgrsBar progress={progress} style={styles.progressBar} />
      <TextInput
        placeholder="d'Was?"
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.input}
      />
      <Text style={styles.sentence}>{currentQuiz.satz}</Text>
      <ArticleBtns onPress={handleAnswer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    padding: 20,
  },
  progressBar: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: theme.colors.oat_300,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sentence: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
    marginBottom: 20,
  },
});

export default Challenge;
