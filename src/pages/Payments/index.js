import React, { useEffect, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

import * as S from "./styles";
import styles from "./styles";
import Button from "../../components/Button";
import Header from "../../components/Header";

/**
 * REDUX
 */
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/modules/user/actions";
import { colors } from "../../styles";

import logomaster from "../../assets/mastercard.png";
import { ScrollView } from "react-native-gesture-handler";

function Payments({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <S.Container>
        <S.ContainerInputs>
          <S.Label>Meus Cartões</S.Label>

          <ScrollView>
            <S.ContainerBoxCard onPress={() => {}} style={styles.boxShadow}>
              <S.LogoCreditCard source={logomaster} />

              <S.ContainerDetails>
                <S.TextName>Luis Filipe Alves de Oliveira</S.TextName>
                <S.TextNumberCard>5476 **** **** 9809</S.TextNumberCard>
              </S.ContainerDetails>
            </S.ContainerBoxCard>
          </ScrollView>
        </S.ContainerInputs>
        <S.ContainerButtons>
          <Button
            onPress={() => navigation.navigate("ADD_CREDIT_CARD")}
            color={"white"}
            title="Adicionar Cartão"
            background={"black"}
          />

          <Button
            onPress={() => navigation.navigate("DASHBOARD_OWNER")}
            styles={{ marginTop: 10 }}
            title="Voltar"
          />
        </S.ContainerButtons>
        <SafeAreaView />
      </S.Container>
    </KeyboardAvoidingView>
  );
}

export default Payments;
