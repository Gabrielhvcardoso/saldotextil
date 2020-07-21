import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Item } from './styles';

export default function Product() {
  const navigation = useNavigation();

  return (
    <Item navigation={navigation} />
  )
}
