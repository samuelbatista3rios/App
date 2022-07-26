import React, { useRef, useState, useEffect } from 'react';
import { metrics } from '../../../styles';
import { Formik } from 'formik';
import apiCustomer from '../../../services/apiCustomer';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView
} from 'react-native';
import {
  Page,
  ContainerInput,
  Input,
  Label,
  TextError,
  ButtonContainer,
  TextInputMask,
  TextSmall,
  LabelConfirm
} from '../styles';
import {
  Card,
  Icon,
  FlatList,
  Image,
  ButtonSetImage,
  ContainerButtons
} from './styles';
import Button from '../../../components/Button';
import Error from '../../../services/errors';

/**
 * REDUX
 */
import * as GeneralActions from '../../../store/modules/general/actions';
import * as UserActions from '../../../store/modules/user/actions';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  document_people: [],
  document_company: [],
  proof_residence: []
};

const initialErrors = {
  document_people: 'err',
  document_company: 'err',
  proof_residence: 'err'
};

const registerSchema = Yup.object().shape({
  document_people: Yup.array().of(Yup.string()),
  document_company: Yup.array().of(Yup.string()),
  proof_residence: Yup.array().of(Yup.string())
});

const offset = new Animated.Value(0);
const AnimatedView = new Animated.createAnimatedComponent(View);

