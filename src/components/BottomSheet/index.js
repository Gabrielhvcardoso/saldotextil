import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Icon } from 'react-native-elements';

import GeneralContext from '../../context';
import { Container, ListContainer, ListItem, ListLabel } from './styles';

function BottomSheet() {
  const { tools } = React.useContext(GeneralContext);
  const { bsRef } = tools;

  const items = [
    {
      icon: 'plus',
      name: 'Criar anúncio',
      action: () => {
        // missing function
        bsRef.current.close();
      },
    },
    {
      icon: 'briefcase-outline',
      name: 'Empregos',
      action: () => {
        tools.navigation.navigate('Jobs');
        bsRef.current.close();
      },
    },
    {
      icon: 'flag-outline',
      name: 'Representantes',
      action: () => {
        tools.navigation.navigate('Agents');
        bsRef.current.close();
      },
    },
    {
      icon: 'gift-outline',
      name: 'Doações',
      action: () => {
        tools.navigation.navigate('Donations');
        bsRef.current.close();
      },
    },
  ]

  return (
    <RBSheet
      animationType="fade"
      height={300}
      openDuration={250}
      closeDuration={100}
      closeOnDragDown
      closeOnPressMask
      closeOnPressBack
      customStyles={{
        container: {
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
        }
      }}

      ref={bsRef}
    >
      <Container>
        <ListContainer>
          {
            items.map(item => (
              <ListItem key={item.name} onPress={item.action}>
                <Icon color="#464646" name={item.icon} type="material-community" size={30} />
                <ListLabel>
                  {item.name}
                </ListLabel>
              </ListItem>
            ))
          }
        </ListContainer>
      </Container>
    </RBSheet>
  );
}

export default BottomSheet;
