import React from 'react';
import { Alert } from 'react-native';
import { Button, Container, TextInput } from './styles';

import GeneralContext from '../../../context';
import { user } from '../../../utils/firebase';

export default function UpdatePassword({ navigation }) {
  const { localUser } = React.useContext(GeneralContext);

  const { currentEmail } = localUser;
  
  const [values, setValues] = React.useState({
    actual: '',
    new: '',
    newRepeat: '',
  })

  const verify = () => {
    if (values.new === values.newRepeat) {
      user.updatePassword(currentEmail, values.actual, values.new, navigation);
    } else {
      Alert.alert(
        'As senhas não conferem',
        'Por favor, repita a senha corretamente.',
        [
          {
            text: 'Ok'
          }
        ]
      );
    }
  }

  return (
    <Container>
      <TextInput value={values.actual} onChangeText={(s) => setValues({ ...values, actual: s})} placeholder="Senha atual" />
      <TextInput value={values.new} onChangeText={(s) => setValues({ ...values, new: s})} placeholder="Nova senha" />
      <TextInput value={values.newRepeat} onChangeText={(s) => setValues({ ...values, newRepeat: s})} placeholder="Repita a nova senha" />

      <Button title="Mudar senha" onPress={() => verify()} />
    </Container>
  )
}