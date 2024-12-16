import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import theme from './theme'; 
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
   
    <View style={styles.container}>
      <Text style={styles.text}>dWas, ein kleines Spiel zum Üben der deutschen bestimmten Artikel.</Text>
      <StatusBar style="auto" />
    </View>
    
   
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
    fontFamily: theme.font.fontFamily,
    fontWeight: theme.font.fontWeight.bold,
    fontSize: theme.font.fontSizes.title,
    color: theme.colors.squirrel,
    marginHorizontal: theme.marginHorizontal.default,
  }
});