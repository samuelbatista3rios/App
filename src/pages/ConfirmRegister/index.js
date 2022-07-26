import React, { useRef } from 'react';
import { metrics,colors } from '../../styles';
import { Formik } from 'formik';
import apiCustomer from '../../services/apiCustomer';
import { Dimensions, SafeAreaView } from 'react-native';
import { View, KeyboardAvoidingView, Animated } from 'react-native';
import Button from '../../components/Button';
/**
 * IMAGES
 */
import CodePin from 'react-native-pin-code';
import { Container, Label, TextSmall, TextLarge } from './styles';

const { width } = Dimensions.get('window');

const ConfirmRegister = ({ navigation }) => {
  const AnimatedView = new Animated.createAnimatedComponent(View);
  const pinRef = useRef();
  const offset = useRef(new Animated.Value(0)).current;
  let value = 0;
  const next = () => {
    Animated.timing(offset, {
      toValue: value + 100,
      useNativeDriver: true
    }).start(() => {});
  };

  confirmCode = (code, callback) => {
    let username = navigation.getParam('username');
    apiCustomer
      .post('/register/confirm', {code })
      .then(resp => {
        callback(true);
        pinRef.current.clean();
      })
      .catch(error => {
        if (error.response) {
          callback(false);
        }
      });
  };

  requestNewCode = () => {
    apiCustomer.get('/register/request/confirm');
  };

  return (
    <>
      <Formik>
        {props => (
          <View style={{ flex: 1, overflow: 'hidden' }}>
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
              {/** CONFIRMARR  <<=============================== */}
              <KeyboardAvoidingView behavior="padding">
                <Container>
                  <Label>
                    Enviamos um <Label bold>email</Label> com o{' '}
                    <Label bold>código</Label> de ativação
                  </Label>
                  <CodePin
                    ref={ref => {
                      pinRef.current = ref;
                    }}
                    autoFocusFirst={false}
                    keyboardType="numeric"
                    number={6}
                    checkPinCode={confirmCode}
                    success={() => {
                      setTimeout(() => next(), 400);
                    }}
                    text=""
                    error="Codigo inválido"
                    containerStyle={{
                      height: 130,
                      width: width,
                      alignItems: 'center',
                      backgroundColor: colors.blue4,
                    }}
                    containerPinStyle={{
                      width: width - 30,
                      height: 100,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginTop: 2,
                      backgroundColor:colors.blue4,
                    }}
                    pinStyle={{
                      backgroundColor: colors.white,
                      textAlign: 'center',
                      flex: 1,
                      marginLeft: 5,
                      marginRight: 5,
                      borderRadius: 5,
                      shadowColor: '#000000',
                      shadowOffset: { width: 1, height: 1 },
                      shadowRadius: 5,
                      shadowOpacity: 0.13,
                      height: 63,
                      color: '#454444',
                      fontSize: 20
                    }}
                    textStyle={{
                      textAlign: 'center',
                      color: 'gray',
                      fontSize: 20,
                      marginTop: 0
                    }}
                    errorStyle={{
                      textAlign: 'center',
                      color: 'red',
                      paddingTop: 0
                    }}
                  />
                  <TextSmall onPress={requestNewCode}>
                    reenviar código
                  </TextSmall>
                </Container>
                <View style={{ padding: 20, backgroundColor: colors.blue4 }}>
                  <Button
                    background="black"
                    color="white"
                    title="Voltar"
                    styles={{ marginTop: 0 }}
                    onPress={() => navigation.navigate('LOGIN')}
                  />
                </View>
                <SafeAreaView />
              </KeyboardAvoidingView>

              {/** CONFIRMADO  <<=============================== */}
              <Container>
                <View style={{ flex: 1 }}>
                  <Label>
                    Seu cadastro foi <Label bold>confirmado</Label>
                  </Label>
                </View>
                <View style={{ padding: 20 }}>
                  <Button
                    title="Entrar"
                    styles={{ marginTop: 0 }}
                    onPress={() => navigation.navigate('LOGIN')}
                    color="white"
                    background="black"
                  />
                </View>
                <SafeAreaView />
              </Container>
            </AnimatedView>
          </View>
        )}
      </Formik>
    </>
  );
};

export default ConfirmRegister;
