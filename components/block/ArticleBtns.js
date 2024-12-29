import React from 'react';
import { View, StyleSheet } from 'react-native';
import Btn from '../atom/Btn';

const ArticleBtns = () => {
  return (
    <View style={styles.container}>
      <Btn title="Der" type="der" onPress={() => console.log('Der')} />
      <Btn title="Die" type="die" onPress={() => console.log('Die')} />
      <Btn title="Das" type="das" onPress={() => console.log('Das')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default ArticleBtns;
