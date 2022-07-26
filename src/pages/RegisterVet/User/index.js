import React, { useState, useRef, useEffect } from 'react';
import { metrics } from '../../../styles';
import { Formik } from 'formik';
import apiCustomer from '../../../services/apiCustomer';
import { validate as ValidarCPF } from 'gerador-validador-cpf';
import * as Yup from 'yup';

import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard
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
  TextInputMask
} from '../styles';

import Button from '../../../components/Button';
import Error from '../../../services/errors';

/**
 * REDUX
 */
import * as GeneralActions from '../../../store/modules/general/actions';
import * as UserActions from '../../../store/modules/user/actions';
import { useDispatch } from 'react-redux';

const initialValues = {
  name: '',
  document: '',
  email: '',
  password: '',
  password_confirmation: ''
};

const initialErrors = {
  name: '-',
  document: '-',
  email: '-',
  password: '-',
  password_confirmation: '-'
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required('campo obrigatório'),
  email: Yup.string()
    .email('deve ser um email válido')
    .required('campo obrigatório'),
  password: Yup.string()
    .min(6, 'minimo de 6 caracteres')
    .max(6, 'máximo de 6 caracteres')
    .required('campo obrigatório'),
  password_confirmation: Yup.string()
    .required('campo obrigatório')
    .test('passwords-match', 'As senhas devem corresponder', function(value) {
      return this.parent.password === value;
    }),
  document: Yup.string()
    .min(14, 'minimo de 11 caracteres')
    .required('campo obrigatório')
    .test('is-cpf', 'CPF está sendo usado', (value = '0') => {
      if (value && value.length >= 13) {
        let valueFormat = value.replace(/\D/g, '');
        return apiCustomer
          .get(`/check/user/document/${valueFormat}`)
          .then(result => result.data)
          .then(data => !data.exists);
      }
    })
    .test('is-valid', 'Esse cpf é inválido', (value = '0') => {
      return ValidarCPF(value);
    })
});

const offset = new Animated.Value(0);

function Register({ navigation }) {
  const NameRef = useRef(null);
  const DocumentRef = useRef(null);
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const PasswordConfirmationRef = useRef(null);

  const [toValue, setToValue] = useState(0);

  const dispatch = useDispatch();
  const AnimatedView = new Animated.createAnimatedComponent(View);

  const setFocus = toValue => {
    switch (toValue) {
      case 0:
        NameRef.current.focus();
        break;
      case 100:
        // Keyboard.dismiss();
        DocumentRef.current.focus();
        break;
      case 200:
        EmailRef.current.focus();
        break;
      case 300:
        PasswordRef.current.focus();
        break;
      case 400:
        PasswordConfirmationRef.current.focus();
        break;
      default:
        Keyboard.dismiss();
        break;
    }
  };

  useEffect(() => {
    Animated.timing(offset, {
      toValue: toValue
    }).start(() => {
      setFocus(toValue);
    });
  }, [toValue]);

  const registerRequest = values => {
    dispatch(GeneralActions.setLoading(true));
    apiCustomer
      .post('/auth/register', { person_type: 'individual', user: { ...values },user_type: "vet" })
      .then(resp => {
        dispatch(UserActions.loginRequest(values.email, values.password));
        const { token } = resp.data;
        dispatch(UserActions.setToken(token));
        navigation.navigate('REGISTER_VET_INFO');
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
            {console.tron.log(props)}
            {/** NOME DO TITULAR [0]*/}
            <Page>
              <ContainerInput>
                <Label>
                  Nome
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
                  onPress={() => navigation.navigate('REGISTER')}
                />
              </ButtonContainer>
            </Page>

            {/** DOCUMENTO DO TITULAR [100] */}
            <Page>
              <ContainerInput>
                <Label>
                  CPF
                </Label>
                <TextInputMask
                  refInput={el => {
                    DocumentRef.current = el;
                  }}
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="numbers-and-punctuation"
                  type={'cpf'}
                  value={props.values.document}
                  onChangeText={props.handleChange('document')}
                  maxLength={18}
                  onBlur={props.handleBlur('document')}
                />
                {!!props.errors.document && !!props.touched.document && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.document}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('document').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('document').error ? 'white' : 'yellow'
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

            {/** EMAIL DO TITULAR [200] */}
            <Page>
              <ContainerInput>
                <Label>
                  Email
                </Label>
                <Input
                  ref={EmailRef}
                  autoCapitalize="none"
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={props.values.email}
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                />
                {!!props.errors.email && !!props.touched.email && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.email}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('email').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('email').error ? 'white' : 'yellow'
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

            {/** PASSWORD DO TITULAR [300] */}
            <Page>
              <ContainerInput>
                <Label>
                  Senha
                </Label>
                <Input
                  secureTextEntry={true}
                  ref={PasswordRef}
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={props.values.password}
                  onChangeText={props.handleChange('password')}
                  maxLength={6}
                  minLength={6}
                  onBlur={props.handleBlur('password')}
                />
                {!!props.errors.password && !!props.touched.password && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.password}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('password').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('password').error ? 'white' : 'yellow'
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

            {/** CONFIRMAÇÃO DE SENHA DO TITULAR [400] */}
            <Page>
              <ContainerInput>
                <Label>
                  Confirmação da senha
                </Label>
                <Input
                  ref={PasswordConfirmationRef}
                  secureTextEntry={true}
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={props.values.password_confirmation}
                  onChangeText={props.handleChange('password_confirmation')}
                  maxLength={6}
                  minLength={6}
                  onBlur={props.handleBlur('password_confirmation')}
                />
                {!!props.errors.password_confirmation &&
                  !!props.touched.password_confirmation && (
                    <TextError style={{ color: '#000', alignSelf: 'center' }}>
                      {props.errors.password_confirmation}
                    </TextError>
                  )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('password_confirmation').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('password_confirmation').error
                      ? 'white'
                      : 'yellow'
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

            {/** CONFIRMAR INFORMAÇÕES [500]<<=============================== */}
            <Page>
              <ContainerInput style={{ paddingRight: 20 }}>
                <Label bold>
                  {props.values.name.split(' ')[0]},{' '}
                  <Label>confirme as informações abaixo.</Label>
                </Label>
                <TextSmall bold>Nome</TextSmall>
                <LabelConfirm>{props.values.name}</LabelConfirm>
                <TextSmall bold>Email</TextSmall>
                <LabelConfirm>{props.values.email}</LabelConfirm>
                <TextSmall bold>CPF</TextSmall>
                <LabelConfirm>{props.values.document}</LabelConfirm>
                <View style={{ paddingRight: 20 }}>
                  <TextSmall color="#F6BE67" bold>
                    Após avançar cadastraremos os seus dados adicionais.
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
                  onPress={() => setToValue(400)}
                />
              </ButtonContainer>
            </Page>
          </AnimatedView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default Register;
