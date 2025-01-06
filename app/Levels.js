import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ref, get, set, getDatabase, update, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';

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
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Welcome');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const fetchProgress = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setLoading(false);
        return;
      }

      // Get all progress data at once instead of separate requests
      const progressRef = ref(database, `users/${userId}/progress`);
      const snapshot = await get(progressRef);
      const progressData = snapshot.val() || {};

      const levels = [];
      for (let level = 1; level <= 5; level++) {
        const levelKey = `level${level}`;
        const defaultData = {
          progress: 0,
          currentStep: 0,
          isActive: level === 1,
        };

        // If data doesn't exist, create it
        if (!progressData[levelKey]) {
          await set(
            ref(database, `users/${userId}/progress/${levelKey}`),
            defaultData
          );
        }

        const data = progressData[levelKey] || defaultData;

        levels.push({
          level,
          title: titles[level],
          progress: data.progress,
          isActive: data.isActive,
        });
      }

      setLevelsData(levels);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const progressRef = ref(database, `users/${userId}/progress`);
    const unsubscribe = onValue(progressRef, (snapshot) => {
      const progressData = snapshot.val() || {};

      const levels = [];
      for (let level = 1; level <= 5; level++) {
        const levelKey = `level${level}`;
        const data = progressData[levelKey] || {
          progress: 0,
          currentStep: 0,
          isActive: level === 1,
        };

        levels.push({
          level,
          title: titles[level],
          progress: data.progress,
          isActive: data.isActive,
        });
      }

      setLevelsData(levels);
    });

    return () => unsubscribe();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [])
  );

  const handleLevelPress = (level) => {
    navigation.navigate('Challenge', { level });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          levelsData.map((item) => (
            <LevelItem
              key={item.level}
              level={item.level}
              title={item.title}
              progress={item.progress}
              isActive={item.isActive}
              onPress={() => handleLevelPress(item.level)}
            />
          ))
        )}
        <Btn title="Logout" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  scrollView: {
    padding: 20,
  },
});

export default Levels;
