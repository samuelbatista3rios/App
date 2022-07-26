import React, { useRef, useState, useMemo, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { PieChart } from "react-native-svg-charts";
import apiRegister from "../../../services/apiRegister";
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  PanResponder,
  SafeAreaView,
} from "react-native";
import {
  ScrollContainer,
  Container,
  ContainerUser,
  Text,
  CardPets,
  CarouselContainer,
  ContainerImagePerfil,
  Avatar,
} from "./styles";

import { metrics, colors, ListContainer } from "../../../styles";

import Header from "../../../components/Header";

import Carousel from "react-native-snap-carousel";
import CardPet from "../../../components/CardPet";
import CardRequest from "../../../components/CardRequest";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "react-navigation-hooks";
import * as UserActions from "../../../store/modules/user/actions";
import * as AccountActions from "../../../store/modules/account/actions";

import * as AddressActions from "../../../store/modules/address/actions";

import { formatToReal } from "../../../utils";
import moment from "moment";
import "moment/locale/pt-br";

import userIcon from "../../../assets/image-user.png";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.user.data);
  const address = useSelector((state) => state.address.default);
  const dispatch = useDispatch();
  const dataPets = useSelector((state) => state.account.pets);
  const dataConsults = useSelector((state) => state.account.consults);
  const { navigate } = useNavigation();
  useEffect(() => {
    dispatch(AccountActions.petsRequest());
    dispatch(AddressActions.defaultAddressRequest());
    dispatch(AddressActions.addressListRequest());
    dispatch(AccountActions.specialtiesRequest());
  }, []);
  return (
    <>
      <ScrollContainer nestedScrollEnabled={true}>
        <Container>
          <ContainerUser>
            <ContainerImagePerfil>
              <Avatar source={null}></Avatar>
            </ContainerImagePerfil>
            <Text font="18" color="white">
              {" "}
              {user.name}
            </Text>
            {address && (
              <Text font="14" color="white">
                {" "}
                {address.address} {address.number} {address.city} -{" "}
                {address.state}
              </Text>
            )}
          </ContainerUser>
          <CarouselContainer>
            <Text font="14" color="white" style={{ paddingBottom: 14 }}>
              Seus pets
            </Text>
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
                // dispatch(CardActions.setCard(data[index]));
              }}
            />
          </CarouselContainer>
          <ListContainer>
            <Text font="14" color="white" style={{ paddingBottom: 14 }}>
              Ultimas consultas
            </Text>
            <Carousel
              data={[...dataConsults, { last: true }]}
              renderItem={({ item, index }) => (
                <CardRequest item={item} index={index} />
              )}
              sliderWidth={metrics.width}
              itemWidth={metrics.width}
              onSnapToItem={(index) => {
                // dispatch(CardActions.setCard(data[index]));
              }}
            />
          </ListContainer>
        </Container>
      </ScrollContainer>
    </>
  );
};

Home.navigationOptions = {
  title: "Home",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="home" size={30} color={tintColor} />
  ),
};

export default Home;
