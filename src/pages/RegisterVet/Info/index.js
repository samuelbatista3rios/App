import React, { useRef, useState, useEffect } from 'react';
import { metrics } from '../../../styles';
import { Formik } from 'formik';
import apiCNPJ from '../../../services/apiCNPJ';
import apiCustomer from '../../../services/apiCustomer';
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
import * as UserActions from '../../../store/modules/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from "react-native-modal-datetime-picker";

const initialValues = {
  univercity: '',
  crmv: '',
  birth_date:'2016-05-15'
};

const initialErrors = {
  univercity: '-',
  crmv: '-',
  birth_date:'-'
};

const registerSchema = Yup.object().shape({
  univercity: Yup.string().required('campo obrigatório'),
  crmv: Yup.string().required('campo obrigatório'),
  birth_date: Yup.string().required('campo obrigatório').min(10).max(10)
});

const AnimatedView = new Animated.createAnimatedComponent(View);
const offset = new Animated.Value(0);

function RegisterVetInfo({ navigation }) {
  const UnivercityRef = useRef(null);
  const CRVMRef = useRef(null);
  const BirthDateRef = useRef(null);
  const username = useSelector(state => state.user.data.name);
  const dispatch = useDispatch();
  let birth_date = "2016-05-15"
  let isDateTimePickerVisible = false;

  const [toValue, setToValue] = useState(0);

  const setFocus = value => {
    switch (value) {
      case 100:
        UnivercityRef.current.focus();
        break;
      case 200:
        CRVMRef.current.focus();
      break;
      case 300:
        BirthDateRef.current.focus();
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
      .post('/register/vet', {
        client: { ...values }
      })
      .then(resp => {
        const { token } = resp.data;
        dispatch(UserActions.setToken(token));
        navigation.navigate('REGISTER_VET_ADDRESS');
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
            {/** CONFIRMAR INFORMAÇÕES [0] <<=============================== */}
            <Page>
              <ContainerInput style={{paddingHorizontal:5}}>
                <Label bold>
                  {!!username && username.split(' ')[0]}{' '}
                  <Label>agora vamos cadastrar suas informações profissionais.</Label>
                </Label>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  color={'white'}
                  background={'black'}
                  title={'Próximo'}
                  onPress={() => setToValue(100)}
                />
                <Button
                  title="Sair"
                  styles={{ marginTop: 10 }}
                  onPress={() => navigation.navigate('LOGIN')}
                />
              </ButtonContainer>
            </Page>

            {/** NOME DA EMPRESA [100] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  Nome da faculdade
                </Label>
                <Input
                  ref={UnivercityRef}
                  autoCompleteType="off"
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(date) => props.setFieldValue('univercity',date)}
                  onBlur={props.handleBlur('univercity')}
                />
                {!!props.errors.univercity && !!props.touched.univercity && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.univercity}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('univercity').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('univercity').error ? 'white' : 'yellow'
                  }
                  title={'Próximo'}
                  onPress={() => setToValue(200)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(0)}
                />
              </ButtonContainer>
            </Page>

            {/** DOCUMENTO DO TITULAR [200] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Seu</Label> CRMV com UF
                </Label>
                <Input
                 ref={CRVMRef}
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="numbers-and-punctuation"
                  value={props.values.crmv}
                  onChangeText={props.handleChange('crmv')}
                  maxLength={18}
                  onBlur={props.handleBlur('crmv')}
                />
                {!!props.errors.crmv && !!props.touched.crmv && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.crmv}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('crmv').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('crmv').error ? 'white' : 'yellow'
                  }
                  title={'Próximo'}
                  onPress={() => setToValue(300)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(100)}
                />
              </ButtonContainer>
            </Page>

            {/** LEGAL NAME DA EMPRESA [300] <<=============================== */}
            <Page>
              <ContainerInput>
                <Label>
                  <Label bold>Sua</Label> Data de nascimento
                </Label>
                <TextInputMask
                  refInput={el => {
                    BirthDateRef.current = el;
                  }}
                  options={{
                    format: 'DD/MM/YYYY'
                  }}
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="numbers-and-punctuation"
                  type={'datetime'}
                  value={props.values.birth_date}
                  onChangeText={props.handleChange('birth_date')}
                  maxLength={10}
                  onBlur={props.handleBlur('birth_date')}
                />
                
                {!!props.errors.birth_date && !!props.touched.birth_date && (
                  <TextError style={{ color: '#000', alignSelf: 'center' }}>
                    {props.errors.birth_date}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={!!props.getFieldMeta('birth_date').error}
                  color={'black'}
                  background={
                    !!props.getFieldMeta('birth_date').error ? 'white' : 'yellow'
                  }
                  title={'Próximo'}
                  onPress={() => setToValue(400)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(200)}
                />
              </ButtonContainer>
            </Page>

            {/** CONFIRMAR INFORMAÇÕES [400] <<=============================== */}
            <Page>
              <ContainerInput style={{ paddingRight: 20 }}>
                <Label bold>
                  {!!username && username.split(' ')[0]},{' '}
                  <Label>confirme as informações abaixo.</Label>
                </Label>
                <TextSmall>Nome da faculdade</TextSmall>
                <View>
                  <LabelConfirm>{props.values.univercity}</LabelConfirm>
                  <TextSmall>CRMV</TextSmall>
                </View>
                <LabelConfirm>{props.values.crmv}</LabelConfirm>
                <TextSmall>Data de nascimento</TextSmall>
                <LabelConfirm>{props.values.birth_date}</LabelConfirm>
                <View style={{ paddingRight: 20 }}>
                  <TextSmall>
                    Após avançar cadastraremos o seu endereço.
                  </TextSmall>
                </View>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  color={'white'}
                  background={'black'}
                  title={'Salvar'}
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

export default RegisterVetInfo;
