import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Platform, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import WalletAnimation from '../../../assets/animations/wallet.json';
import { useSelector } from 'react-redux';
import { metrics } from '../../../styles.js';

export default function LoadingWallet() {
  const loading = useSelector(state => state.general.loading);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: loading ? 0 : metrics.height * 2,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}
    >
      {Platform.OS === 'ios' ? (
        <LottieView
          style={{ width: 80, height: 80 }}
          source={WalletAnimation}
          autoPlay={true}
          loop={true}
        ></LottieView>
      ) : (
        <ActivityIndicator size={30} color="#fff" />
      )}
    </Animated.View>
  );
}
