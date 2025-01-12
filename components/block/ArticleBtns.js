import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Btn from '../atom/Btn';
import theme from '../../constants/theme';

const ArticleBtns = ({ onPress, disabledButtons }) => {
  const articles = [
    { type: 'der', title: 'Der' },
    { type: 'die', title: 'Die' },
    { type: 'das', title: 'Das' },
  ];

  return (
    <View style={styles.container}>
      {articles.map((article) => (
        <View
          key={article.type}
          style={[
            article.type === 'die' && styles.differentMargin, // Apply different margin for 'die'
          ]}
        >
          <Btn
            title={article.title}
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
    width: 'auto',
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 30,
  },
  differentMargin: {
    marginBottom: 100, // Different margin for specific button
  },
});

export default ArticleBtns;
