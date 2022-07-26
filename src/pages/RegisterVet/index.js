import React, { useState, useEffect, useRef } from 'react';
import { metrics, colors } from '../../styles';
import Icon from '@expo/vector-icons/FontAwesome';
import { Formik, Form } from 'formik';
import apiCustomer from '../../services/apiCustomer';
import apiCep from '../../services/apiCep';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';
import {
  View,
  Image,
  Animated,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import Styles from './styles';
import Button from '../../components/Button';

/**
 * IMAGES
 */
import BlueBubble from '../../assets/bubble_blue.png';
import YellowBubbleSplash from '../../assets/yellow_splash.png';
import BlackBubbleSplash from '../../assets/black_splash.png';
import Woman2 from '../../assets/woman2.png';
import SuccessBackground from '../../assets/success_background.png';
import SuccessHand from '../../assets/success_hand.png';
import SuccessFinger from '../../assets/success_finger.png';
import SuccessQuestion from '../../assets/success_question.png';
import { Platform } from '@unimodules/core';

/**
 * REDUX
 */
import * as GeneralActions from '../../store/modules/general/actions';
import { useDispatch } from 'react-redux';

const initialValues = {
  client: {
    name: '',
    document: '',
    legal_name: ''
  },
  address: {
    post_code: '',
    address: '',
    district: '',
    city: '',
    state: '',
    number: '',
    complement: ''
  },
  user: {
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    document: ''
  },
  document_people: [],
  document_company: [],
  proof_residence: [],
  person_type: 'company'
};

const registerSchema = Yup.object().shape({
  //client is a company and user is the boss
  client: Yup.object().shape({
    name: Yup.string()
      .min(8, 'muito pequeno')
      .required('campo obrigatório'),
    document: Yup.string()
      .min(18, 'no mínimo 12 caracteres')
      .required('campo obrigatório')
      .test('is-cnpj', 'CNPJ está sendo usado', value => {
        if (value && value.length >= 18) {
          let valueFormat = value.replace(/\D/g, '');
          return apiCustomer
            .get(`/check/client/document/${valueFormat}`)
            .then(result => result.data)
            .then(data => !data.exists);
        }
      }),
    legal_name: Yup.string().required('campo obrigatório')
  }),
  address: Yup.object().shape({
    post_code: Yup.string()
      .min(9, 'minimo de 8 caracteres')
      .required('campo obrigatório'),
    address: Yup.string().required('campo obrigatório'),
    district: Yup.string().required('campo obrigatório'),
    city: Yup.string().required('campo obrigatório'),
    number: Yup.string().required('campo obrigatório')
  }),
  user: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('campo obrigatório'),
    password: Yup.string()
      .min(8, 'minimo de 8 caracteres')
      .required('campo obrigatório'),
    password_confirmation: Yup.string()
      .required('campo obrigatório')
      .test('passwords-match', 'As senhas devem corresponder', function(value) {
        return this.parent.password === value;
      }),
    name: Yup.string().required('campo obrigatório'),
    document: Yup.string()
      .min(14, 'minimo de 11 caracteres')
      .required('campo obrigatório')
      .test('is-cpf', 'CPF está sendo usado', value => {
        if (value && value.length >= 14) {
          let valueFormat = value.replace(/\D/g, '');
          return apiCustomer
            .get(`/check/user/document/${valueFormat}`)
            .then(result => result.data)
            .then(data => !data.exists);
        }
      })
  }),
  document_people: Yup.array().of(Yup.string()),
  document_company: Yup.array().of(Yup.string()),
  proof_residence: Yup.array().of(Yup.string())
});

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const AnimatedView = new Animated.createAnimatedComponent(View);
  const [permission, setPermission] = useState(false);
  const [success, setSuccess] = useState(false);
  const offset = useRef(new Animated.Value(0)).current;
  let value = 0;
  const next = () => {
    Animated.timing(offset, {
      toValue: value + 100,
      useNativeDriver: true
    }).start(() => {
      value = value + 100;
    });
  };
  const prev = () => {
    Animated.timing(offset, {
      toValue: value - 100,
      useNativeDriver: true
    }).start(() => {
      value = value - 100;
    });
  };

  useEffect(() => {
    getPermission();
  }, []);

  getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      setPermission(true);
    } else {
      setPermission(false);
    }
  };

  autoCompleteAddress = props => {
    const { address } = props.values;
    let cep = address.post_code.replace(/\D/g, '');
    apiCep
      .getAddress(cep)
      .then(result => result.data)
      .then(result => {
        props.setFieldValue('address.address', result.logradouro);
        props.setFieldTouched('address.address', true);
        props.setFieldValue('address.district', result.bairro);
        props.setFieldTouched('address.district', true);
        props.setFieldValue('address.city', result.localidade);
        props.setFieldTouched('address.city', true);
        props.setFieldValue('address.state', result.uf);
        props.setFieldTouched('address.state', true);
        props.setFieldTouched('address.complement', true);

        next();
      })
      .catch(error => {
        if (error.response) {
          Alert.alert('CEP inválido, tente outro cep');
        }
      });
  };

  deleteImage = (index, from, props) => {
    let values = props.values;
    values[from] = values[from].filter((name, i) => i !== index);
    props.setValues(values);
  };

  openModalToSelectImage = async (inputName, props) => {
    if (!permission) {
      return getPermission();
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true
    });
    if (!result.cancelled) {
      const values = props.values;
      values[inputName].push(`data:image/jpg;base64,${result.base64}`);
      props.setValues(values);
    }
  };

  registerRequest = values => {
    dispatch(GeneralActions.setLoading(true));

    apiCustomer
      .post('/auth/signup', values)
      .then(resp => {
        navigation.navigate('CONFIRMREGISTER', { username: values.user.email });
      })
      .catch(err => {
        if (error.response) {
          console.tron.log(error.response);
        }
        Alert.alert('Algum problema aconteceu');
      })
      .finally(() => {
        dispatch(GeneralActions.setLoading(false));
      });
  };
  renderTopImages = (name, bubble) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={Styles.backButton}
        >
          <Icon name="angle-left" size={20} color={colors.black} />
        </TouchableOpacity>
        <Image
          source={bubble ? YellowBubbleSplash : BlackBubbleSplash}
          resizeMode="contain"
          style={{ height: 302 }}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <Formik
          onSubmit={values => registerRequest(values)}
          initialValues={initialValues}
          validationSchema={registerSchema}
          initialErrors={initialValues}
          initialTouched={initialValues}
        >
          {props => (
            <AnimatedView
              style={{
                flex: 1,
                flexDirection: 'row',
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
              {/** NOME DA EMPRESA <<=============================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Nome da Fantasia
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. Futuro Technology"
                    value={props.values.client.name}
                    onChangeText={props.handleChange('client.name')}
                    onBlur={props.handleBlur('client.name')}
                  />
                  {!!props.errors.client &&
                    !!props.errors.client.name &&
                    !!props.touched.client.name && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.client.name || ''}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('client.name').error &&
                          props.getFieldMeta('client.name').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('client.name').error &&
                        props.getFieldMeta('client.name').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('client.name').error &&
                        props.getFieldMeta('client.name').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={() => navigation.navigate('WELCOME')}
                    />
                  </View>
                </View>
              </View>

              {/** DOCUMENTO DA EMPRESA <<=============================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    CNPJ da empresa
                  </Text>
                  <TextInputMask
                    ref={ref => (this._cnpjRef = ref)}
                    returnKeyType="done"
                    type={'cnpj'}
                    style={Styles.input}
                    placeholder="Ex. 28.777.814/0001-56"
                    value={props.values.client.document}
                    onChangeText={props.handleChange('client.document')}
                    maxLength={18}
                    onBlur={props.handleBlur('client.document')}
                  />
                  {!!props.errors.client &&
                    !!props.errors.client.document &&
                    !!props.touched.client.document && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.client.document}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('client.document').error &&
                          props.getFieldMeta('client.document').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('client.document').error &&
                        props.getFieldMeta('client.document').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('client.document').error &&
                        props.getFieldMeta('client.document').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 20 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** NOME LEGAL DA EMPRESA <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Razão Social
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. Futuro Technology LLC"
                    value={props.values.client.legal_name}
                    onChangeText={props.handleChange('client.legal_name')}
                    onBlur={props.handleBlur('client.legal_name')}
                  />
                  {!!props.errors.client &&
                    !!props.errors.client.legal_name &&
                    !!props.touched.client.legal_name && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.client.legal_name}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('client.legal_name').error &&
                          props.getFieldMeta('client.legal_name').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('client.legal_name').error &&
                        props.getFieldMeta('client.legal_name').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('client.legal_name').error &&
                        props.getFieldMeta('client.legal_name').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** CEP - CODIGO POSTAL <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Seu CEP
                  </Text>
                  <TextInputMask
                    style={Styles.input}
                    type={'zip-code'}
                    returnKeyType="done"
                    placeholder="Ex. 99999-999"
                    value={props.values.address.post_code}
                    onChangeText={props.handleChange('address.post_code')}
                    onBlur={props.handleBlur('address.post_code')}
                    maxLength={9}
                  />
                  {!!props.errors.address &&
                    !!props.errors.address.post_code &&
                    !!props.touched.address.post_code && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.address.post_code}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('address.post_code').error &&
                          props.getFieldMeta('address.post_code').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('address.post_code').error &&
                        props.getFieldMeta('address.post_code').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('address.post_code').error &&
                        props.getFieldMeta('address.post_code').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={() => autoCompleteAddress(props)}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** NOME DA RUA <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Nome da sua rua
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. Rua Dom Pedro"
                    value={props.values.address.address}
                    onChangeText={props.handleChange('address.address')}
                    onBlur={props.handleBlur('address.address')}
                    editable={props.values.address.address == ''}
                  />
                  {!!props.errors.address &&
                    !!props.errors.address.address &&
                    !!props.touched.address.address && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.address.address}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('address.address').error &&
                          props.getFieldMeta('address.address').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('address.address').error &&
                        props.getFieldMeta('address.address').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('address.address').error &&
                        props.getFieldMeta('address.address').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** NOME DO BAIRRO <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Bairro
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. Centro"
                    value={props.values.address.district}
                    onChangeText={props.handleChange('address.district')}
                    onBlur={props.handleBlur('address.district')}
                    editable={props.values.address.district == ''}
                  />
                  {!!props.errors.address &&
                    !!props.errors.address.district &&
                    !!props.touched.address.district && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.address.district}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('address.district').error &&
                          props.getFieldMeta('address.district').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('address.district').error &&
                        props.getFieldMeta('address.district').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('address.district').error &&
                        props.getFieldMeta('address.district').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** NOME DA CIDADE <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Nome da Cidade
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. Campinas"
                    value={props.values.address.city}
                    onChangeText={props.handleChange('address.city')}
                    onBlur={props.handleBlur('address.city')}
                    editable={props.values.address.city == ''}
                  />
                  {!!props.errors.address &&
                    !!props.errors.address.city &&
                    !!props.touched.address.city && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.address.city}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('address.city').error &&
                          props.getFieldMeta('address.city').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('address.city').error &&
                        props.getFieldMeta('address.city').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('address.city').error &&
                        props.getFieldMeta('address.city').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** NOME DO ESTADO <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Nome do Estado
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. Salvador"
                    value={props.values.address.state}
                    onChangeText={props.handleChange('address.state')}
                    onBlur={props.handleBlur('address.state')}
                    editable={props.values.address.state == ''}
                  />
                  {!!props.errors.address &&
                    !!props.errors.address.state &&
                    !!props.touched.address.state && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.address.state}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('address.state').error &&
                          props.getFieldMeta('address.state').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('address.state').error &&
                        props.getFieldMeta('address.state').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('address.state').error &&
                        props.getFieldMeta('address.state').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** NUMERO DA RESIDENCIA <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Número da residência
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. 200"
                    value={props.values.address.number}
                    onChangeText={props.handleChange('address.number')}
                    onBlur={props.handleBlur('address.number')}
                  />
                  {!!props.errors.address &&
                    !!props.errors.address.number &&
                    !!props.touched.address.number && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.address.number}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('address.number').error &&
                          props.getFieldMeta('address.number').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('address.number').error &&
                        props.getFieldMeta('address.number').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('address.number').error &&
                        props.getFieldMeta('address.number').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** NUMERO DA RESIDENCIA <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages()}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Complemento
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. Casa px a farmacia"
                    value={props.values.address.complement}
                    onChangeText={props.handleChange('address.complement')}
                    onBlur={props.handleBlur('address.complement')}
                  />
                  {!!props.errors.address &&
                    !!props.errors.address.complement &&
                    !!props.touched.address.complement && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.address.complement}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('address.complement').error &&
                          props.getFieldMeta('address.complement').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('address.complement').error &&
                        props.getFieldMeta('address.complement').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('address.complement').error &&
                        props.getFieldMeta('address.complement').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** EMAIL DO USUÁRIO <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages(Woman2, BlueBubble)}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Email
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. futuro@technology.com"
                    value={props.values.user.email}
                    onChangeText={props.handleChange('user.email')}
                    onBlur={props.handleBlur('user.email')}
                    keyboardType="email-address"
                  />
                  {!!props.errors.user &&
                    !!props.errors.user.email &&
                    !!props.touched.user.email && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.user.email}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('user.email').error &&
                          props.getFieldMeta('user.email').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('user.email').error &&
                        props.getFieldMeta('user.email').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('user.email').error &&
                        props.getFieldMeta('user.email').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** PASSWORD DO USUÁRIO <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages(Woman2, BlueBubble)}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Senha
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="********"
                    value={props.values.user.password}
                    onChangeText={props.handleChange('user.password')}
                    onBlur={props.handleBlur('user.password')}
                    secureTextEntry
                  />
                  {!!props.errors.user &&
                    !!props.errors.user.password &&
                    !!props.touched.user.password && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.user.password}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('user.password').error &&
                          props.getFieldMeta('user.password').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('user.password').error &&
                        props.getFieldMeta('user.password').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('user.password').error &&
                        props.getFieldMeta('user.password').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** CONFIRMAÇÃO DO PASSWORD DO USUÁRIO <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages(Woman2, BlueBubble)}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Confirmação de senha
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="********"
                    value={props.values.user.password_confirmation}
                    onChangeText={props.handleChange(
                      'user.password_confirmation'
                    )}
                    onBlur={props.handleBlur('user.password_confirmation')}
                    secureTextEntry
                  />
                  {!!props.errors.user &&
                    !!props.errors.user.password_confirmation &&
                    !!props.touched.user.password_confirmation && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.user.password_confirmation}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('user.password_confirmation')
                            .error &&
                          props.getFieldMeta('user.password_confirmation')
                            .touched
                        )
                      }
                      color={
                        !props.getFieldMeta('user.password_confirmation')
                          .error &&
                        props.getFieldMeta('user.password_confirmation').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('user.password_confirmation')
                          .error &&
                        props.getFieldMeta('user.password_confirmation').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** NOME DO USUÁRIO <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages(Woman2, BlueBubble)}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Seu nome
                  </Text>
                  <TextInput
                    style={Styles.input}
                    placeholder="Ex. Jose Gurgel"
                    value={props.values.user.name}
                    onChangeText={props.handleChange('user.name')}
                    onBlur={props.handleBlur('user.name')}
                  />
                  {!!props.errors.user &&
                    !!props.errors.user.name &&
                    !!props.touched.user.name && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.user.name}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('user.name').error &&
                          props.getFieldMeta('user.name').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('user.name').error &&
                        props.getFieldMeta('user.name').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('user.name').error &&
                        props.getFieldMeta('user.name').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>
              {/** NUMERO DOCUMENTO DO USUÁRIO <<===================== */}
              <View
                style={{
                  height: '100%',
                  width: metrics.width,
                  overflow: 'hidden'
                }}
              >
                {renderTopImages(Woman2, BlueBubble)}
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingTop: 20
                  }}
                >
                  <Text style={Styles.largeText} onPress={prev}>
                    Seu CPF
                  </Text>
                  <TextInputMask
                    returnKeyType="done"
                    type={'cpf'}
                    style={Styles.input}
                    placeholder="Ex. 123.321.123-22"
                    value={props.values.user.document}
                    onChangeText={props.handleChange('user.document')}
                    onBlur={props.handleBlur('user.document')}
                    maxLength={14}
                  />
                  {!!props.errors.user &&
                    !!props.errors.user.document &&
                    !!props.touched.user.document && (
                      <Text style={{ color: '#000', alignSelf: 'center' }}>
                        {props.errors.user.document}
                      </Text>
                    )}
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Button
                      disable={
                        !(
                          !props.getFieldMeta('user.document').error &&
                          props.getFieldMeta('user.document').touched
                        )
                      }
                      color={
                        !props.getFieldMeta('user.document').error &&
                        props.getFieldMeta('user.document').touched
                          ? 'white'
                          : 'black'
                      }
                      background={
                        !props.getFieldMeta('user.document').error &&
                        props.getFieldMeta('user.document').touched
                          ? 'black'
                          : 'white'
                      }
                      title="Próximo"
                      onPress={next}
                    />
                    <Button
                      title="Voltar"
                      styles={{ marginTop: 10 }}
                      onPress={prev}
                    />
                  </View>
                </View>
              </View>

              {/** FILE UPLOAD */}
              <View style={{ width: metrics.width, overflow: 'hidden' }}>
                <View style={Styles.fileUploadContainer}>
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        ...Styles.largeText,
                        color: '#fff',
                        marginBottom: 20,
                        fontSize: 25
                      }}
                    >
                      Você esta quase lá :)
                    </Text>
                    <Text
                      style={{
                        ...Styles.smallText,
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      agora precisamos de seus documentos para confirmar as
                      informações
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={Styles.fileUploadButton}
                      onPress={() =>
                        openModalToSelectImage('document_people', props)
                      }
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            width: '30%',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icon name="id-badge" size={50} color="#fff" />
                        </View>
                        <View style={{ width: '70%' }}>
                          <Text
                            style={{
                              ...Styles.smallText,
                              color: '#fff',
                              fontWeight: 'bold',
                              marginBottom: 10
                            }}
                          >
                            Documento de identidade
                          </Text>
                          <Text style={{ ...Styles.smallText, color: '#fff' }}>
                            Use um ou mais documentos de identidade com foto.
                            Lembre-se, a foto deve ter uma qualidade boa.
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          flexWrap: 'wrap',
                          alignItems: 'center'
                        }}
                      >
                        {props.values.document_people.map((uri, index) => (
                          <View key={index}>
                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                top: -2,
                                right: -8,
                                zIndex: 100
                              }}
                              onPress={() =>
                                deleteImage(index, 'document_people', props)
                              }
                            >
                              <Icon name="close" size={20} color={colors.red} />
                            </TouchableOpacity>

                            <Image
                              source={{ uri }}
                              style={{
                                width: 50,
                                height: 70,
                                marginTop: 10,
                                marginLeft: 10
                              }}
                            />
                          </View>
                        ))}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={Styles.fileUploadButton}
                      onPress={() =>
                        openModalToSelectImage('document_company', props)
                      }
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            width: '30%',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: '#fff',
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Icon name="building" size={40} color="#8CC1C4" />
                          </View>
                        </View>
                        <View style={{ width: '70%' }}>
                          <Text
                            style={{
                              ...Styles.smallText,
                              color: '#fff',
                              fontWeight: 'bold',
                              marginBottom: 10
                            }}
                          >
                            Contrato social
                          </Text>
                          <Text style={{ ...Styles.smallText, color: '#fff' }}>
                            Contrato social da empresa que você cadastrou nos
                            passos anteriores
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          flexWrap: 'wrap',
                          alignItems: 'center'
                        }}
                      >
                        {props.values.document_company.map((uri, index) => (
                          <View key={index}>
                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                top: -2,
                                right: -8,
                                zIndex: 100
                              }}
                              onPress={() =>
                                deleteImage(index, 'document_company', props)
                              }
                            >
                              <Icon name="close" size={20} color={colors.red} />
                            </TouchableOpacity>

                            <Image
                              source={{ uri }}
                              style={{
                                width: 50,
                                height: 70,
                                marginTop: 10,
                                marginLeft: 10
                              }}
                            />
                          </View>
                        ))}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={Styles.fileUploadButton}
                      onPress={() =>
                        openModalToSelectImage('proof_residence', props)
                      }
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            width: '30%',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: '#fff',
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Icon name="map-marker" size={40} color="#8CC1C4" />
                          </View>
                        </View>
                        <View style={{ width: '70%' }}>
                          <Text
                            style={{
                              ...Styles.smallText,
                              color: '#fff',
                              fontWeight: 'bold',
                              marginBottom: 10
                            }}
                          >
                            Comprovante de endereço
                          </Text>
                          <Text style={{ ...Styles.smallText, color: '#fff' }}>
                            Pode ser uma conta de água ou energia com emissão de
                            até três mêses atrás
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          flexWrap: 'wrap',
                          alignItems: 'center'
                        }}
                      >
                        {props.values.proof_residence.map((uri, index) => (
                          <View key={index}>
                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                top: -2,
                                right: -8,
                                zIndex: 100
                              }}
                              onPress={() =>
                                deleteImage(index, 'proof_residence', props)
                              }
                            >
                              <Icon name="close" size={20} color={colors.red} />
                            </TouchableOpacity>

                            <Image
                              source={{ uri }}
                              style={{
                                width: 50,
                                height: 70,
                                marginTop: 10,
                                marginLeft: 10
                              }}
                            />
                          </View>
                        ))}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: colors.success,
                    padding: 20
                  }}
                >
                  {props.values.document_people.length > 0 &&
                    props.values.document_company.length > 0 &&
                    props.values.proof_residence.length > 0 && (
                      <Button title="Enviar" onPress={props.handleSubmit} />
                    )}
                </View>
              </View>
              {/** SCREEN SUCCESS */}
              <View style={{ width: metrics.width, overflow: 'hidden' }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    justifyContent: 'center'
                  }}
                >
                  <View style={Styles.successCard}>
                    <Text
                      style={{ marginTop: 10, color: colors.green }}
                      onPress={() => navigation.goBack()}
                    >
                      Voltar
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                      <Image source={SuccessQuestion} />
                      <Text style={{ color: 'rgba(0,0,0,0.5)' }}>
                        Seu cadastro está em análise
                      </Text>
                    </View>
                    <View></View>
                    <View></View>
                    <Image
                      source={SuccessFinger}
                      style={{
                        position: 'absolute',
                        bottom: '-15%',
                        left: '-25%',
                        transform: [{ rotateZ: '5deg' }]
                      }}
                    />
                  </View>
                  <Image
                    source={SuccessBackground}
                    style={{ position: 'absolute', bottom: 0, zIndex: -10 }}
                  />
                  <Image
                    source={SuccessHand}
                    style={{
                      position: 'absolute',
                      bottom: '-15%',
                      left: '-25%',
                      zIndex: -9,
                      transform: [{ rotateZ: '10deg' }]
                    }}
                  />
                </View>
              </View>
            </AnimatedView>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
