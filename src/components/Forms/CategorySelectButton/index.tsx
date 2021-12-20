import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import S from './styles'

interface ISelectProps {
  title: string;
  onPress: () => void;
}

export default ({title, onPress}: ISelectProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <S.Container>
        <S.TextCategory>
          {title}
        </S.TextCategory>

        <S.IconSelect name="chevron-down" />
      </S.Container>
    </TouchableWithoutFeedback>
  );
}