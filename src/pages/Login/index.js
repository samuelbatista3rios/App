import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import {
  Label,
  Container,
  ContainerInputs,
  Input,
  TextError,
  ContainerButtons
} from './styles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

/**
 * REDUX
 */
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../store/modules/user/actions';
import { colors } from '../../styles';

const initialValues = {
  username: 'rafaelgurudesign@gmail.com',
  password: '123456',
  // username: '',
  // password: '',
  notification_token: ''
};

const initialErrors = {
  username: '',
  password: '',
};

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .email('email inválido')
    .required('campo obrigatório'),
  password: Yup.string().required('campo obrigatório')
});

function Login({ navigation }) {
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);

  login = ({ username, password, notification_token }, { resetForm }) => {
    inputEl.current.blur()
    dispatch(loginRequest(username, password, notification_token));
    resetForm({});
  };

  const nextInput = () => {
    inputEl.current.focus();
  };

  const getToken = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus == 'granted') {
      let token = await Notifications.getExpoPushTokenAsync();
      initialValues.notification_token = token;
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <Formik
        onSubmit={login}
        initialValues={initialValues}
        validationSchema={loginSchema}
        initialErrors={initialErrors}
        initialTouched={initialValues}
      >
        {props => (
          <>
            <Container>
              <Header title="Login" />
              {/** LOGIN  <<=============================== */}
              <ContainerInputs>
                <Label>
                  Seu <Label bold>email</Label>
                </Label>
                <Input
                  error={props.errors.username && props.touched.username}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={props.values.username}
                  onChangeText={props.handleChange('username')}
                  onBlur={props.handleBlur('username')}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={nextInput}
                />
                <Label>
                  Sua <Label bold>senha</Label>
                </Label>
                <Input
                  ref={inputEl}
                  secureTextEntry
                  value={props.values.password}
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  returnKeyType="send"
                  keyboardType="numeric"
                  onSubmitEditing={props.handleSubmit}
                />
              </ContainerInputs>
              <ContainerButtons>
                <Button
                  loading={loading}
                  disable={
                    !(
                      !props.getFieldMeta('username').error &&
                      props.getFieldMeta('username').touched
                    )
                  }
                  color={
                    !props.getFieldMeta('username').error &&
                    props.getFieldMeta('username').touched
                      ? 'white'
                      : 'black'
                  }
                  background={
                    !props.getFieldMeta('username').error &&
                    props.getFieldMeta('username').touched
                      ? 'black'
                      : 'white'
                  }
                  title="Entrar"
                  onPress={props.handleSubmit}
                />
              </ContainerButtons>
              <SafeAreaView />
            </Container>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default Login;
