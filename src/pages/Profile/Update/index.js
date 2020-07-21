import React from 'react';
import { Modal } from 'react-native';

import { Close, Container, Header, Horizontal, Save, SubTitle, TextInput, Title } from './styles';

import GeneralContext from '../../../context';
import { user } from '../../../utils/firebase';

export default function Update({ status }) {
  const { localUser, updateAuthUser } = React.useContext(GeneralContext);

  const { currentUser } = localUser;
  console.log(currentUser);

  const [newUser, setNewUser] = React.useState({
    andress: {
      cep: currentUser.andress.cep,
      city: currentUser.andress.city,
      complement: currentUser.andress.complement,
      neighborhood: currentUser.andress.neighborhood,
      number: currentUser.andress.number,
      state: currentUser.andress.state,
      street: currentUser.andress.street,
    },
    createdAt: currentUser.createdAt,
    document: {
      cpf: currentUser.document.cpf,
    },
    id: currentUser.id,
    image: currentUser.image,
    name: currentUser.name,
    phone: currentUser.phone,
    premium: currentUser.premium,
    type: currentUser.type
  });

  return (
    <Modal animationType="fade" transparent visible={status.value}>
      <Container>
        <Header>
          <Title>Editar Perfil</Title>
          <Close onPress={() => status.set(false)} />
        </Header>

        <SubTitle>
          Dados pessoais
        </SubTitle>

        <TextInput
          value={newUser.name}
          onChangeText={(s) => setNewUser({ ...newUser, name: s })}
          leftIcon="account-outline"
          placeholder="Nome de exibição"
        />
        <TextInput
          value={newUser.document.cpf}
          onChangeText={(s) => setNewUser({ ...newUser, document: { ...newUser.document, cpf: s }})}
          leftIcon="card-text-outline"
          placeholder="CPF"
          type="cpf"
        />
        <TextInput
          value={newUser.phone}
          onChangeText={(s) => setNewUser({ ...newUser, phone: s })}
          leftIcon="whatsapp"
          placeholder="Whatsapp"
          type="cel-phone"
        />

        <SubTitle>
          Endereço
        </SubTitle>

        <TextInput
          value={newUser.andress.street}
          onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, street: s } })}
          leftIcon="home-outline"
          placeholder="Rua"
        />

        <Horizontal>
          <TextInput
            value={newUser.andress.number}
            onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, number: s } })}
            leftIcon="numeric"
            placeholder="Número"
            vertical filled
          />
          <TextInput
            value={newUser.andress.neighborhood}
            onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, neighborhood: s } })}
            leftIcon="home-group"
            placeholder="Bairro"
            vertical filled
          />
        </Horizontal>

        <TextInput
          value={newUser.andress.complement}
          onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, complement: s } })}
          leftIcon="plus-circle-outline"
          placeholder="Complemento"
        />

        <Horizontal>
          <TextInput
            value={newUser.andress.city}
            onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, city: s } })}
            leftIcon="city"
            placeholder="Cidade"
            vertical filled
          />
          <TextInput
            value={newUser.andress.state}
            onChangeText={(s) => setNewUser({ ...newUser, andress: { ...newUser.andress, state: s } })}
            leftIcon="city-variant"
            placeholder="UF"
            vertical
          />
        </Horizontal>

        <Save onPress={() => user.updateUser(newUser, () => status.set(false), updateAuthUser) } />
      </Container>
    </Modal>
  );
}
