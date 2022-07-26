import { StyleSheet, Platform, TouchableOpacity } from "react-native";
import { metrics, colors } from "../../../styles";
import styled, { css } from "styled-components/native";
import { TextInputMask as Mask } from "react-native-masked-text";
import FontIcon from "@expo/vector-icons/FontAwesome";

export const Page = styled.SafeAreaView`
  height: 100%;
  width: ${metrics.width}px;
  overflow: hidden;
  background-color: #91a4f4;
`;

export const ContainerInput = styled.View`
  flex: 1;
`;

export const ButtonSetImage = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.white};
  border-style: dashed;
  margin-bottom: 10px;
  border-radius: 15px;
`;

export const Input = styled.TextInput`
  margin: ${metrics.padding}px;
  margin-top: 0px;
  padding: ${metrics.padding}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ error }) => (error ? colors.red : colors.white)};
  color: ${colors.white};
  font-size: 20px;
`;

export const TextInputMask = styled(Mask)`
  margin: ${metrics.padding}px;
  margin-top: 0px;
  padding: ${metrics.padding}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ error }) => (error ? colors.red : colors.white)};
  color: ${colors.white};
  margin-bottom: 0px;
  font-size: 20px;
`;

export const LabelConfirm = styled.Text`
  font-size: 30px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  color: #fff;
  margin-left: ${metrics.padding}px;
`;
export const Label = styled.Text`
  font-size: 30px;
  margin-top: 20px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  color: ${colors.white};
  margin-left: ${metrics.padding}px;
`;

export const TextSmall = styled.Text`
  font-size: 20px;
  margin-top: 20px;
  font-weight: ${({ bold }) => (bold ? "bold" : "100")};
  color: ${({ color }) => (color ? color : " #F2F0F0")};
  margin-left: ${metrics.padding}px;
`;

export const TextError = styled.Text`
  font-size: 15px;
  margin-top: 20px;
  color: ${colors.red};
  align-self: center;
`;

export const ButtonContainer = styled.View`
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
`;

export const ContainerListAgend = styled.View`
  margin: 40px;
  flex-direction: row;
`;

export const ItemAgend = styled.TouchableOpacity`
  background: #f6be67;
  height: 120px;
  width: 100px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;

export const Separator = styled.View`
  border-bottom-color: #707070;
  border-bottom-width: 0.5px;
  width: 70%;
`;

export const TextDate = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const TextHour = styled.Text`
  color: #fff;
  font-size: 13px;
  margin-top: 10px;
`;

export const ContainerCreditCard = styled.TouchableOpacity`
  background: #fff;
  width: 100%;
  height: 100px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const InnerCreditCard = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 0px 10px;
`;

export const LogoCreditCard = styled.Image`
  height: 50px;
  width: 100px;
`;

export const TextCreditCard = styled.Text`
  color: #92a6fa;
  font-weight: bold;
  font-size: 15px;
  margin: 5px 0px;
`;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  largeText: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#000",
    marginLeft: metrics.padding,
  },
  smallText: {
    fontSize: 15,
    fontWeight: "100",
    color: "#000",
  },
  input: {
    margin: metrics.padding,
    padding: metrics.padding,
    paddingLeft: metrics.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    color: colors.black,
    marginBottom: 0,
  },
  successCard: {
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: "70%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  fileUploadContainer: {
    flex: 1,
    backgroundColor: colors.success,
    padding: metrics.padding,
  },
  fileUploadButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: metrics.margin,
    padding: metrics.padding / 2,
    minHeight: 130,
  },
  backButton: {
    backgroundColor: colors.white,
    position: "absolute",
    top: 15,
    left: metrics.padding,
    zIndex: 100,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const Icon = styled(FontIcon).attrs({
  size: 20,
  color: colors.gray,
})``;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 200px;
  height: 60%;
  align-self: center;
  padding: 20px;
  padding-top: 20px;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${colors.white};
  border-style: dashed;
  justify-content: center;
  align-items: center;
`;
