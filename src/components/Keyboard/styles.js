import styled from 'styled-components/native';
import { colors, metrics } from '../../styles';
import FontIcon from '@expo/vector-icons/FontAwesome';
import FontIcon5 from '@expo/vector-icons/FontAwesome5';

export const KeyboardContainer = styled.View`
  width: 100%;
  height: 400px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const KeyboardButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 25%;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
`;

export const KeyboardText = styled.Text`
  color: ${colors.gray};
  font-size: ${metrics.largeFont * 1.5}px;
  font-weight: bold;
`;

export const KeyboardBackButon = styled(FontIcon5).attrs({
  size: 25,
  color: colors.gray,
  name: 'backspace'
})``;
