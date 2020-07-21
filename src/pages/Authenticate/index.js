import React from 'react';
import { StatusBar } from 'react-native';

import { BottomContainer, Button, ButtonReverse, Image, LoadingContainer, TextInput, TopContainer } from './styles';

import GeneralContext from '../../context';
import { auth } from '../../utils/firebase';

export default function Authenticate() {
  const { setAuthUser } = React.useContext(GeneralContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [login, setLogin] = React.useState({
    email: '',
    password: ''
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2B7ED7" />
      {
        isLoading ? (
          <LoadingContainer />
        ) : (
          <>
            <TopContainer>
              <Image source={require('../../../assets/images/logo-light.png')} />
            </TopContainer>
            <BottomContainer>
              <TextInput value={login.email} onChangeText={(s) => setLogin({ ...login, email: s})} placeholder="E-mail" />
              <TextInput value={login.password} onChangeText={(s) => setLogin({ ...login, password: s})} placeholder="Senha" secureTextEntry />

              <Button
                title="Entrar"
                onPress={() => {
                  setIsLoading(true);
                  auth.login(login, setAuthUser, () => setIsLoading(false));
                }}
              />
              <ButtonReverse title="Não tem uma conta? Cadastre-se" onPress={() => {}} />
            </BottomContainer>
          </>
        )
      }
    </>
  );
}
