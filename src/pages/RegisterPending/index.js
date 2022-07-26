import React, { useState, useEffect, useRef } from "react";
import { metrics, colors } from "../../styles";
import Icon from "@expo/vector-icons/FontAwesome";
import { Formik, Form } from "formik";
import apiCustomer from "../../services/apiCustomer";
import apiCep from "../../services/apiCep";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { TextInputMask } from "react-native-masked-text";
import * as Yup from "yup";
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
} from "react-native";
import Styles from "./styles";
import Button from "../../components/Button";
/**
 * IMAGES
 */
import BlueBubble from "../../assets/bubble_blue.png";
import YellowBubbleSplash from "../../assets/yellow_splash.png";
import BlackBubbleSplash from "../../assets/black_splash.png";
import SuccessBackground from "../../assets/success_background.png";
import SuccessHand from "../../assets/success_hand.png";
import SuccessFinger from "../../assets/success_finger.png";
import SuccessQuestion from "../../assets/success_question.png";

const RegisterPending = ({ navigation }) => {
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

  renderTopImages = (name, bubble) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <Image
          source={bubble ? YellowBubbleSplash : BlackBubbleSplash}
          resizeMode="contain"
          style={{ height: 302 }}
        />
      </View>
    );
  };

  return (
    <>
      <Formik>
        {props => (
          <>
            <AnimatedView
              style={{
                flex: 1,
                flexDirection: "row",
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
              {/** SCREEN SUCCESS */}
              <View style={{ width: metrics.width, overflow: "hidden" }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "center"
                  }}
                >
                  <View style={Styles.successCard}>
                    <Text
                      style={{
                        marginTop: 10,
                        color: "#8CC1C4",
                        fontSize: 20,
                        fontWeight: "bold"
                      }}
                      onPress={() => navigation.goBack()}
                    >
                      VOLTAR
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Image source={SuccessQuestion} />
                      <Text
                        style={{
                          color: "rgba(0,0,0,0.5)",
                          fontSize: 24,
                          marginTop: 14,
                          textAlign: "center"
                        }}
                      >
                        Seu cadastro está em análise
                      </Text>
                    </View>
                    <View></View>
                    <View></View>
                    <Image
                      source={SuccessFinger}
                      style={{
                        position: "absolute",
                        bottom: "-15%",
                        left: "-25%",
                        transform: [{ rotateZ: "5deg" }]
                      }}
                    />
                  </View>
                  <Image
                    source={SuccessBackground}
                    style={{ position: "absolute", bottom: 0, zIndex: -10 }}
                  />
                  <Image
                    source={SuccessHand}
                    style={{
                      position: "absolute",
                      bottom: "-15%",
                      left: "-25%",
                      zIndex: -9,
                      transform: [{ rotateZ: "10deg" }]
                    }}
                  />
                </View>
              </View>
            </AnimatedView>
          </>
        )}
      </Formik>
    </>
  );
};

export default RegisterPending;
