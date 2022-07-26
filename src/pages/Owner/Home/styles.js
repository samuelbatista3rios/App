import styled from "styled-components/native";
import { metrics, colors } from "../../../styles";

export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    minHeight: metrics.height,
    paddingBottom: 120,
    backgroundColor: "#91A4F4",
  },
})``;
export const Container = styled.View`
  flex: 1;
  background-color: #91a4f4;
  padding-top: 30px;
`;

export const ContainerUser = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #fff;
  margin-top: 32px;
`;

export const ContainerTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const Div = styled.View`
  align-items: center;
`;

export const Text = styled.Text`
  font-weight: ${({ weight }) => (weight ? weight : "normal")};
  color: ${({ color }) => (color ? colors[color] : colors.black)};
  font-size: ${({ font }) => (font ? font : metrics.smallFont)}px;
`;

export const TextMoney = styled.Text`
  color: ${({ color }) => colors[color]};
  font-size: ${metrics.largeFont}px;
  font-weight: 100;
`;

export const BarFlatList = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    maxHeight: 170,
  },
})`
  margin-top: 10px;
  max-height: 170px;
`;

export const ContainerBarGraph = styled.View`
  align-items: center;
`;
export const ContainerBarBox = styled.View`
  flex-direction: row;
  width: 40px;
  justify-content: space-between;
`;

export const BarBox = styled.View`
  height: 150px;
  width: 10px;
  background-color: ${colors.lightGray};
  border-radius: 2px;
  overflow: hidden;
  justify-content: flex-end;
`;

export const BarContent = styled.View`
  height: ${({ height }) => height};
  width: 100%;
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
`;

export const EntriesFlatList = styled.FlatList.attrs({
  horizontal: false,
})``;

export const CardHeader = styled.View`
  width: 100%;
  align-self: center;
  height: 50px;
  flex-direction: row;
  border-radius: 50px;
  background-color: ${colors.gray2};
`;

export const ContainerImagePerfil = styled.View`
  width: 100%;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  background: ${colors.white};
  border-radius: 50px;
  border-width: 4px;
  border-color: ${colors.white};
`;

export const CardTopButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  background-color: ${({ selected }) =>
    selected ? colors.black : colors.gray2};
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const ButtonEntries = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors.gray};
  align-items: flex-start;
  width: 100%;
  align-self: flex-start;
  height: 75px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-top: -15px;
  padding: 10px;
  justify-content: flex-end;
`;

export const ContainerTotal = styled.View`
  padding-top: 20px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;
  align-items: center;
`;

export const CardPets = styled.View`
  width: ${metrics.width - 10}px;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${colors.gray2};
  flex-direction: row;
  margin-top: 10px;
`;

export const ButtonDeposit = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 100px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? colors[backgroundColor] : colors.green};
  border-radius: 10px;
`;

export const CarouselContainer = styled.View`
  width: 100%;
  min-height: 200px;
  padding: 10px;
`;

export const ListRequestContainer = styled.View`
  width: 100%;
  min-height: 200px;
  padding: 10px;
`;
