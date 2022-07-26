import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';
import styled from 'styled-components/native';

export const Default =  StyleSheet.create({
  flipContainer: {
    width: '100%',
    alignSelf:"flex-start"
  },
  textCleanCard: {
    position: 'absolute',
    bottom: 20,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.gray
  },
  containerClean: {
    padding: 20,
    paddingTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 15,
    height: 200,
    borderWidth: 1,
    borderColor: colors.gray4,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    borderRadius: 15,
    height: 200,
    backgroundColor:"#FFFFFF"
  },
  topTitle: { color: '#fff', fontSize: 20, alignSelf: 'center' },
  rowInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  line: {
    height: 50,
    backgroundColor: colors.gray,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  }
});


export const Avatar = styled.Image`
	width: 95px;
	height: 95px;
	background: ${colors.white};
  border-radius: 47px;
  border-width:4px;
  border-color:${colors.white};
  
`;