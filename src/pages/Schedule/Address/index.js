import React, { useRef, useEffect, useState } from 'react';
import { metrics } from '../../../styles';
import { Formik } from 'formik';
import apiCustomer from '../../../services/apiCustomer';
import apiCep from '../../../services/apiCep';
import * as Yup from 'yup';
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
import Button from '../../../components/Button';
import Error from '../../../services/errors';

/**
 * REDUX
 */
import * as GeneralActions from '../../../store/modules/general/actions';
import * as AddressActions from '../../../store/modules/address/actions';
import * as UserActions from '../../../store/modules/user/actions';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  post_code: '',
  address: '',
  district: '',
  city: '',
  state: '',
  default: '',
  number: '',
  complement: ''
};

const initialErrors = {
  post_code: '-',
  address: '-',
  district: '-',
  city: '-',
  state: '-',
  default: '-',
  number: '-',
  complement: '-'
};

const registerSchema = Yup.object().shape({
  post_code: Yup.string()
    .min(9, 'minimo de 8 caracteres')
    .required('campo obrigatório'),
  address: Yup.string().required('campo obrigatório'),
  district: Yup.string().required('campo obrigatório'),
  city: Yup.string().required('campo obrigatório'),
  state: Yup.string()
    .min(2, 'deve ter dois digitos')
    .required('campo obrigatório'),
  default: Yup.boolean(),
  number: Yup.string().required('campo obrigatório'),
  complement: Yup.string()
});

const AnimatedView = new Animated.createAnimatedComponent(View);
const offset = new Animated.Value(0);

