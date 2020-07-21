import firebase from '../config';
import { Alert } from 'react-native';

export async function updateUser(user, action, setAuthenticatedUser) {
  await firebase.database().ref(`users/${user.id}`).set(user)
    .then(() => {
      Alert.alert(
        'Sucesso',
        'Informações atualizadas com sucesso',
        [
          { text: 'Ok' },
        ],
      );
      setAuthenticatedUser(user);
      action();
    })
    .catch(() => {
      Alert.alert(
        'Erro',
        'Houve um erro ao tentar atualizar as informações',
        [
          { text: 'Ok' },
        ],
      );
      return false;
    });
}

export function detailUser(id) {
  let response = {};

  firebase.database().ref(`users/${id}`)
    .on('value', (snapshot) => {
      while (snapshot === null || snapshot === undefined) {
        response = {};
      }
      response = snapshot.val();
    });

  return response;
}

export async function destroyUser(userRef, userImage, destroyAuthenticateUser) {
  if (userImage !== defaultImage && userImage !== null) {
    const userImageRef = firebase.storage().refFromURL(userImage).fullPath;
    firebase.storage().ref(userImageRef).delete().then(() => {
      firebase.auth().currentUser.delete()
        .then(() => {
          firebase.database().ref(`users/${userRef}`).remove().then(() => {
            destroyAuthenticateUser();
          });
        }, () => {
          Alert.alert(
            'Ops, algo deu errado.',
            'Obtivemos um erro ao deletar sua conta, caso este erro persistir, faça login novamente e tente denovo',
            [
              { text: 'Ok' },
            ],
          );
        });
    });
  } else {
    firebase.auth().currentUser.delete()
      .then(() => {
        firebase.database().ref(`users/${userRef}`).remove().then(() => {
          destroyAuthenticateUser();
        });
      }, () => {
        Alert.alert(
          'Ops, algo deu errado.',
          'Obtivemos um erro ao deletar sua conta, caso este erro persistir, faça login novamente e tente denovo',
          [
            { text: 'Ok' },
          ],
        );
      });
  }
}

export async function updateImage(user, uri, setAuthenticatedUser) {
  if (user.image !== defaultImage && user.image !== null) {
    const userImageRef = firebase.storage().refFromURL(user.image).fullPath;
    firebase.storage().ref(userImageRef).delete();
  }

  fetch(uri)
    .then((filesystem) => filesystem.blob())
    .then((file) => firebase
      .storage()
      .ref(`user_profile_image/${user.id}${uri.substring(uri.lastIndexOf('.'), uri.length)}`)
      .put(file))
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      firebase.database().ref(`users/${user.id}`).set({ ...user, image: url }).then(() => {
        setAuthenticatedUser({ ...user, image: url });
      });
    });
}

export async function updatePassword(email, oldPassword, newPassword, navigation, setIsLoading = (bool) => {}) {
  setIsLoading(true);
  firebase.auth().signInWithEmailAndPassword(email, oldPassword).then(() => {
    firebase.auth().currentUser.updatePassword(newPassword).then(() => {
      Alert.alert(
        'Sucesso',
        'Senha modificada com êxito',
        [
          {
            text: 'Ok',
            onPress: () => {
              setIsLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    }, () => {
      Alert.alert(
        'Erro',
        'Obtivemos um erro ao tentar atualizar sua senha, tente novamente mais tarde.',
        [
          {
            text: 'Ok',
            onPress: () => {
              setIsLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    });
  }, () => {
    Alert.alert(
      'Erro',
      'Senha incorreta.',
      [
        {
          text: 'Ok',
          onPress: () => {
            setIsLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  });
}