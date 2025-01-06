import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Btn from '../atom/Btn';
import theme from '../../constants/theme';

const ArticleBtns = ({ onPress, disabledButtons }) => {
  const articles = [
    { type: 'der', color: theme.colors.damselfly_500 },
    { type: 'die', color: theme.colors.tomato_500 },
    { type: 'das', color: theme.colors.mint_500 },
  ];

  return (
    <View style={styles.container}>
      {articles.map((article) => (
        <View key={article.type} style={styles.buttonWrapper}>
          <Btn
            title={article.type}
            type={article.type}
            onPress={() => onPress(article.type)}
            disabled={disabledButtons.includes(article.type)}
          />
        </View>
      ))}
    </View>
  );
};

ArticleBtns.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabledButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    paddingHorizontal: 5,
  },
});

export default ArticleBtns;