function RegisterCompany({ navigation }) {
  const CepRef = useRef(null);
  const RuaRef = useRef(null);
  const BairroRef = useRef(null);
  const CidadeRef = useRef(null);
  const EstadoRef = useRef(null);
  const NumeroRef = useRef(null);
  const ComeplementoRef = useRef(null);
  const username = useSelector(state => state.user.data.name);
  const dispatch = useDispatch();

  const [toValue, setToValue] = useState(0);
  let value = 0;

  useEffect(() => {
    Animated.timing(offset, {
      toValue: toValue
    }).start(() => {
      setFocus(toValue);
    });
  }, [toValue]);

  const next = () => {
    if (value > metrics.width * 9) {
      return;
    }
    Animated.timing(offset, {
      toValue: value + 100,
      useNativeDriver: true
    }).start(() => {
      value = value + 100;
      setFocus(value);
    });
  };
  const prev = () => {
    if (value < 0) {
      return;
    }
    Animated.timing(offset, {
      toValue: value - 100,
      useNativeDriver: true
    }).start(() => {
      value = value - 100;
      setFocus(value);
    });
  };
  const setFocus = value => {
    switch (value) {
      case 100:
        CepRef.current.focus();
        break;
      case 200:
        RuaRef.current.focus();
        break;
      case 300:
        BairroRef.current.focus();
        break;
      case 400:
        CidadeRef.current.focus();
        break;
      case 500:
        EstadoRef.current.focus();
        break;
      case 600:
        NumeroRef.current.focus();
        break;
      case 700:
        ComeplementoRef.current.focus();
        break;
      default:
        Keyboard.dismiss();
        break;
    }
  };

  const autoCompleteAddress = props => {
    const { post_code } = props.values;
    dispatch(GeneralActions.setLoading(true));
    let cep = post_code.replace(/\D/g, '');
    apiCep
      .getAddress(cep)
      .then(result => result.data)
      .then(result => {
        props.setFieldValue('address', result.logradouro);
        props.setFieldTouched('address', true);
        props.setFieldValue('district', result.bairro);
        props.setFieldTouched('district', true);
        props.setFieldValue('city', result.localidade);
        props.setFieldTouched('city', true);
        props.setFieldValue('state', result.uf);
        props.setFieldTouched('state', true);
        props.setFieldTouched('complement', true);
        setToValue(200);
      })
      .catch(error => {
        if (error.response) {
          dispatch(GeneralActions.setError('CEP inválido, tente outro'));
        }
      })
      .finally(() => {
        dispatch(GeneralActions.setLoading(false));
      });
  };

  const registerRequest = values => {
    dispatch(AddressActions.addressCreateRequest(values));
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
              minWidth: metrics.width * 9,
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
            {/** CONFIRMAR INFORMAÇÕES [0] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label bold>
                  {!!username && username.split(' ')[0] + ', '}
                  <Label>Tem certeza que quer criar um novo endereço ? </Label>
                </Label>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  color={'white'}
                  background={'black'}
                  title="Sim"
                  onPress={() => setToValue(100)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => navigation.navigate('SCHEDULE_SELECT')}
                />
              </ButtonContainer>
            </Page>

            {/** CEP DA RUA [100] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>CEP</Label> da rua
                </Label>
                <TextInputMask
                  refInput={el => {
                    CepRef.current = el;
                  }}
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="numbers-and-punctuation"
                  type={'zip-code'}
                  value={props.values.post_code}
                  onChangeText={props.handleChange('post_code')}
                  maxLength={9}
                  onBlur={props.handleBlur('post_code')}
                />
                {!!props.errors.post_code && !!props.touched.post_code && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.post_code}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('post_code').error}
                  color={
                    !!props.getFieldMeta('post_code').error ? 'black' : 'white'
                  }
                  background={
                    !!props.getFieldMeta('post_code').error ? 'white' : 'black'
                  }
                  title="Próximo"
                  onPress={() => autoCompleteAddress(props)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(0)}
                />
              </ButtonContainer>
            </Page>

            {/** RUA DA EMPRESA [200] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  Nome da <Label bold>Rua</Label>
                </Label>
                <Input
                  ref={RuaRef}
                  autoCompleteType="off"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={props.values.address}
                  onChangeText={props.handleChange('address')}
                  onBlur={props.handleBlur('address')}
                />
                {!!props.errors.address && !!props.touched.address && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.address}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('address').error}
                  color={
                    !!props.getFieldMeta('address').error ? 'black' : 'white'
                  }
                  background={
                    !!props.getFieldMeta('address').error ? 'white' : 'black'
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

            {/** BAIRRO NAME DA EMPRESA [300] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  Nome do <Label bold>bairro</Label>
                </Label>
                <Input
                  ref={BairroRef}
                  autoCapitalize="words"
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="default"
                  value={props.values.district}
                  onChangeText={props.handleChange('district')}
                  onBlur={props.handleBlur('district')}
                />
                {!!props.errors.district && !!props.touched.district && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.district}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('district').error}
                  color={
                    !!props.getFieldMeta('district').error ? 'black' : 'white'
                  }
                  background={
                    !!props.getFieldMeta('district').error ? 'white' : 'black'
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

            {/** CIDADE DA EMPRESA [400]<<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  Nome da <Label bold>cidade</Label>
                </Label>
                <Input
                  ref={CidadeRef}
                  autoCapitalize="words"
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="default"
                  value={props.values.city}
                  onChangeText={props.handleChange('city')}
                  onBlur={props.handleBlur('city')}
                />
                {!!props.errors.city && !!props.touched.city && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.city}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('city').error}
                  color={!!props.getFieldMeta('city').error ? 'black' : 'white'}
                  background={
                    !!props.getFieldMeta('city').error ? 'white' : 'black'
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

            {/** ESTADO DA EMPRESA [500] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  Nome do <Label bold>estado</Label>
                </Label>
                <Input
                  ref={EstadoRef}
                  autoCapitalize="words"
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="default"
                  value={props.values.state}
                  maxLength={2}
                  onChangeText={props.handleChange('state')}
                  onBlur={props.handleBlur('state')}
                />
                {!!props.errors.state && !!props.touched.state && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.state}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('state').error}
                  color={
                    !!props.getFieldMeta('state').error ? 'black' : 'white'
                  }
                  background={
                    !!props.getFieldMeta('state').error ? 'white' : 'black'
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

            {/** NUMERO DA EMPRESA [600] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Número</Label> do prédio
                </Label>
                <Input
                  ref={NumeroRef}
                  autoCapitalize="words"
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={props.values.number}
                  onChangeText={props.handleChange('number')}
                  onBlur={props.handleBlur('number')}
                />
                {!!props.errors.number && !!props.touched.number && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.number}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('number').error}
                  color={
                    !!props.getFieldMeta('number').error ? 'black' : 'white'
                  }
                  background={
                    !!props.getFieldMeta('number').error ? 'white' : 'black'
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

            {/** COMPLEMENTO [700] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Complemento</Label> do endereço
                </Label>
                <Input
                  ref={ComeplementoRef}
                  autoCapitalize="words"
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="default"
                  value={props.values.complement}
                  onChangeText={props.handleChange('complement')}
                  onBlur={props.handleBlur('complement')}
                />
                {!!props.errors.complement && !!props.touched.complement && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.complement}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('complement').error}
                  color={
                    !!props.getFieldMeta('complement').error ? 'black' : 'white'
                  }
                  background={
                    !!props.getFieldMeta('complement').error ? 'white' : 'black'
                  }
                  title="Próximo"
                  onPress={() => setToValue(800)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(600)}
                />
              </ButtonContainer>
            </Page>

            {/** CONFIRMAR INFORMAÇÕES [800] <<=============================== */}
            <Page>
              <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <ContainerInput style={{ paddingRight: 20, paddingBottom: 20 }}>
                  <Label bold>
                    {!!username && username.split(' ')[0] + ', '}
                    <Label>confirme as informações abaixo.</Label>
                  </Label>
                  <TextSmall>Nome da rua</TextSmall>
                  <LabelConfirm>{props.values.address}</LabelConfirm>
                  <TextSmall>Bairro</TextSmall>
                  <LabelConfirm>{props.values.district}</LabelConfirm>
                  <TextSmall>Cidade</TextSmall>
                  <LabelConfirm>{props.values.city}</LabelConfirm>
                  <TextSmall>Estado</TextSmall>
                  <LabelConfirm>{props.values.state}</LabelConfirm>
                  <TextSmall>Número</TextSmall>
                  <LabelConfirm>{props.values.number}</LabelConfirm>
                  <TextSmall>Cep da rua</TextSmall>
                  <LabelConfirm>{props.values.post_code}</LabelConfirm>
                  {!!props.values.complement && (
                    <>
                      <TextSmall>Complemento</TextSmall>
                      <LabelConfirm>{props.values.complement}</LabelConfirm>
                    </>
                  )}
                  <View style={{ paddingRight: 20 }}>
                    <TextSmall>
                      Após avançar cadastraremos os documentos.
                    </TextSmall>
                  </View>
                </ContainerInput>
                <ButtonContainer>
                  <Button
                    color={'white'}
                    background={'black'}
                    title="Salvar"
                    onPress={props.handleSubmit}
                  />
                  <Button
                    title="Voltar"
                    styles={{ marginTop: 10 }}
                    onPress={() => setToValue(700)}
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

export default RegisterCompany;
