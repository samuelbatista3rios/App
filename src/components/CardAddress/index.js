import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import FlipCard from "react-native-flip-card";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Default, Avatar } from "./styles";
import { colors } from "../../styles";
import { useNavigation } from "react-navigation-hooks";
import { hideCardNumber, formatToReal } from "../../utils";

export default function Card({ item, inanimate, addButton }) {
  const [onFlip, setOnFlip] = useState(false);
  const { navigate } = useNavigation();

  if (inanimate) {
    return (
      <View style={Default.container} activeOpacity={1}>
        <Text style={Default.topTitle}>{hideCardNumber(item.number)}</Text>
        <Text style={Default.topTitle}>{item.name_holder}</Text>
        <View style={Default.rowInfo}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 15 }}>
              {formatToReal(item.balance)}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 15 }}>
              {item.expire_date}
            </Text>
            <Text style={{ color: "#fff", marginTop: 5 }}>Validade</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <>
      {item.last ? (
        <TouchableOpacity
          onPress={() => addButton()}
          activeOpacity={1}
          style={Default.containerClean}
        >
          <Icon name="plus" size={20} color={colors.gray4} />
        </TouchableOpacity>
      ) : (
        <View style={Default.flipContainer}>
          <View
            style={[Default.container,item.selected ? {borderColor:colors.yellow,borderWidth:1,borderStyle:'dash'}:{}]}
            activeOpacity={1}
          >
            <View style={[Default.rowInfo]}>
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 17,
                    marginTop: 5,
                    color: "#91A4F4",
                    fontWeight: "bold"
                  }}
                >
                  {item.address} - {item.number}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    marginTop: 5,
                    color: "#91A4F4",
                    fontSize: 17
                  }}
                >
                {item.complement !="" ? `${item.complement} -`:``} {item.post_code} - {item.district} - {item.selected}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 17,
                    marginTop: 5,
                    color: "#91A4F4",
                    fontWeight: "bold"
                  }}
                >
                 {item.city} - {item.state}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
