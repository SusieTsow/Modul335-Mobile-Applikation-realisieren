import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get, set } from 'firebase/database';

import Btn from '../components/atom/Btn';
import LevelItem from '../components/block/LevelItem';
import theme from '../constants/theme';

const titles = {
  1: 'Literatur und Sprache',
  2: 'Biologie und Natur',
  3: 'Technologie und Wissenschaft',
  4: 'Kunst und Kultur',
  5: 'Essen und Trinken',
};

const Levels = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [levelsData, setLevelsData] = useState([]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Welcome'); // Redirect to Login screen
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  useEffect(() => {
    const fetchProgress = async () => {
      const db = getDatabase();
      const levels = [];
      for (let level = 1; level <= 5; level++) {
        const progressRef = ref(db, `progress/level${level}`);
        const snapshot = await get(progressRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          levels.push({
            level,
            title: titles[level],
            progress: data.progress,
            isActive: data.isActive,
          });
        } else {
          levels.push({
            level,
            title: titles[level],
            progress: 0,
            isActive: false,
          });
        }
      }
      setLevelsData(levels);
    };
    fetchProgress();
  }, []);

  const handleLevelPress = async (level) => {
    const db = getDatabase();
    const progressRef = ref(db, `progress/level${level}`);
    const snapshot = await get(progressRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const newStep = data.currentStep + 1;
      if (newStep <= 20) {
        const newProgress = newStep / 20;
        await set(progressRef, {
          progress: newProgress,
          currentStep: newStep,
          isActive: true,
        });
        setLevelsData((prevLevels) =>
          prevLevels.map((item) =>
            item.level === level
              ? { ...item, progress: newProgress, isActive: true }
              : item
          )
        );
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {levelsData.map((item) => (
        <LevelItem
          key={item.level}
          level={item.level}
          title={item.title}
          progress={item.progress}
          isActive={item.isActive}
          onPress={() => handleLevelPress(item.level)}
        />
      ))}
      <Btn title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
});

export default Levels;
