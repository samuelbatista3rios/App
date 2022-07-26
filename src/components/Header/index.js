import React from 'react';
import { withNavigation } from 'react-navigation';
import { SafeAreaView } from 'react-native';
import Logo from '../../assets/logo_petsvita.png';
import { Container, ButtonBack, ContainerTitle, Title, Image } from './styles';
import { colors, metrics } from '../../styles';
import Icon from '@expo/vector-icons/FontAwesome5';

function Header({
  navigation,
  withoutBack,
  onBackPress,
  title,
  titleColor,
  background
}) {
  return (
    <>
      <SafeAreaView style={{ paddingTop: 20 }} />

      <Container>
        {withoutBack ? (
          <ButtonBack
            disabled={true}
            style={{
              opacity: 0
            }}
            onPress={() =>
              !onBackPress ? navigation.navigate('WELCOME') : onBackPress()
            }
          >
            <Icon
              name="angle-left"
              size={20}
              color={titleColor ? colors[titleColor] : colors.black}
            ></Icon>
          </ButtonBack>
        ) : (
          <ButtonBack
            onPress={() =>
              !onBackPress ? navigation.navigate('WELCOME') : onBackPress()
            }
          >
            <Icon
              name="angle-left"
              size={20}
              color={titleColor ? colors[titleColor] : colors.black}
            ></Icon>
          </ButtonBack>
        )}
        {!!title ? (
          <Title style={{ color: colors[titleColor] || colors.black }}>
            {title}
          </Title>
        ) : (
          <Image source={Logo} resizeMode="contain" />
        )}
      </Container>
    </>
  );
}

export default withNavigation(Header);
