import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatabase, ref, set } from 'firebase/database';
import PrgrsBar from '../components/atom/PrgrsBar';
import ArticleBtns from '../components/block/ArticleBtns';
import theme from '../constants/theme';

const levelData = {
  1: require('../assets/levels/level__1.json'),
  2: require('../assets/levels/level__2.json'),
  3: require('../assets/levels/level__3.json'),
  4: require('../assets/levels/level__4.json'),
  5: require('../assets/levels/level__5.json'),
};

const Challenge = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params;
  const [quizData, setQuizData] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [disabledButtons, setDisabledButtons] = useState([]);

  useEffect(() => {
    const loadQuizData = () => {
      try {
        const data = levelData[level];
        setQuizData(data);
      } catch (error) {
        console.error('Error loading quiz data:', error.message);
      }
    };

    loadQuizData();
  }, [level]);

  const handleCancel = () => {
    Alert.alert(
      'Cancel Challenge',
      'Are you sure you want to stop the challenge and go back?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.replace('Levels') },
      ]
    );
  };

  const handleAnswer = (selectedArticle) => {
    setInputValue(selectedArticle);
    const currentQuiz = quizData[currentQuizIndex];
    if (selectedArticle === currentQuiz.artikel) {
      const newProgress = (currentQuizIndex + 1) / 20;
      setProgress(newProgress);
      setCurrentQuizIndex(currentQuizIndex + 1);
      setInputValue('');
      setDisabledButtons([]);

      if (currentQuizIndex + 1 === 20) {
        const db = getDatabase();
        const progressRef = ref(db, `progress/level${level}`);
        set(progressRef, { progress: 1, currentStep: 20, isActive: true });
        navigation.replace('Congrats', { level });
      }
    } else {
      setDisabledButtons((prev) => [...prev, selectedArticle]);
      Alert.alert('Incorrect', 'The selected article is incorrect.');
    }
  };

  if (quizData.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentQuiz = quizData[currentQuizIndex];

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Cancel" onPress={handleCancel} />
      <PrgrsBar progress={progress} style={styles.progressBar} />
      <TextInput
        placeholder="d'Was?"
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.input}
        editable={false}
      />
      <Text style={styles.sentence}>{currentQuiz.satz}</Text>
      <View style={styles.buttonContainer}>
        {['der', 'die', 'das'].map((article) => (
          <Button
            key={article}
            title={article}
            onPress={() => handleAnswer(article)}
            disabled={disabledButtons.includes(article)}
          />
        ))}
      </View>
    </SafeAreaView>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Challenge;
