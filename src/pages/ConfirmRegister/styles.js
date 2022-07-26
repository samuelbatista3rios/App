import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  margin-top: 5px;
  background-color: ${colors.blue4};
  min-width: ${metrics.width}px;
`;

export const Label = styled.Text`
  font-size: 30px;
  margin-top: 20px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  margin-left: ${metrics.padding}px;
  color: ${colors.white};
`;

export const TextLarge = styled.Text`
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: ${colors.white};
`;

export const TextSmall = styled.Text`
  font-size: 20px;
  font-weight: ${({ bold }) => (bold ? 'bold' : '100')};
  color: ${colors.white};
  margin-left: ${metrics.padding}px;
  text-decoration: underline;
`;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue4
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#000',
    marginLeft: metrics.padding
  },
  smallText: {
    fontSize: 15,
    fontWeight: '100',
    color: '#000'
  },
  input: {
    margin: metrics.padding,
    marginTop: 0,
    padding: metrics.padding,
    paddingLeft: metrics.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    color: colors.black,
    marginBottom: 0
  },
  successCard: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: '70%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  fileUploadContainer: {
    flex: 1,
    backgroundColor: colors.success,
    padding: metrics.padding
  },
  fileUploadButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: metrics.margin,
    padding: metrics.padding / 2,
    minHeight: 130
  }
});
