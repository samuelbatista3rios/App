import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
export const colors = {
  blue: '#136881',
  blue2: '#47A1F1',
  blue3: '#6078FF',
  black: '#272626',
  black2: '#707070',
  white: '#fff',
  success: '#8CC1C4',
  red: '#FF6060',
  red2: '#EF3C00',
  red3: '#F87B7B',
  gray: '#8D8C8C',
  gray2: '#F2F6FB',
  gray3: '#F8F8FB',
  gray4:"#CCCCCC",
  lightGray: '#eee',
  green: '#07EA93',
  yellow: '#F6BE67',
  transparent: 'rgba(0,0,0,0)',
  blue4:"#91A4F4",
  blue5:"#A4B3F4",

};
export const metrics = {
  padding: 20,
  margin: 20,
  largeFont: 20,
  mediumFont: 17,
  smallFont: 15,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};



export const ListContainer = styled.View`
  width: 100%;
  min-height: 200px;
  padding:10px;
`;
