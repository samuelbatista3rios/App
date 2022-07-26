import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform
} from 'react-native';

import { colors } from '../../styles';

const Button = ({
  title,
  onPress,
  styles,
  background,
  color,
  disable,
  loading
}) => (
  <TouchableOpacity
    disabled={disable || loading}
    onPress={onPress}
    style={{
      ...Styles.button,
      backgroundColor: background ? colors[background] : '#fff',
      borderColor: background
        ? background !== 'white'
          ? colors[background]
          : ''
        : colors.black,
      ...styles
    }}
  >
    {loading ? (
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 1 : 20}
        color={color}
      ></ActivityIndicator>
    ) : (
      <Text
        style={{ ...Styles.text, color: color ? colors[color] : colors.black }}
      >
        {title}
      </Text>
    )}
  </TouchableOpacity>
);
const Styles = StyleSheet.create({
  button: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black
  }
});
export default Button;