function RegisterCompany({ navigation }) {
  const [toValue, setToValue] = useState(0);
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.data.email);
  const [permission, setPermission] = useState(false);
  let value = 0;
  const items = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    //Anime to next page by toValue state
    Animated.timing(offset, {
      toValue: toValue
    }).start();
  }, [toValue]);

  useEffect(() => {
    getPermission();
  }, []);

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
      values[inputName].push(`data:image/jpg;base64,${result.base64}`);
      props.setValues(values);
    }
  };
  
  deleteFromImageList = (inputName, index, props) => {
    const values = props.values;
    values[inputName].splice(index, 1);
    props.setValues(values);
  };

  openCameraToSetImage = async (inputName, props) => {
    if (!permission) {
      return getPermission();
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true
    });
    if (!result.cancelled) {
      const values = props.values;
      values[inputName].push(`data:image/jpg;base64,${result.base64}`);
      props.setValues(values);
    }
  };

  const registerRequest = values => {
    dispatch(GeneralActions.setLoading(true));
    apiCustomer
      .post('register/document', { values })
      .then(resp => {
        const { token } = resp.data;
        dispatch(UserActions.setToken(token));
        navigation.navigate('CONFIRMREGISTER', { username });
      })
      .catch(error => {
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
        onSubmit={values => registerRequest(values)}
        initialValues={initialValues}
        initialErrors={initialErrors}
        validationSchema={registerSchema}
      >
        {props => (
          <AnimatedView
            style={{
              flex: 1,
              flexDirection: 'row',
              minWidth: metrics.width * 5,
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
            {/** QUASE LÁ INFORMAÇÕES [0] */}
            <Page>
              <ContainerInput>
                <Label>
                  Quase lá. Agora cadastraremos os{' '}
                  <Label bold style={{ paddingRight: 20 }}>
                    documentos
                  </Label>
                </Label>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={false}
                  color="white"
                  background="black"
                  title="Próximo"
                  onPress={() => setToValue(100)}
                />
                <Button
                  title="Sair"
                  styles={{ marginTop: 10 }}
                  onPress={() => navigation.navigate('LOGIN')}
                />
              </ButtonContainer>
            </Page>

            {/** DOCUMENTO DO USUÁRIO [100] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label bold style={{ paddingRight: 20 }}>
                  Documentos do usuário.{' '}
                </Label>
                <TextSmall style={{ marginTop: 0 }}>
                  Aqui pode ser identidade e cpf.
                </TextSmall>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={['first', ...props.values.document_people]}
                  horizontal={true}
                  ItemSeparatorComponent={() => (
                    <View style={{ width: 20 }}></View>
                  )}
                  keyExtractor={(data, index) => String(index)}
                  renderItem={({ item, index }) =>
                    item === 'first' ? (
                      <ContainerButtons>
                        <ButtonSetImage
                          onPress={() =>
                            openModalToSelectImage('document_people', props)
                          }
                        >
                          <Icon name="image" />
                        </ButtonSetImage>
                        <ButtonSetImage
                          onPress={() =>
                            openCameraToSetImage('document_people', props)
                          }
                        >
                          <Icon name="camera" />
                        </ButtonSetImage>
                      </ContainerButtons>
                    ) : (
                      <Card
                        onPress={() =>
                          deleteFromImageList(
                            'document_people',
                            index - 1,
                            props
                          )
                        }
                        key={index}
                        style={{
                          marginLeft: index === 0 ? 20 : 0,
                          marginRight: index === items.length - 1 ? 20 : 0
                        }}
                      >
                        <Image source={{ uri: item }} resizeMode="contain" />
                      </Card>
                    )
                  }
                />
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!props.values['document_people'].length}
                  color={
                    !props.values['document_people'].length ? 'black' : 'white'
                  }
                  background={
                    !props.values['document_people'].length ? 'white' : 'black'
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

            {/** DOCUMENTO DA EMPRESA [200] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label bold style={{ paddingRight: 20 }}>
                  Documentos da empresa.{' '}
                </Label>
                <TextSmall style={{ marginTop: 0 }}>
                  Aqui pode ser alvarás e outros.
                </TextSmall>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={['first', ...props.values.document_company]}
                  horizontal={true}
                  ItemSeparatorComponent={() => (
                    <View style={{ width: 20 }}></View>
                  )}
                  keyExtractor={data => String(data)}
                  renderItem={({ item, index }) =>
                    item === 'first' ? (
                      <ContainerButtons>
                        <ButtonSetImage
                          onPress={() =>
                            openModalToSelectImage('document_company', props)
                          }
                        >
                          <Icon name="image" />
                        </ButtonSetImage>
                        <ButtonSetImage
                          onPress={() =>
                            openCameraToSetImage('document_company', props)
                          }
                        >
                          <Icon name="camera" />
                        </ButtonSetImage>
                      </ContainerButtons>
                    ) : (
                      <Card
                        onPress={() =>
                          deleteFromImageList(
                            'document_company',
                            index - 1,
                            props
                          )
                        }
                        key={index}
                        style={{
                          marginLeft: index === 0 ? 20 : 0,
                          marginRight: index === items.length - 1 ? 20 : 0
                        }}
                      >
                        <Image source={{ uri: item }} resizeMode="contain" />
                      </Card>
                    )
                  }
                />
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!props.values['document_company'].length}
                  color={
                    !props.values['document_company'].length ? 'black' : 'white'
                  }
                  background={
                    !props.values['document_company'].length ? 'white' : 'black'
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

            {/** DOCUMENTO DA EMPRESA [300] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label bold style={{ paddingRight: 20 }}>
                  Comprovante de endereço.
                </Label>
                <TextSmall style={{ marginTop: 0 }}>
                  Aqui pode ser contas de energia ou água.
                </TextSmall>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={['first', ...props.values.proof_residence]}
                  horizontal={true}
                  ItemSeparatorComponent={() => (
                    <View style={{ width: 20 }}></View>
                  )}
                  keyExtractor={data => String(data)}
                  renderItem={({ item, index }) =>
                    item === 'first' ? (
                      <ContainerButtons>
                        <ButtonSetImage
                          onPress={() =>
                            openModalToSelectImage('proof_residence', props)
                          }
                        >
                          <Icon name="image" />
                        </ButtonSetImage>
                        <ButtonSetImage
                          onPress={() =>
                            openCameraToSetImage('proof_residence', props)
                          }
                        >
                          <Icon name="camera" />
                        </ButtonSetImage>
                      </ContainerButtons>
                    ) : (
                      <Card
                        onPress={() =>
                          deleteFromImageList(
                            'proof_residence',
                            index - 1,
                            props
                          )
                        }
                        key={index}
                        style={{
                          marginLeft: index === 0 ? 20 : 0,
                          marginRight: index === items.length - 1 ? 20 : 0
                        }}
                      >
                        {item === 'first' ? (
                          <Icon />
                        ) : (
                          <Image source={{ uri: item }} resizeMode="contain" />
                        )}
                      </Card>
                    )
                  }
                />
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!props.values['proof_residence'].length}
                  color={
                    !props.values['proof_residence'].length ? 'black' : 'white'
                  }
                  background={
                    !props.values['proof_residence'].length ? 'white' : 'black'
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

            {/** INFORMAÇÃO [400] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label bold style={{ paddingRight: 20 }}>
                  Agora enviaremos tudo.{' '}
                </Label>
                <TextSmall style={{ marginTop: 0, paddingRight: 20 }}>
                  Após o envio seu cadastro irá para análise, estando tudo certo
                  seu cadastro será aprovado e você receberá um email.
                </TextSmall>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!props.values['proof_residence'].length}
                  color={
                    !props.values['proof_residence'].length ? 'black' : 'white'
                  }
                  background={
                    !props.values['proof_residence'].length ? 'white' : 'black'
                  }
                  title="Salvar"
                  onPress={props.handleSubmit}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(300)}
                />
              </ButtonContainer>
            </Page>
          </AnimatedView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default RegisterCompany;
