import React from 'react';
import styled from 'styled-components';

export const LoadingContainer = () => (
  <CenteredContainer>
    <Spinner />
  </CenteredContainer>
);

const CenteredContainer = styled.View`
  align-items: center;
  background-color: #2B7ED7;
  flex: 1;
  justify-content: center;
`;

const Spinner = styled.ActivityIndicator.attrs({
  color: '#fff',
  size: 'large'
})``;

export const TopContainer = styled.View`
  align-items: center;
  background-color: #2B7ED7;
  height: 30%;
  justify-content: center;
`;

export const Image = styled.Image`
  resize-mode: contain;
  width: 60%;
`;

export const BottomContainer = styled.View`
  height: 70%;
  background-color: #fff;
  padding: 15px;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  background-color: #eee;
  border-radius: 4px;
  font-family: Poppins Medium;
  font-size: 18px;
  height: 40px;
  margin-bottom: 10px;
  padding: 4px 15px 0px;
`;

export const Button = ({ onPress, title }) => (
  <ButtonContainer color="#2b7ed7" onPress={onPress} >
    <ButtonText color="#fff">
      { title }
    </ButtonText>
  </ButtonContainer>
);

export const ButtonReverse = ({ onPress, title }) => (
  <ButtonContainer color="#fff" onPress={onPress} >
    <ButtonText color="#2b7ed7">
      { title }
    </ButtonText>
  </ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: ${props => props.color};
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: ${props => props.color};
  font-family: Poppins Medium;
  font-size: 16px;
  margin-top: 6px;
`;