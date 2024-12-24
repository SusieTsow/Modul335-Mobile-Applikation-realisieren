import React from 'react';
import { View, StyleSheet } from 'react-native';
import Btn from '../atom/Btn';

const ArticleBtns = () => {
  return (
    <View style={styles.container}>
      <Btn title="DER" type="der" onPress={() => console.log("DER")} />
      <Btn title="DIE" type="die" onPress={() => console.log("DIE")} />
      <Btn title="DAS" type="das" onPress={() => console.log("DAS")} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 20,
      alignItems: 'center',
      marginVertical: 20,
    },
});

export default ArticleBtns;
  