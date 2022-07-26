import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';
import FontIcon from '@expo/vector-icons/FontAwesome';
import FontIcon5 from '@expo/vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  min-width: ${width};
  padding-bottom: 20px;
`;

export const Menu = styled.View`
  width: ${width * 0.7};
`;

export const AnimatedModal = styled(Animated.View)`
  flex-direction: row;
  height: ${height}px;
`;

export const ItemMenu = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-direction: row;
`;

export const ModalItem = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-direction: row;
  width: ${width * 0.7};
  position: absolute;
  align-self: center;
`;

export const CloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #fff;
  padding: 2px;
  border-radius: 20px;
`;

export const Icon = styled(FontIcon5).attrs({
  size: 20,
  color: '#000'
})``;

export const ContainerTopButtons = styled.View`
  position: absolute;
  top: 20px;
  z-index: 2;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  width: 55px;
  height: 55px;
  border-radius: 50px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

export const PointMarker = styled.TouchableOpacity`
  background-color: transparent;
  padding: 2px;
  width: 40px;
  border-radius: 40px;
  align-items: center;
`;

export const Image = styled.Image``;
