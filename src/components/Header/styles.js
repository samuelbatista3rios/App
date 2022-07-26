import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding-top: ${metrics.padding / 2}px;
  padding-bottom: ${metrics.padding / 2}px;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${metrics.margin / 2}px;
`;
export const Image = styled.Image`
  width: 180px;
  height: 50px;
  align-self: center;
  position: absolute;
`;
export const ContainerTitle = styled.View``;

export const Title = styled.Text`
  font-size: 20;
  align-self: center;
  position: absolute;
`;

export const ButtonBack = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  width: 30px;
  height: 30px;
  left: ${metrics.padding}px;
`;
