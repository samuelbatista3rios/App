import React from "react";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, SafeAreaView, AsyncStorage } from "react-native";
/**
 * PAGES
 */
import HOME from "./pages/Owner/Home";

import SCHEDULE_SELECT from "./pages/Schedule/Select";
import PAYMENTS from "./pages/Payments";

import { colors, metrics } from "./styles";

const TabBarComponent = (props) => <BottomTabBar {...props} />;

const Tab = createBottomTabNavigator(
  {
    HOME,
    SCHEDULE_SELECT_TAB: {
      screen: () => null,
      navigationOptions: {
        title: "Agendar",
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("SCHEDULE_SELECT"),
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="exchange" size={25} color={tintColor} />
        ),
      },
    },
    PAYMENTS_TAB: {
      screen: () => null,
      navigationOptions: {
        title: "Cartões",
        tabBarOnPress: ({ navigation }) => navigation.navigate("PAYMENTS"),
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="credit-card" size={25} color={tintColor} />
        ),
      },
    },

    LOGOUT_TAB: {
      screen: () => {},
      navigationOptions: {
        title: "Sair",
        tabBarOnPress: async ({ navigation }) => {
          await AsyncStorage.clear();
          navigation.navigate("WELCOME");
        },
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="sign-out" size={27} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarComponent: (props) => (
      <>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: colors.blue4,
            width: metrics.width,
          }}
          contentContainerStyle={{
            paddingBottom: 0,
            marginBottom: 0,
            height: 90,
          }}
        >
          <TabBarComponent {...props} />
          <SafeAreaView style={{ backgroundColor: "transparent" }} />
        </ScrollView>
      </>
    ),
    // initialRouteName: 'TRANSACTIONS',
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.white,
      activeBackgroundColor: colors.blue5,
      inactiveBackgroundColor: colors.blue4,
      activeBorderWidth: 1,
      style: {
        backgroundColor: "transparent",
        padding: 0,
        borderTopWidth: 0,
        height: 90,
        alignItems: "center",
      },
      labelStyle: {
        fontSize: 0,
      },
      tabStyle: {
        paddingHorizontal: 5,
        borderRadius: 10,
        margin: 5,
        marginBottom: 10,
        height: 80,
        width: 80,
        minWidth: 80,
        shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 1
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,
        elevation: 3,
      },
    },
  }
);

export default Tab;
