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
import { useDispatch, useSelector } from 'react-redux';

const Welcome = ({ navigation }) => {
  // AsyncStorage.clear();
  const dispatch = useDispatch();
  const redirect = to => {
    navigation.navigate(to);
  };
  useEffect(() => {
   
  }, []);

  return (
    <Container>
      <SafeArea />
      <ContainerImages>
        <Image source={IconPetvita} resizeMode="contain"  />
        <TextLarge>Petsvita</TextLarge>
      </ContainerImages>
     
      <ContainerButtons>
        <Button
          title="Dono"
          color="black"
          background="yellow"
          styles={{ minWidth: '100%', borderColor: "#707070", }}
          onPress={() => redirect('REGISTER_OWNER_INFO')}
        />
        <Button
          color="white"
          title="Veterinário"
          background="blue4"
          styles={{ marginTop: 10, minWidth: '100%', borderColor:"#FFF" }}
          onPress={() => redirect('REGISTER_VET')}
        />
        <Button
          title="Voltar"
          styles={{ marginTop: 10, minWidth: '100%', borderColor:"#707070" }}
          onPress={() => redirect('WELCOME')}
        />
      </ContainerButtons>
      <Text>Versão:1.0.34</Text>
      <SafeArea />
    </Container>
  );
};

export default Welcome;
