import React from 'react';
import styled from 'styled-components';

import { useNavigation } from '@react-navigation/native';

// Configurations
const title = 'Camisas Femininas de Manga Curta';
const subtitle = 'Gabriel Henrique Veiga Cardoso';

export const Item = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Touchable>
        <Image />
      </Touchable>
      <Details>
        <Top>
          <Title>{ title }</Title>
          <Subtitle>{ subtitle }</Subtitle>

          <Price>
            R$ 13,60 <Measure>/ unidade</Measure>
          </Price>
        </Top>
        <Bottom>
          <ProfileImage />
          <Button>
            <ButtonText onPress={() => navigation.navigate('FeedInspect', { name: 'Camisas Femininas' })}>
              Ver detalhes
            </ButtonText>
          </Button>
        </Bottom>
      </Details>
    </Container>
  );
}

// Components
export const Container = styled.View`
  background-color: #fff;
  border-radius: 10px;
  elevation: 1;
  flex-direction: row;
  min-height: 140px;
  margin: 10px 10px 0px;
  padding: 10px;
`;

export const Touchable = styled.TouchableOpacity``;

export const Image = styled.Image`
  background-color: #f2f2f2;
  border-radius: 13px;
  height: 100px;
  width: 100px;
`;

export const Details = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
`;

export const Title= styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #666;
  font-size: 15px;
  font-family: Poppins Medium;
`;

export const Subtitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #666;
  font-size: 13px;
  font-family: Poppins Regular;
`;

export const Top = styled.View`
  flex: 1;
`;

export const Bottom = styled.View`
  align-self: baseline;
  flex-direction: row;
`;

export const ProfileImage = styled.Image`
  background-color: #f2f2f2;
  border-radius: 15px;
  height: 30px;
  width: 30px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: #F0F6FC;
  border-radius: 4px;
  flex: 1;
  height: 30px;
  justify-content: center;
  margin-left: 10px;
`;

export const ButtonText = styled.Text`
  color: #6A819A;
`;

export const Price = styled.Text`
  color: #666;
  font-family: Poppins Medium;
  font-size: 19px;
  margin: 10px 0px 0px;
`;

export const Measure = styled.Text`
  font-size: 13px;
`;
