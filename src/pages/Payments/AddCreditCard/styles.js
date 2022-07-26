import { StyleSheet } from "react-native";

import { metrics, colors } from "../../../styles";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #91a4f4;
`;

export const Label = styled.Text`
  font-size: 30px;
  margin-top: 7px;
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
  padding-top: 50px;
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

export const ContainerInputDetailsCard = styled.View`
  justify-content: center;
  align-items: center;
  width: 40%;
  margin: 0px 20px 0px 20px;
`;

export const InputDetailsCard = styled.TextInput`
  margin: ${metrics.padding}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ error }) => (error ? colors.red : colors.white)};
  color: ${colors.black};
  margin-bottom: 0px;
  font-size: 20px;
  width: 100%;
  text-align: center;
  padding: 10px 0px;
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

export const TextButtonNext = styled.Text`
  font-size: 17;
  color: ${colors.white};
`;

export const LabelDetaisCard = styled.Text`
  margin-left: ${(props) => (props.primary ? metrics.padding : 0)};
  margin-top: ${(props) => (props.primary ? 10 : 0)};
  color: ${colors.white};
  font-size: 17px;
  text-align: justify;
`;

export default StyleSheet.create({
  flipContainer: {
    width: "100%",
  },
  textCleanCard: {
    position: "absolute",
    bottom: 20,
    fontSize: 10,
    fontWeight: "bold",
    // color: colors.gray,
  },
  containerClean: {
    width: "95%",
    maxWidth: 350,
    alignSelf: "center",
    padding: 20,
    paddingTop: 20,
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderRadius: 15,
    height: 170,
    borderWidth: 1,
    // borderColor: colors.gray,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "95%",
    maxWidth: 350,
    alignSelf: "center",
    padding: 10,
    paddingTop: 10,
    marginTop: 50,
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#000",
    borderRadius: 15,
    height: 170,
  },
  containerFlip: {
    width: "95%",
    maxWidth: 350,
    alignSelf: "center",
    padding: 10,
    paddingTop: 10,
    marginTop: 50,
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#000",
    borderRadius: 15,
    height: 170,
  },
  topTitle: { color: "#fff", fontSize: 20, alignSelf: "center" },
  rowInfo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  line: {
    height: 50,
    // backgroundColor: colors.gray,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },

  containerDetailsCard: {
    justifyContent: "space-between",
    marginTop: 20,
    flexDirection: "row",
  },
});
