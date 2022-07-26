import React, { useState, useRef, useEffect } from "react";
import { metrics, ListContainer } from "../../../styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Slider from "react-native-slider";
import MapView from "react-native-maps";
import { CalendarList, Calendar, LocaleConfig } from "react-native-calendars";

import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Picker,
  ScrollView,
  Text,
  Alert,
} from "react-native";

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
  Image,
  ContainerListAgend,
  ItemAgend,
  Separator,
  TextDate,
  TextHour,
  ContainerCreditCard,
  InnerCreditCard,
  LogoCreditCard,
  TextCreditCard,
} from "./styles";

import Button from "../../../components/Button";
import Error from "../../../services/errors";

/**
 * REDUX
 */
import * as GeneralActions from "../../../store/modules/general/actions";
import { useDispatch, useSelector } from "react-redux";
import * as AddressActions from "../../../store/modules/address/actions";
import * as ScheduleActions from "../../../store/modules/schedule/actions";
import * as ServiceActions from "../../../store/modules/services/actions";
import { useNavigation } from "react-navigation-hooks";

import Carousel from "react-native-snap-carousel";
import CardAddress from "../../../components/CardAddress";
import CardPet from "../../../components/CardPet";
import logomaster from "../../../assets/mastercard.png";
import { TouchableOpacity } from "react-native-gesture-handler";

const initialValues = {
  address: "",
  specialty: "",
  service: null,
  serviceKey: "",
  radius: 0,
};

const initialErrors = {
  address: "-",
  specialty: "-",
  service: "-",
  radius: 0,
};

const registerSchema = Yup.object().shape({
  address: Yup.string().required("campo obrigatório"),
});

const offset = new Animated.Value(0);

LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jab",
    "Fev.",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out.",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt";

