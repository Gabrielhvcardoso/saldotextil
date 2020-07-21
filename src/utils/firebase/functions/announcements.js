import { Alert } from 'react-native';
import firebase from '../config';

export function read(section, folder, subfolder, child = '', value = '') {
  let response;
  let find;

  if (child !== '' && value !== '') {
    find = firebase.database().ref(`${section}/${folder}/${subfolder}`).orderByChild(child).equalTo(value);
  } else {
    find = firebase.database().ref(`${section}/${folder}/${subfolder}`);
  }

  find.on('value', (snapshot) => {
    if (snapshot.val()) {
      const keys = Object.keys(snapshot.val());
      response = Object.values(snapshot.val()).map((item, ind) => ({ ...item, uid: keys[ind] }));
    } else response = {};
  });

  return response;
}

export function create(section, folder, subfolder, data, action) {
  // Firebase Database Reference: section/folder/subfolder/ref

  const annid = `${data.user}${Date.now()}`;
  const imagesurl = [];

  if (data.images.length > 0) {
    data.images.map((item, index, array) => fetch(item.rui)
      .then((file) => file.blob(), () => console.log('Error in blob()'))
      .then((blob) => firebase.storage()
        .ref(`images/${annid}${index}${item.uri.substring(item.uri.lastIndexOf('.'), item.uri.length)}`)
        .put(blob), () => console.log('Error in firebase.storage()'))
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => imagesurl.push(url))
      .then(() => {
        if (imagesurl.length === array.length) {
          sendToDatabase(
            section,
            folder,
            subfolder,
            { ...data, images: imagesurl },
            annid,
            action,
          );
        }
      }));
  } else {
    sendToDatabase(section, folder, subfolder, data, annid, action);
  }

  function sendToDatabase(sec, fold, sfold, ann, id, act) {
    firebase.database().ref(`${sec}/${fold}/${sfold}${id}`).set(ann)
      .then(() => {
        Alert.alert(
          'Sucesso',
          'Seu anúncio foi veiculado ao Saldo Têxtil.',
          [
            {
              text: 'Ok',
              onPress: () => act,
            },
          ],
        );
      }, () => {
        Alert.alert(
          'Erro',
          'Obtivemos um erro ao tentar veicular seu anúncio ao Saldo Têxtil.',
          [
            {
              text: 'Ok',
            },
          ],
        );
        return true;
      });
  }
}

export function update(section, folder, subfolder, annid, ann, action) {
  firebase.database().ref(`${section}/${folder}/${subfolder}/${annid}`).set(ann)
    .then(() => {
      Alert.alert(
        'Sucesso',
        'Seu anúncio foi atualizado com sucesso.',
        [
          {
            text: 'Ok',
            onPress: () => action,
          },
        ],
      );
    }, () => {
      Alert.alert(
        'Erro',
        'Obtivemos um erro ao tentar atualizar o seu anúncio.',
        [
          {
            text: 'Ok',
          },
        ],
      );
    });
}

export function destroy(section, folder, subfolder, images, annid, action) {
  if (images) {
    images.map((donwloadurl) => {
      const imageRef = firebase.storage().refFromURL(donwloadurl).fullPath;
      firebase.storage().ref(imageRef).delete();
      return null;
    });
  }

  firebase.database().ref(`${section}/${folder}/${subfolder}/${annid}`).remove()
    .then(() => {
      Alert.alert(
        'Sucesso',
        'Anúncio excluído',
        [
          {
            text: 'Ok',
            onPress: action,
          },
        ],
      );
    }, () => {
      Alert.alert(
        'Erro',
        'Obtivemos um erro ao tentar excluir o seu anúncio',
        [
          {
            text: 'Ok',
            onPress: action,
          },
        ],
      );
    });
}