import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
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

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Nunito: require('../assets/fonts/Nunito-VariableFont_wght.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  const navigation = useNavigation();

  // Check if the user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && initializing) {
        // User is signed in
        navigation.replace('Levels');
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [navigation, initializing]);

  // Hide the splash screen when the app is ready
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Show an alert if there was an error loading the fonts
  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError);
      Alert.alert(
        'Error',
        'Failed to load fonts. The app may not display correctly.'
      );
    }
  }, [fontError]);

  // Hide the splash screen when the app is ready
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn('Error hiding splash screen:', e);
      }
    }
  }, [appIsReady, fontsLoaded]);

  const handleAuth = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Check if the password is at least 6 characters long
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Success', `Welcome back ${user.email}`);
          navigation.replace('Levels');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Success', `Account created for ${user.email}`);
          navigation.replace('Levels');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  // If the app is not ready, return null
  if (!appIsReady || !fontsLoaded || initializing) {
    return null;
  }

  if (auth.currentUser) {
    navigation.replace('Levels');
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <StatusBar style="auto" />
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/icons/logo.png')}
                style={styles.image}
              />
              <Text style={styles.text}>
                ein kleines Spiel zum Üben der deutschen bestimmten Artikel
              </Text>
            </View>
            <View style={styles.form}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor={theme.colors.oat_300}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <TextInput
                placeholder="Passwort"
                style={styles.input}
                placeholderTextColor={theme.colors.oat_300}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.btn}>
              <Btn
                title={isLogin ? 'Anmelden' : 'Registrieren'}
                onPress={handleAuth}
                type="primary"
              />
            </View>

            <View>
              <Text
                style={styles.toggleText}
                onPress={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? 'Brauchst du ein Konto? Registriere dich'
                  : 'Hast du schon ein Konto? Melde dich an'}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  logoContainer: {
    marginBottom: 150,
    alignItems: 'center', // Center the logo container
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
    textAlign: 'center',
    marginHorizontal: theme.marginHorizontal.default,
    marginBottom: 20,
  },
  form: {
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    width: 320,
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.oat_100,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: theme.colors.oat_300,
    borderRadius: 50,
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    color: theme.colors.squirrel,
  },
  btn: {
    alignItems: 'center',
  },
  toggleText: {
    fontFamily: 'Nunito',
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.default,
    color: theme.colors.squirrel,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default App;
