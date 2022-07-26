import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Keyboard,
} from "react-native";
import FlipCard from "react-native-flip-card";
import Icon from "@expo/vector-icons/FontAwesome5";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Label,
  Container,
  ContainerInputs,
  Input,
  TextError,
  ContainerButtons,
} from "./styles";

import * as S from "./styles";

import Styles from "./styles";
import { metrics } from "../../../styles";

function AddCreditCard({ navigation }) {
  const NumberCardRef = useRef(null);
  const NameRef = useRef(null);
  const CVVRef = useRef(null);
  const [toValue, setToValue] = useState(0);

  const AnimatedView = new Animated.createAnimatedComponent(View);

  const setFocus = (toValue) => {
    switch (toValue) {
      case 0:
        NumberCardRef.current.focus();
        break;

      case 100:
        NameRef.current.focus();

      case 200:
        CVVRef.current.focus();

      default:
        Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <Formik>
        {(props) => (
          <>
            <S.Container>
              <S.ContainerInputs>
                <Label>
                  Adicionar <Label bold>Cartão</Label>
                </Label>

                <View>
                  <S.LabelDetaisCard primary>
                    Número do cartão
                  </S.LabelDetaisCard>

                  <Input
                    placeholder="5566 7798 9909 8877"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                  />
                </View>

                <View style={Styles.containerDetailsCard}>
                  <S.ContainerInputDetailsCard>
                    <S.InputDetailsCard
                      placeholder="MM/AA"
                      autoCapitalize="none"
                      keyboardType="number-pad"
                    />
                  </S.ContainerInputDetailsCard>

                  <S.ContainerInputDetailsCard>
                    <S.InputDetailsCard
                      placeholder="CVV"
                      autoCapitalize="none"
                      keyboardType="number-pad"
                    />
                  </S.ContainerInputDetailsCard>
                </View>
              </S.ContainerInputs>
              <S.ContainerButtons>
                <Button
                  title="Salvar Cartão"
                  onPress={() => navigation.navigate("PAYMENTS")}
                />
              </S.ContainerButtons>
              <SafeAreaView />
            </S.Container>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default AddCreditCard;
