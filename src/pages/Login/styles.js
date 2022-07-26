import { StyleSheet } from "react-native";
import { metrics, colors } from "../../styles";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #91a4f4;
`;

export const Label = styled.Text`
  font-size: 30px;
  margin-top: 20px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  color: ${colors.white};
  margin-left: ${metrics.padding}px;
`;

export const TextSmall = styled.Text`
  font-size: 15px;
  font-weight: 100;
  color: ${colors.white};
`;

export const TextError = styled.Text`
  color: ${colors.white};
  align-self: center;
`;

export const ContainerInputs = styled.View`
  background-color: ${colors.blue4};
  padding-top: 20px;
  flex: 1;
`;

export const Input = styled.TextInput`
  margin: ${metrics.padding}px;
  margin-top: 0px;
  padding: ${metrics.padding}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ error }) => (error ? colors.red : colors.white)};
  color: ${colors.black};
  margin-bottom: 0px;
  font-size: 20px;
`;

export const ButtonBack = styled.TouchableOpacity`
  background-color: ${colors.black};
  position: "absolute";
  top: 20px;
  left: ${metrics.padding}px;
  z-index: 100px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const ContainerButtons = styled.View`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
`;
