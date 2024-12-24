import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native';

import theme from './constants/theme'; 
import ArticleBtns from './components/block/ArticleBtns';
import Btn from './components/atom/Btn';

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>dWas, ein kleines Spiel zum Üben der deutschen bestimmten Artikel.</Text>
      <StatusBar style="auto" />
      <ArticleBtns />
      <Btn title="STARTEN"  onPress={() => console.log("STARTEN")} />
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
});