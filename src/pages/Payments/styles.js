import { StyleSheet } from "react-native";
import { metrics, colors } from "../../styles";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #91a4f4;
  padding: 0px 20px;
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

export const ContainerBoxCard = styled.TouchableOpacity`
  margin-top: 20px;
  background: #fff;
  width: 100%;
  height: 90px;
  flex-direction: row;
  border-radius: 12px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const LogoCreditCard = styled.Image`
  height: 40px;
  width: 50px;
`;

export const ContainerDetails = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

export const TextName = styled.Text`
  font-size: 17px;
`;

export const TextNumberCard = styled.Text`
  text-align: left;
  margin-top: 5px;
  font-size: 13px;
`;

export default StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    justifyContent: "space-evenly",
  },
});
