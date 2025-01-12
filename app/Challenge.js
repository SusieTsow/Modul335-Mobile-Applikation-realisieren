import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatabase, ref, set, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
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
  const auth = getAuth();
  const [quizData, setQuizData] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // Initialize currentStep state

  useEffect(() => {
    const loadQuizData = () => {
      try {
        const data = levelData[level];
        setQuizData(data);
      } catch (error) {
        console.error('Fehler beim Laden der Quizdaten:', error.message);
      }
    };

    loadQuizData();
  }, [level]);

  const handleCancel = () => {
    Alert.alert(
      'Herausforderung abbrechen',
      'Bist du sicher, dass du die Herausforderung beenden und zurückgehen möchtest?',
      [
        { text: 'Nein', style: 'cancel' },
        { text: 'Ja', onPress: () => navigation.replace('Levels') },
      ]
    );
  };

  const handleAnswer = (selectedArticle) => {
    setInputValue(selectedArticle);
    const currentQuizItem = quizData[currentQuizIndex];

    if (selectedArticle === currentQuizItem.artikel) {
      const newProgress = (currentQuizIndex + 1) / 20;
      setProgress(newProgress);
      setCurrentQuizIndex(currentQuizIndex + 1);
      setCurrentStep(currentStep + 1); // Update currentStep state
      setInputValue('');
      setDisabledButtons([]);

      if (currentQuizIndex + 1 === 20) {
        const db = getDatabase();
        const userId = auth.currentUser.uid;

        // Update progress and activate next level
        const updates = {};
        updates[`users/${userId}/progress/level${level}`] = {
          progress: 1,
          currentStep: 20,
          isActive: true,
        };

        // If not the last level, activate the next one
        if (level < 5) {
          updates[`users/${userId}/progress/level${level + 1}`] = {
            progress: 0,
            currentStep: 0,
            isActive: true,
          };
        }

        // Update multiple paths atomically
        update(ref(db), updates);

        // Navigate to congrats page
        navigation.replace('Congrats', { level });
      }
    } else {
      setDisabledButtons((prev) => [...prev, selectedArticle]);
      Alert.alert('Falsch', 'Der gewählte Artikel ist falsch.');
    }
  };

  if (quizData.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentQuiz = quizData[currentQuizIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={handleCancel}>
          <Image
            source={require('../assets/symbols/cancel.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <PrgrsBar progress={progress} style={styles.progressBar} />
        <Text style={styles.stepText}>{currentStep}/20</Text>
      </View>
      <View style={styles.quiz}>
        <Text style={styles.sentence}>
          <TextInput
            placeholder="d'Was?"
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
            editable={false}
          />
          {currentQuiz.satz}
        </Text>
      </View>

      <ArticleBtns
        onPress={handleAnswer}
        disabledButtons={disabledButtons}
        style={styles.artikelBtns}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    gap: 15,
  },
  icon: {
    width: 16,
    height: 16,
  },
  progressBar: {
    marginVertical: 20,
    width: 270,
  },
  stepText: {
    fontFamily: theme.font.fontFamily,
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
  },
  quiz: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  sentence: {
    fontFamily: theme.font.fontFamily,
    fontSize: theme.font.fontSizes.quiz,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
    lineHeight: 44,
  },
  input: {
    width: 115,
    height: 44,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.oat_100,
    marginRight: 10,

    borderWidth: 2,
    borderColor: theme.colors.oat_300,
    borderRadius: 50,

    fontFamily: theme.font.fontFamily,
    fontSize: theme.font.fontSizes.quiz,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
  },
});

export default Challenge;
