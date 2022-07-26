import styled from 'styled-components/native';
import { colors } from '../../../styles';
import FontIcon from '@expo/vector-icons/FontAwesome';
export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  width: 200px;
  height: 100%;
  align-self: center;
  padding: 20px;
  padding-top: 20px;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${colors.gray};
  border-style: dashed;
  justify-content: center;
  align-items: center;
`;

export const ButtonSetImage = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.gray};
  border-style: dashed;
  margin-bottom: 10px;
  border-radius: 15px;
`;

export const ContainerButtons = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(FontIcon).attrs({
  size: 20,
  color: colors.gray
})``;

export const FlatList = styled.FlatList`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
