import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
  padding: 15px;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: Poppins SemiBold;
  font-size: 30px;
  margin-top: 8px;
`;

export const SubTitle = styled.Text`
  font-family: Poppins SemiBold;
  font-size: 20px;
  margin-top: 8px;
`;

export const Save = ({ onPress }) => (
  <SaveButton onPress={onPress}>
    <SaveText>Salvar</SaveText>
  </SaveButton>
);

const SaveButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #87B6E8;
  border-radius: 4px;
  height: 40px;
  margin-top: 20px;
  justify-content: center;
`;

const SaveText = styled.Text`
  color: #F0F6FC;
  font-family: Poppins Medium;
  margin-top: 4px;
`;

export const Close = ({ onPress }) => (
  <CloseButton onPress={onPress}>
    <CloseText>Fechar</CloseText>
    <Icon name="close" type="material-community" color="#708194" size={18} />
  </CloseButton>
);

export const CloseText = styled.Text`
  color: #6A819A;
  font-family: Poppins Medium;
  margin: 3px 5px 0px 0px;
`;

export const CloseButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #F0F6FC;
  border-radius: 100px;
  flex-direction: row;
  padding: 4px 10px;
`;

export const Horizontal = styled.View`
  flex-direction: row;
  margin: 0px -5px 10px;
`;

export const TextInput = ({ leftIcon, placeholder, vertical = false, filled = false, value, onChangeText }) => (
  <TextInputContainer vertical={vertical} filled={filled}>
    <LeftContainer>
      <Icon name={ leftIcon ? leftIcon : 'home' } type="material-community" color="#bbb" />
    </LeftContainer>
    <SimpleTextInput value={value} onChangeText={onChangeText} placeholder={ placeholder || 'Digite aqui' }/>
  </TextInputContainer>
);

const TextInputContainer = styled.View`
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  flex-direction: row;
  height: 40px;

  ${ props => props.vertical ? 'margin: 0 5px;' : 'margin-bottom: 10px;' }
  ${ props => props.filled ? 'flex: 1' : 'min-width: 100px' }
`;

const LeftContainer = styled.View`
  align-items: center;
  flex: 1 0 auto;
  max-width: 60px;
  justify-content: center;
`;

const SimpleTextInput = styled.TextInput`
  flex: 1;
  font-size: 18px;
  font-family: Poppins Regular;
  padding-top: 7px;
`;