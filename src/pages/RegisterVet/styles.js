import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';
import styled from 'styled-components/native';
import { TextInputMask as Mask } from 'react-native-masked-text';

export const Page = styled.SafeAreaView`
  height: 100%;
  width: ${metrics.width}px;
  overflow: hidden;
  background-color: #91A4F4;
`;

export const ContainerInput = styled.View`
  flex: 1;
`;

export const Input = styled.TextInput`
  margin: ${metrics.padding}px;
  margin-top: 0px;
  padding: ${metrics.padding}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ error }) => (error ? colors.red : colors.white)};
  color: ${colors.white};
  margin-bottom: 0px;
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
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: #fff;
  margin-left: ${metrics.padding}px;
`;
export const Label = styled.Text`
  font-size: 30px;
  margin-top: 20px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${colors.white};
  margin-left: ${metrics.padding}px;
`;

export const TextSmall = styled.Text`
  font-size: 20px;
  margin-top: 20px;
  font-weight: ${({ bold }) => (bold ? 'bold' : '100')};
  color: ${({ color }) => (color ? color : ' #F2F0F0')} ;
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

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  },
  backButton: {
    backgroundColor: colors.white,
    position: 'absolute',
    top: 15,
    left: metrics.padding,
    zIndex: 100,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
