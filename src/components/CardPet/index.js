import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import FlipCard from 'react-native-flip-card';
import Icon from '@expo/vector-icons/FontAwesome5';
import {Default,Avatar} from './styles';
import { colors } from '../../styles';
import { hideCardNumber, formatToReal } from '../../utils';

export default function Card({ item, inanimate,onPressAdd }) {
  const [onFlip, setOnFlip] = useState(false);


  if (inanimate) {
    return (
      <View style={Default.container} activeOpacity={1}>
        <Text style={Default.topTitle}>{hideCardNumber(item.number)}</Text>
        <Text style={Default.topTitle}>{item.name_holder}</Text>
        <View style={Default.rowInfo}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: '#fff', fontSize: 16, marginTop: 15 }}>
              {formatToReal(item.balance)}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: '#fff', fontSize: 16, marginTop: 15 }}>
              {item.expire_date}
            </Text>
            <Text style={{ color: '#fff', marginTop: 5 }}>Validade</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <>
      {item.last ? (
        <TouchableOpacity
          onPress={() =>onPressAdd() }
          activeOpacity={1}
          style={Default.containerClean}
        >
          <Icon name="plus" size={20} color={colors.gray4} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
            style={Default.container}
            activeOpacity={1}
            onPress={() => setOnFlip(!onFlip)}
          >
            <Avatar source={{uri:item.avatar}}/>
            <View style={Default.rowInfo}>
              <View style={{ alignItems: 'center',width:"100%"}}>
                <Text style={{ color: '#fff', fontSize: 18, marginTop: 15, color:"#91A4F4",fontWeight:"bold" }}>{item.name}</Text>
                <Text style={{ color: '#fff', marginTop: 5, color:"#91A4F4",fontSize:12 }}>{item.age} Anos</Text>
              </View>
            </View>
          </TouchableOpacity>
      )}
    </>
  );
}
