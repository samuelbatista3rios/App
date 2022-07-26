import React from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { colors } from "../../styles";
// import { Container } from './styles';

export default function Loading({ color }) {
  return (
    <ActivityIndicator
      size={Platform.OS === "ios" ? 1 : 20}
      color={color ? colors[color] : colors.white}
      style={{ alignSelf: "center" }}
    />
  );
}