function Register({ navigation }) {
  const dispatch = useDispatch();
  const [toValue, setToValue] = useState(0);
  const [openDates, setOpenDates] = useState(false);

  let dataSpecialties = useSelector((state) => state.account.specialties);
  const dataPets = useSelector((state) => state.account.pets);
  const dataServices = useSelector((state) => state.services.service.data);
  let dataAddresses = useSelector((state) => state.address.data);
  let addressSelected = useSelector((state) => state.schedule.addressSelected);
  let addressDefault = useSelector((state) => state.address.default);
  const { navigate } = useNavigation();
  if (dataAddresses.length > 0) {
    dispatch(ScheduleActions.setAddressSelected(dataAddresses, addressDefault));
  }

  const gotoPageService = (props, setToValue) => {
    if (props.values.serviceKey != "") {
      setToValue((props.values.serviceKey = "consulta" ? 300 : 400));
    }
  };

  const AnimatedView = new Animated.createAnimatedComponent(View);

  const setFocus = (toValue) => {
    switch (toValue) {
      case 400:
        break;
      case 500:
        break;
      default:
        Keyboard.dismiss();
        break;
    }
  };

  useEffect(() => {
    Animated.timing(offset, {
      toValue: toValue,
    }).start(() => {
      setFocus(toValue);
    });
    dispatch(AddressActions.addressListRequest());
    dispatch(ServiceActions.serviceListRequest());
  }, [toValue]);

  const FindVetRequest = (values) => {
    navigation.navigate("SCHEDULE_SELECT_VET");
    // dispatch(GeneralActions.setLoading(true));
    // apiCustomer
    //   .post('/client/pet', { ...values})
    //   .then(resp => {
    //     dispatch(AccountActions.petsRequest());
    //     navigation.navigate('DASHBOARD_OWNER');
    //     dispatch(GeneralActions.setLoading(false));
    //   })
    //   .catch(err => {
    //     if (error.response && error.response.data.code) {
    //       const { code } = error.response.data.code;
    //       dispatch(GeneralActions.setError(Error('PT_BR', code)));
    //     }
    //   })
    //   .finally(() => {
    //     dispatch(GeneralActions.setLoading(false));
    //   });
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
      <Formik
        onSubmit={(values) => FindVetRequest(values)}
        initialValues={initialValues}
        initialErrors={initialErrors}
        validationSchema={registerSchema}
      >
        {(props) => (
          <AnimatedView
            style={{
              flex: 1,
              flexDirection: "row",
              minWidth: metrics.width * 6,
              transform: [
                {
                  translateX: offset.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, metrics.width * -1],
                  }),
                },
              ],
            }}
          >
            {/* * SELECIONE ENDEREÇO [0]*/}
            <Page>
              <ContainerInput>
                <Label>Selecione o Endereço</Label>
                <ListContainer>
                  <Carousel
                    data={[...dataAddresses, { last: true }]}
                    renderItem={({ item, index }) => (
                      <CardAddress
                        item={item}
                        index={index}
                        addButton={() =>
                          navigation.navigate("SCHEDULE_ADDRESS")
                        }
                      />
                    )}
                    sliderWidth={metrics.width}
                    itemWidth={metrics.width}
                    onSnapToItem={(index) => {
                      if (index <= dataAddresses.length - 1) {
                        if (dataAddresses[index] != null) {
                          dispatch(
                            ScheduleActions.setAddressSelected(
                              dataAddresses,
                              dataAddresses[index]
                            )
                          );
                        }
                      }
                    }}
                  />
                </ListContainer>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={addressSelected == null}
                  color={"black"}
                  background={addressSelected == null ? "white" : "yellow"}
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
            {/* SELECIONE PET [100]*/}
            <Page>
              <ContainerInput>
                <Label>Selecione o Pet</Label>
                <ListContainer>
                  <Carousel
                    data={[...dataPets, { last: true }]}
                    renderItem={({ item, index }) => (
                      <CardPet
                        item={item}
                        index={index}
                        onPressAdd={() => navigate("REGISTER_PET_INFO")}
                      />
                    )}
                    sliderWidth={metrics.width}
                    itemWidth={150}
                    onSnapToItem={(index) => {
                      if (index <= dataPets.length - 1) {
                        if (dataPets[index] != null) {
                          dispatch(
                            ScheduleActions.setPetSelected(dataPets[index])
                          );
                        }
                      }
                    }}
                  />
                </ListContainer>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={addressSelected == null}
                  color={"black"}
                  background={addressSelected == null ? "white" : "yellow"}
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
            {/* Selecione Serviço[200] */}
            <Page>
              <ContainerInput>
                <Label>Selecione a Serviço</Label>
                <Picker
                  selectedValue={props.values.service}
                  style={{ height: 50, width: "100%" }}
                  onValueChange={(value) => {
                    props.setFieldValue(
                      "serviceKey",
                      value != ""
                        ? dataServices.find((item) => item.id == value)["key"]
                        : ""
                    );
                    props.setFieldTouched("serviceKey", true);
                    props.setFieldValue("service", value);
                    props.setFieldTouched("service", true);
                  }}
                >
                  <Picker.Item
                    key={0}
                    label={"Selecione uma opção"}
                    value={null}
                  />
                  {dataServices.map((item) => (
                    <Picker.Item
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </Picker>
                {!!props.errors.service && !!props.touched.service && (
                  <TextError style={{ color: "#000", alignSelf: "center" }}>
                    {props.errors.service}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={addressSelected == null}
                  color={"black"}
                  background={addressSelected == null ? "white" : "yellow"}
                  title="Próximo"
                  onPress={() => gotoPageService(props, setToValue)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(100)}
                />
              </ButtonContainer>
            </Page>
            {/* Selecione Especialidade[300] */}
            <Page>
              <ContainerInput>
                <Label>Selecione a Especialidade</Label>
                <Picker
                  selectedValue={props.values.specialty}
                  style={{ height: 50, width: "100%" }}
                  onValueChange={props.handleChange("specialty")}
                >
                  {dataSpecialties.map((item) => (
                    <Picker.Item
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </Picker>
                {!!props.errors.specialty && !!props.touched.specialty && (
                  <TextError style={{ color: "#000", alignSelf: "center" }}>
                    {props.errors.specialty}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={addressSelected == null}
                  color={"black"}
                  background={addressSelected == null ? "white" : "yellow"}
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
            {/* Selecione a Vacina[400]/*/}
            <Page>
              <ContainerInput>
                <Label>Seleciona as vacinas</Label>
                <Picker
                  selectedValue={props.values.specialty}
                  style={{ height: 50, width: "100%" }}
                  onValueChange={props.handleChange("specialty")}
                >
                  {dataSpecialties.map((item) => (
                    <Picker.Item
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </Picker>
                {!!props.errors.specialty && !!props.touched.specialty && (
                  <TextError style={{ color: "#000", alignSelf: "center" }}>
                    {props.errors.specialty}
                  </TextError>
                )}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={addressSelected == null}
                  color={"black"}
                  background={addressSelected == null ? "white" : "yellow"}
                  title="Próximo"
                  onPress={() => setToValue(500)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(200)}
                />
              </ButtonContainer>
            </Page>
            {/* Selecione Raio[500]/*/}
            <Page>
              <ContainerInput>
                <Label>Selecione o raio 0 a 20 km</Label>
                <View style={{ paddingHorizontal: 20 }}>
                  <Slider
                    minimumValue={0}
                    maximumValue={20}
                    minimumTrackTintColor="#F6BE67"
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor="#F6BE67"
                    onValueChange={(value) => {
                      props.setFieldValue("radius", value);
                      props.setFieldTouched("radius", true);
                    }}
                  />
                </View>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={addressSelected == null}
                  color={"black"}
                  background={addressSelected == null ? "white" : "yellow"}
                  title="Próximo"
                  onPress={() => setToValue(600)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(200)}
                />
              </ButtonContainer>
            </Page>
            {/* Selecione a agenda[700] */}
            <Page>
              <ContainerInput>
                <Label>Selecione a Agenda</Label>
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                  <CalendarList
                    showScrollIndicator={true}
                    horizontal={true}
                    calendarWidth={370}
                    onDayPress={() => setOpenDates(true)}
                  />
                </View>

                {openDates ? (
                  <ContainerListAgend>
                    <ItemAgend>
                      <TextDate>10/05</TextDate>
                      <Separator />
                      <TextHour>11:00</TextHour>
                    </ItemAgend>

                    <ItemAgend>
                      <TextDate>10/05</TextDate>
                      <Separator />
                      <TextHour>11:00</TextHour>
                    </ItemAgend>

                    <ItemAgend>
                      <TextDate>10/05</TextDate>
                      <Separator />
                      <TextHour>11:00</TextHour>
                    </ItemAgend>
                  </ContainerListAgend>
                ) : null}
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={addressSelected == null}
                  color={"black"}
                  background={addressSelected == null ? "white" : "yellow"}
                  title="Próximo"
                  onPress={() => setToValue(700)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => setToValue(200)}
                />
              </ButtonContainer>
            </Page>
            {/*  SELECIONE O CARTAO[800] */}
            <Page>
              <ContainerInput>
                <Label>Selecione o cartão desejado</Label>
                <ListContainer style={{ paddingHorizontal: 20 }}>
                  <ContainerCreditCard onPress={() => setToValue(800)}>
                    <InnerCreditCard>
                      <View>
                        <TextCreditCard>
                          Luis Filipe Alves de Oliveira
                        </TextCreditCard>
                        <TextCreditCard>
                          9842-9832-0972-89 - 12/25
                        </TextCreditCard>
                      </View>
                      <LogoCreditCard source={logomaster} />
                    </InnerCreditCard>
                  </ContainerCreditCard>
                </ListContainer>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => navigation.goBack()}
                />
              </ButtonContainer>
            </Page>
            {/* CODIGO DE SEG */}
            <Page>
              <ContainerInput>
                <Label>Código de Segurança</Label>
                <ListContainer>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    returnKeyType="next"
                  />
                </ListContainer>
              </ContainerInput>
              <ButtonContainer>
                <Button
                  disable={addressSelected == null}
                  color={"black"}
                  background={addressSelected == null ? "white" : "yellow"}
                  title="Próximo"
                  onPress={() => setToValue(900)}
                />
                <Button
                  title="Voltar"
                  styles={{ marginTop: 10 }}
                  onPress={() => navigation.goBack()}
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
