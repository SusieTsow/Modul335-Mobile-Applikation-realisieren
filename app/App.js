import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from '../firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

import theme from '../constants/theme';
import Btn from '../components/atom/Btn';

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Nunito: require('../assets/fonts/Nunito-VariableFont_wght.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null); // Track the logged-in user

  const navigation = useNavigation();

  // Firebase Authentication State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user on authentication state change
        navigation.replace('Levels'); // Redirect to Levels screen if logged in
      } else {
        setUser(null); // Reset user if not logged in
      }
    });

    // Cleanup on unmount
    return unsubscribe;
  }, [auth, navigation]);

  // Prevent splash screen from auto-hiding until fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleAuth = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (isLogin) {
      // Login Logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Success', `Welcome back ${user.email}`);
          navigation.replace('Levels'); // Navigate to Levels after login
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert('Error', errorMessage);
        });
    } else {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Success', `Account created for ${user.email}`);
          navigation.replace('Levels'); // Navigate to Levels after sign-up
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert('Error', errorMessage);
        });
    }
  };

  // If fonts are not loaded, prevent the app from rendering
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <View>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.image}
        />
        <Text style={styles.text}>
          ein kleines Spiel zum Üben der deutschen bestimmten Artikel
        </Text>
      </View>
      <View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor={theme.colors.oat_300}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor={theme.colors.oat_300}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Btn title={isLogin ? 'Login' : 'Sign Up'} onPress={handleAuth} />

      <View>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? 'Need an account? Sign Up'
            : 'Already have an account? Login'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 'auto',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
    marginHorizontal: theme.marginHorizontal.default,
    marginBottom: 20,
  },
  input: {
    width: 320,
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.oat_100,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: theme.colors.oat_300,
    borderRadius: 50,
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
  },
  toggleText: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.default,
    color: theme.colors.squirrel,
    marginTop: 20,
  },
});

export default App;
