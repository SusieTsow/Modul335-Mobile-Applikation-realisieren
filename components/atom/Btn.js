import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../constants/theme';

const Btn = ({ title, onPress, type, disabled }) => {
  const btnStyle = [
    styles.btn,
    styles[type],
    disabled && styles.disabledBtn,
    type === 'textButton' && styles.textBtn, // Apply textBtn style
  ];
  const btnTextStyle = [
    styles.btnText,
    styles[`${type}Text`],
    disabled && styles.disabledBtnText,
    type === 'textButton' && styles.textBtnText, // Apply textBtnText style
  ];

  return (
    <TouchableOpacity
      style={btnStyle}
      onPress={!disabled ? onPress : null}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={btnTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

Btn.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'der', 'die', 'das', 'textBtn']),
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

Btn.defaultProps = {
  type: 'primary',
  disabled: false,
};

const styles = StyleSheet.create({
  btn: {
    width: 80,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.btnBorder.default.borderColor,
    borderWidth: theme.btnBorder.default.borderWidth,
    borderRadius: theme.btnBorder.default.borderRadius,
    shadowColor: theme.shadow.default.shadowColor,
    shadowOffset: theme.shadow.default.shadowOffset,
    shadowOpacity: theme.shadow.default.shadowOpacity,
    shadowRadius: theme.shadow.default.shadowRadius,
    marginVertical: 10,
  },
  primary: {
    width: 320,
    height: 50,
    backgroundColor: theme.colors.honey_500,
  },
  primaryText: {
    color: theme.colors.squirrel, // Set the desired text color for primary button
    textTransform: 'uppercase',
  },
  der: {
    backgroundColor: theme.colors.damselfly_500,
  },
  derText: {
    fontSize: theme.font.fontSizes.quiz,
    textTransform: 'capitalize',
  },
  die: {
    backgroundColor: theme.colors.tomato_500,
  },
  dieText: {
    fontSize: theme.font.fontSizes.quiz,
    textTransform: 'capitalize',
  },
  das: {
    backgroundColor: theme.colors.mint_500,
  },
  dasText: {
    fontSize: theme.font.fontSizes.quiz,
    textTransform: 'capitalize',
  },
  disabledBtn: {
    backgroundColor: theme.colors.oat_300,
    borderColor: theme.btnBorder.disabled.borderColor,
    shadowColor: theme.shadow.disabled.shadowColor,
    shadowOffset: theme.shadow.disabled.shadowOffset,
    shadowOpacity: theme.shadow.disabled.shadowOpacity,
    shadowRadius: theme.shadow.disabled.shadowRadius,
  },
  btnText: {
    color: theme.colors.ferret,
    fontFamily: theme.font.fontFamily,
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
  },
  disabledBtnText: {
    color: theme.colors.oat_400,
  },
  textBtn: {
    width: 320,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadowColor: 'transparent',
  },
  textBtnText: {
    color: theme.colors.oat_500,
    fontFamily: theme.font.fontFamily,
    fontSize: theme.font.fontSizes.default,
    fontWeight: theme.font.fontWeight.bold,
    textTransform: 'uppercase',
  },
});

export default Btn;
