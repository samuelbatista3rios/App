import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

/**
 * PAGES
 */
import WELCOME from "./pages/Welcome";

// Register Client
import REGISTER_OWNER_INFO from "./pages/RegisterOwner/User";
import REGISTER_OWNER_ADDRESS from "./pages/RegisterOwner/Address";
import REGISTER from "./pages/WelcomeRegister";

//Register vet
import REGISTER_VET from "./pages/RegisterVet/User";
import REGISTER_VET_INFO from "./pages/RegisterVet/Info";
import REGISTER_PET_INFO from "./pages/RegisterPet/Info";
import REGISTER_VET_ADDRESS from "./pages/RegisterVet/Address";
import REGISTER_VET_DOCUMENTS from "./pages/RegisterVet/Documents";

//Schedule service
import SCHEDULE_SELECT from "./pages/Schedule/Select";
import SCHEDULE_SELECT_VET from "./pages/Schedule/SelectVet";
import SCHEDULE_ADDRESS from "./pages/Schedule/Address";

import CONFIRMREGISTER from "./pages/ConfirmRegister";
import REGISTERPENDING from "./pages/RegisterPending";
import LOGIN from "./pages/Login";

// import DASHBOARD_VET from './tabsVet';
import DASHBOARD_OWNER from "./tabsOwner";

import PAYMENTS from "./pages/Payments";
import ADD_CREDIT_CARD from "./pages/Payments/AddCreditCard";

export default createAppContainer(
  createStackNavigator(
    {
      WELCOME,
      DASHBOARD_OWNER,
      LOGIN,
      REGISTER,
      REGISTERPENDING,
      CONFIRMREGISTER,
      REGISTER_VET,
      REGISTER_VET_INFO,
      REGISTER_VET_ADDRESS,
      REGISTER_VET_DOCUMENTS,
      REGISTER_OWNER_INFO,
      REGISTER_OWNER_ADDRESS,
      REGISTER_PET_INFO,
      SCHEDULE_SELECT,
      SCHEDULE_ADDRESS,
      SCHEDULE_SELECT_VET,
      PAYMENTS,
      ADD_CREDIT_CARD,
    },
    {
      //initialRouteName: "ADD_CREDIT_CARD",
      defaultNavigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    }
  )
);
