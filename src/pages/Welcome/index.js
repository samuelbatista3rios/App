import React, { useEffect } from 'react';
import Styles from './styles';
import Button from '../../components/Button';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import apiCustomer from '../../services/apiCustomer';
/**
 * IMAGES
 */
import IconPetvita from '../../assets/icon_petsvita_black.png';
import LogoPetvita from '../../assets/logo_petsvita.png';

import {
  Container,
  TextLarge,
  Image,
  ContainerImages,
  ContainerButtons,
  SafeArea
} from './styles';

import * as GeneralActions from '../../store/modules/general/actions';
import * as UserActions from '../../store/modules/user/actions';
import { useDispatch, useSelector } from 'react-redux';

const Welcome = ({ navigation }) => {
  // AsyncStorage.clear();
  const dispatch = useDispatch();
  const redirect = to => {
    navigation.navigate(to);
  };
  useEffect(() => {
    _bootstrapAsync = async () => {
      try {
        let response = await apiCustomer.checkToken.get();
        let { type,user } = response.data
        dispatch(UserActions.setUser(user));
       
        switch(type){
          case "client":
            redirect('DASHBOARD_OWNER');
          break;
        }
        
      } catch (error) {
        if (error.response && error.response.data.code === '10042') {
          redirect('DASHBOARD_OWNER');
        }
      } finally {
        setTimeout(() => {
          dispatch(GeneralActions.setLoading(false));
        }, 1500);
      }
    };
    _bootstrapAsync();
  }, []);
  dispatch(GeneralActions.setLoading(true));

  return (
    <Container>
      <SafeArea />
      <ContainerImages>
        <Image source={IconPetvita} resizeMode="contain"  />
        <TextLarge>Petsvita</TextLarge>
      </ContainerImages>
     
      <ContainerButtons>
        <Button
          title="Entrar"
          color="black"
          background="yellow"
          styles={{ minWidth: '100%', borderColor: "#707070", }}
          onPress={() => redirect('LOGIN')}
        />
        <Button
          title="Registrar"
          styles={{ marginTop: 10, minWidth: '100%', borderColor:"#707070" }}
          onPress={() => redirect('REGISTER')}
        />
      </ContainerButtons>
      <Text>Versão:1.0.34</Text>
      <SafeArea />
    </Container>
  );
};

export default Welcome;
