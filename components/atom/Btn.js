import React from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import theme from "../../constants/theme";

const Btn = ({ title, type = "primary", disabled = false, onPress }) => { 
    const btnStyle = [
        styles.btn,
        styles[type], // Dynamically add style based on type
        disabled && styles.disabledBtn, // Disable button if disable is true
    ];

    const btnTextStyle = [
        styles.btnText,
        styles[`${type}Text`], // Dynamically add text style based on type
        disabled && styles.disabledBtnText, // Change text color if disabled
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
}

Btn.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['primary', 'der', 'die', 'das']),
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    btn: {
        width:70,
        height: 40,
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
        width: "80%",
        height: 50,
        backgroundColor: theme.colors.honey_500,
    },
    primaryText: {
        color: theme.colors.squirrel, // Set the desired text color for primary button
    },
    der: {
        backgroundColor: theme.colors.damselfly_500,
    },
    die: {
        backgroundColor: theme.colors.tomato_500,
    },
    das: {
        backgroundColor: theme.colors.mint_500,
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
});

export default Btn;