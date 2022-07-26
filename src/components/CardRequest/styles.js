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
    paddingTop: 20,
    paddingHorizontal:30,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 15,
    height: 96,
    borderWidth: 1,
    borderColor: colors.gray4,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    width:"94%",
  },
  container: {
    width:"94%",
    flexDirection:"row",
    backgroundColor: '#000',
    borderRadius: 15,
    height: 96,
    backgroundColor:"#FFFFFF",
    alignItems:"center",
    paddingHorizontal:10,
  },
  topTitle: { color: '#fff', fontSize: 20, alignSelf: 'center' },
  rowInfo: {
    flexDirection: 'column',
    width: '90%',
    paddingHorizontal:10
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
	width: 90px;
	height: 90px;
	background: ${colors.white};
  border-radius: 47px;
  border-width:4px;
  border-color:${colors.white};
  
`;