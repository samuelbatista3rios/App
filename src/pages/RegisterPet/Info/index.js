import React, { useState, useRef, useEffect } from 'react';
import { metrics } from '../../../styles';
import { Formik } from 'formik';
import apiCustomer from '../../../services/apiCustomer';
import { validate as ValidarCPF } from 'gerador-validador-cpf';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Picker,
  ScrollView,
} from 'react-native';

import {
  Page,
  ContainerInput,
  Input,
  Label,
  LabelConfirm,
  TextSmall,
  TextError,
  ButtonContainer,
  TextInputMask,
  ButtonSetImage,
  Icon,
  Card,
  Image
} from '../styles';

import Button from '../../../components/Button';
import Error from '../../../services/errors';

/**
 * REDUX
 */
import * as GeneralActions from '../../../store/modules/general/actions';
import { useDispatch } from 'react-redux';
import * as AccountActions from '../../../store/modules/account/actions';


import cachorro from '../../../assets/json/cachorros.json'
import gato from '../../../assets/json/gatos.json'

const initialValues = {
  name: '',
  species: 'cachorro',
  breed: '',
  sex: 'feminino',
  weight: '',
  age: '',
  avatar:''
};

const initialErrors = {
  name: '-',
  species: '-',
  breed: '-',
  sex: '',
  weight: '-',
  age: '-',
  avatar: '-',
};

let DataRacas = {
  cachorro:cachorro,
  gato:gato
}

const registerSchema = Yup.object().shape({
  name: Yup.string().required('campo obrigatório'),
  species: Yup.string().required('campo obrigatório'),
  breed: Yup.string().required('campo obrigatório'),
  sex: Yup.string().required('campo obrigatório'),
  weight: Yup.string().required('campo obrigatório'),
  age: Yup.string().required('campo obrigatório'),
  avatar: Yup.string().required('campo obrigatório'),
});

const offset = new Animated.Value(0);

