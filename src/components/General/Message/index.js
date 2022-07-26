import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { metrics, colors } from '../../../styles';
import { setMessage } from '../../../store/modules/general/actions';
import Icon from '@expo/vector-icons/FontAwesome5';

export default function Message() {
  const message = useSelector(state => state.general.message);
  const dispatch = useDispatch();

  const removeMessage = () => {
    dispatch(setMessage(''));
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: !!message ? 0 : metrics.height * 2,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}
    >
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            width: '90%',
            padding: metrics.padding,
            backgroundColor: colors.green,
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={removeMessage}
          activeOpacity={1}
        >
          <Icon name="check-circle" size={20} color={colors.white} />
          <Text style={{ marginLeft: 10, color: colors.white }}>{message}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
