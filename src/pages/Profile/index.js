import React from 'react';
import { Andress, Avatar, Bio, BioDetails, Container, EditButton, Name, MyAnnouncement, MyAds, SpacedView } from './styles';

import Update from './Update';
import GeneralContext from '../../context';

export default function Profile({ route }) {
  const { localUser } = React.useContext(GeneralContext);
  const [isUpdatePerfilActive, setIsUpdatePerfilActive] = React.useState(false);
  
  const { currentUser } = localUser;

  return (
    <Container>
      <Update
        status={{
          value: isUpdatePerfilActive,
          set: (b) => setIsUpdatePerfilActive(b),
        }}
      />

      <Bio>
        <Avatar source={{ uri: currentUser.image || 'http://html-color.org/pt/EDE9EA.jpg' }} />
        <BioDetails>
          <Name>{ currentUser.name }</Name>
          <Andress>{ `${currentUser.andress.city} - ${currentUser.andress.state}` }</Andress>
          {
            route.params.owner ? (
              <EditButton onPress={() => setIsUpdatePerfilActive(true)} >
                <Name>Editar perfil</Name>
              </EditButton>
            ) : (
              <EditButton onPress={() => {}} >
                <Name>Mensagem</Name>
              </EditButton>
            )
          }
        </BioDetails>
      </Bio>


      <MyAnnouncement>
        <MyAds />
        <MyAds />
        <MyAds />
        <MyAds />
        <MyAds />
        <MyAds />
        <MyAds />
        
      </MyAnnouncement>
      <SpacedView />
    </Container>
  );
}