function Register({ navigation }) {
  const NameRef = useRef(null);
  const WeightRef = useRef(null);
  const AgeRef = useRef(null);
  const [toValue, setToValue] = useState(0);
  const [permission, setPermission] = useState(false);

  const dispatch = useDispatch();
  const AnimatedView = new Animated.createAnimatedComponent(View);

  const setFocus = toValue => {
    switch (toValue) {
      case 0:
        NameRef.current.focus();
      break;
      case 400:
        WeightRef.current.focus();
      break;
      case 500:
        AgeRef.current.focus();
      break;
      default:
        Keyboard.dismiss();
      break;
    }
  };

  const getPermission = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (status === 'granted') {
      setPermission(true);
    } else {
      setPermission(false);
    }
  };

  deleteFromImageList = (inputName, index, props) => {
    const values = props.values;
    values[inputName] = "";
    props.setValues(values);
  };

  openModalToSelectImage = async (inputName, props) => {
    if (!permission) {
      return getPermission();
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true
    });
    if (!result.cancelled) {
      const values = props.values;
      values[inputName] = `data:image/jpg;base64,${result.base64}`
      props.setValues(values);
    }
  };

  useEffect(() => {
    getPermission()
    Animated.timing(offset, {
      toValue: toValue
    }).start(() => {
      setFocus(toValue);
    });
  }, [toValue]);

  const RegisterNewVetRequest = values => {
    dispatch(GeneralActions.setLoading(true));
    apiCustomer
      .post('/client/pet', { ...values})
      .then(resp => {
        dispatch(AccountActions.petsRequest());
        navigation.goBack();
        dispatch(GeneralActions.setLoading(false));
      })
      .catch(err => {
        if (error.response && error.response.data.code) {
          const { code } = error.response.data.code;
          dispatch(GeneralActions.setError(Error('PT_BR', code)));
        }
      })
      .finally(() => {
        dispatch(GeneralActions.setLoading(false));
      });
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <Formik
        onSubmit={values => RegisterNewVetRequest(values)}
        initialValues={initialValues}
        initialErrors={initialErrors}
        validationSchema={registerSchema}
      >
        {props => (
          <AnimatedView
            style={{
              flex: 1,
              flexDirection: 'row',
              minWidth: metrics.width * 6,
              transform: [
                {
                  translateX: offset.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, metrics.width * -1]
                  })
                }
              ]
            }}
          >
            {/** NOME DO TITULAR [0]*/}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Nome</Label> do pet
                </Label>

                <Input
                  ref={NameRef}
                  autoCompleteType="off"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                />
                {!!props.errors.name && !!props.touched.name && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.name}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('name').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('name').error ? 'white' : 'yellow'
                  }
                  title="Próximo"
                  onPress={() => setToValue(100)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => navigation.goBack()}
                />
              </ButtonContainer>
            </Page>

            {/** ESPÉCIE DO PET [100] */}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Espécie</Label> do pet
                </Label>
                <Picker
                  selectedValue={props.values.species}
                  style={{height: 50, width: "100%"}}
                  onValueChange={props.handleChange('species')}>
                    <Picker.Item label="Gato" value="gato" />
                    <Picker.Item label="Cachorro" value="cachorro" />
                </Picker>
                {!!props.errors.species && !!props.touched.document && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.species}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('species').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('species').error ? 'white' : 'yellow'
                  }
                  title="Próximo"
                  onPress={() => setToValue(200)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(0)}
                />
              </ButtonContainer>
            </Page>

            {/** RAÇA DO PET [200] */}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Raça</Label> do pet
                </Label>
                <Picker
                  selectedValue={props.values.breed}
                  style={{height: 50, width: "100%"}}
                  onValueChange={props.handleChange('breed')}>
                    {DataRacas[props.values.species].map(item =>  <Picker.Item key={item.value.label} label={item.value.label} value={item.value.label} />)}    
                </Picker>
                {!!props.errors.breed && !!props.touched.breed && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.breed}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('breed').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('breed').error ? 'white' : 'yellow'
                  }
                  title="Próximo"
                  onPress={() => setToValue(300)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(100)}
                />
              </ButtonContainer>
            </Page> 
            {/** SEXO DO PET [300]<<=============================== */} 
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Sexo</Label> do pet
                </Label>
                <Picker
                  selectedValue={props.values.sex}
                  style={{height: 50, width: "100%"}}
                  onValueChange={props.handleChange('sex')}>
                    <Picker.Item label="Masculino" value="masculino" />
                    <Picker.Item label="Feminino" value="feminino" />
                </Picker>
                {!!props.errors.sex && !!props.touched.sex && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.sex}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('sex').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('sex').error ? 'white' : 'yellow'
                  }
                  title="Próximo"
                  onPress={() => setToValue(400)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(200)}
                />
              </ButtonContainer>
            </Page>
            {/** PESO DO PET [400]*/}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Peso</Label> do pet
                </Label>
                <Input
                  keyboardType="numeric"
                  ref={WeightRef}
                  autoCompleteType="off"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={props.values.weight}
                  onChangeText={props.handleChange('weight')}
                  onBlur={props.handleBlur('weight')}
                />
                {!!props.errors.weight && !!props.touched.weight && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.weight}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('weight').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('weight').error ? 'white' : 'yellow'
                  }
                  title="Próximo"
                  onPress={() => setToValue(500)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(300)}
                />
              </ButtonContainer>
            </Page> 
              {/** IDADE DO PET [500]*/}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Idade</Label> do pet
                </Label>
                <Input
                  keyboardType="numeric"
                  ref={AgeRef}
                  autoCompleteType="off"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={props.values.age}
                  onChangeText={props.handleChange('age')}
                  onBlur={props.handleBlur('age')}
                />
                {!!props.errors.age && !!props.touched.age && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.age}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('age').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('age').error ? 'white' : 'yellow'
                  }
                  title="Próximo"
                  onPress={() => setToValue(600)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(400)}
                />
              </ButtonContainer>
            </Page> 
              {/** IDADE DO PET [600]*/}
            <Page>
              <ContainerInput style={{padding:0}}>
                <Label>
                  <Label bold>Foto</Label> do pet
                </Label>
                <View style={{flex:1, justifyContent:"center",alignItems:"center",paddingVertical:20}}>
                  {
                    props.values.avatar == "" ? 
                    (
                      <ButtonSetImage
                      onPress={() => 
                        openModalToSelectImage('avatar', props)
                      }
                      >
                        <Icon name="image" />
                      </ButtonSetImage>

                    ):
                    (
                      <Card
                      onPress={() =>
                        deleteFromImageList(
                          'avatar',
                          0,
                          props
                        )
                      }
                      key={0}
                      style={{
                        marginLeft: 20,
                        marginRight: 0,
                        padding:0,
                      }}
                    >
                      <Image source={{ uri: props.values.avatar }} resizeMode="contain" />
                    </Card>
                    )
                  }  
                    
              </View>
               
              </ContainerInput>
                    
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('age').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('age').error ? 'white' : 'yellow'
                  }
                  title="Próximo"
                  onPress={() => setToValue(700)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(500)}
                />
              </ButtonContainer>
            </Page> 
            {/** CONFIRMAR INFORMAÇÕES [700]<<=============================== */}
            <Page>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <ContainerInput style={{ paddingRight: 20 }}>
                <Label bold>
                  <Label>confirme as informações abaixo de  {props.values.name.split(' ')[0]} {' '}</Label>
                </Label>
                <TextSmall bold>Foto</TextSmall>
                <Card
                  onPress={() =>
                    deleteFromImageList(
                      'avatar',
                      0,
                      props
                    )
                  }
                  key={0}
                  style={{
                    padding:0,
                    width:200,
                    height:200,
                    alignSelf:"flex-start",
                    marginLeft:20,
                    marginVertical:10,
                  }}
                >
                  <Image source={{ uri: props.values.avatar }} resizeMode="contain" />
                </Card>
                <TextSmall bold>Nome</TextSmall>
                <LabelConfirm>{props.values.name}</LabelConfirm>
                <TextSmall bold>Espécie</TextSmall>
                <LabelConfirm>{props.values.species}</LabelConfirm>
                <TextSmall bold>Raça</TextSmall>
                <LabelConfirm>{props.values.breed}</LabelConfirm>
                <TextSmall bold>Sexo</TextSmall>
                <LabelConfirm>{props.values.sex}</LabelConfirm>
                <TextSmall bold>Peso</TextSmall>
                <LabelConfirm>{props.values.weight}</LabelConfirm>
                <TextSmall bold>Idade</TextSmall>
                <LabelConfirm>{props.values.age}</LabelConfirm>
                <View style={{ paddingRight: 20 }}>
                  <TextSmall color="#F6BE67" bold>
                    Confirme tudo antes de salvar
                  </TextSmall>
                </View>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  color={'black'}
                  background={'yellow'}
                  title="Salvar"
                  onPress={props.handleSubmit}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(600)}
                />
              </ButtonContainer>
              </ScrollView>
            </Page>
          </AnimatedView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default Register;
