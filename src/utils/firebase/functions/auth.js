import { Alert } from 'react-native';
import firebase from '../config';

export const login = (data, setAuthUser, onError) => {
  function showError(message) {
    return (
      Alert.alert(
        'Algo está errado.',
        message,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      )
    );
  }

  function authentication() {
    let authUser;

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => {
        console.log('user logged')
        authUser = {
          id: user.uid,
          email: user.email,
        };

        if (authUser?.id) {
          firebase.database().ref(`users/${authUser.id}`).once('value')
            .then((snapshot) => {
              setAuthUser({ ...snapshot.val(), id: authUser.id }, authUser.email);
            });
        }
      })
      .catch((error) => {
        // Handle Errors here
        const errorCode = error.code;
        
        onError();

        if (errorCode === 'auth/invalid-email') {
          showError('E-mail inválido.');
        } else if (errorCode === 'auth/wrong-password') {
          showError('Senha incorreta para esse conta.');
        } else if (errorCode === 'auth/user-not-found') {
          showError('Usuário não existe');
        } else if (errorCode === 'auth/too-many-requests') {
          showError('Foram feitas muitas requisições de login em um curto espaço de tempo.\n\nPara sua segurança, você só poderá fazer login daqui um tempo a partir deste aparelho.');
        } else {
          showError(`Há algo de errado. ${errorCode}`);
        }
      });
  }
  authentication();
}