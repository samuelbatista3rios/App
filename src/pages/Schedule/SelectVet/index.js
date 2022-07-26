import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, SafeAreaView, Animated, FlatList } from 'react-native';
import {
  Container,
  ModalItem,
  CloseButton,
  Icon,
  ContainerTopButtons,
  Button,
  PointMarker,
  Image,
  AnimatedModal,
  Menu,
  ItemMenu
} from './styles';
import icon from '../../../assets/icons/location.png';
import uber from '../../../assets/icons/uber.png';
const { width, height } = Dimensions.get('window');

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5
};

const data = [
  {
    name: 'João',
    specialty: 'Empresário',
    geo: {
      latitude: -27.589512,
      longitude: -48.499414
    }
  },
  {
    name: 'Aparecida',
    specialty: 'Dona de Casa',
    geo: {
      latitude: -27.589357,
      longitude: -48.498243
    }
  },
  {
    name: 'Jiraya',
    specialty: 'Ninja',
    geo: {
      latitude: -27.590748,
      longitude: -48.498094
    }
  }
];

const offset = new Animated.Value(0);

export default function MAP() {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: -27.59265052774778,
    longitude: -48.499200666666695
  });
  const [list] = useState(data);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Animated.spring(offset, {
      toValue: menuOpen ? 100 : 0
    }).start();
  }, [menuOpen]);

  const renderSelected = useMemo(() => {
    if (!selected) return;
    return (
      <ModalItem style={([shadow], { bottom: 20 })}>
        <Image source={uber} style={{ width: 80, height: 80 }} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{selected.name}</Text>
          <Text>{selected.specialty}</Text>
        </View>
        <CloseButton
          style={{ shadow }}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          onPress={() => setSelected(null)}
        >
          <Icon name="times-circle" />
        </CloseButton>
      </ModalItem>
    );
  }, [selected]);

  return (
    <AnimatedModal
      style={{
        transform: [
          {
            translateX: offset.interpolate({
              inputRange: [0, 100],
              outputRange: [-width * 0.7, 0]
            })
          }
        ]
      }}
    >
      <Menu>
        <FlatList
          ListHeaderComponent={<SafeAreaView />}
          data={data}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <ItemMenu key={item.name} style={shadow}>
              <Image source={uber} style={{ width: 80, height: 80 }} />
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.specialty}</Text>
              </View>
            </ItemMenu>
          )}
        ></FlatList>
      </Menu>
      <Container>
        <SafeAreaView />
        <ContainerTopButtons>
          <Button style={shadow} onPress={() => setMenuOpen(!menuOpen)}>
            <Icon name="bars" />
          </Button>
          <Button style={shadow}>
            <Icon name="location-arrow" />
          </Button>
          <Button style={shadow}>
            <Icon name="comments" />
          </Button>
        </ContainerTopButtons>
        <MapView
          initialRegion={{
            latitude: -27.59265052774778,
            longitude: -48.499200666666695,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          onRegionChange={setCurrentRegion}
          onLongPress={e => setCurrentRegion(e.nativeEvent.coordinate)}
          // mapType={Platform.OS === 'android' ? 'none' : 'standard'}
          style={{ width: '100%', height: '100%' }}
        >
          <Marker style={shadow} coordinate={currentRegion} />

          {list.map((item, index) => (
            <Marker
              icon={icon}
              pinColor="#123"
              style={shadow}
              key={index}
              // image={icon}
              coordinate={item.geo}
              title={item.name}
              description={item.specialty}
              onPress={event => setSelected(item)}
            >
              <PointMarker>
                <Image
                  source={icon}
                  resizeMode="contain"
                  style={{ width: 60, height: 60 }}
                />
                <Image
                  source={uber}
                  style={{ width: 38, height: 38, position: 'absolute' }}
                />
              </PointMarker>
            </Marker>
          ))}
        </MapView>
        {renderSelected}
      </Container>
    </AnimatedModal>
  );
}
