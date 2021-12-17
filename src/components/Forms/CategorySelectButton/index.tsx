import React from 'react';

import S from './styles'

interface ISelectProps {
  title: string;
  onPress: () => void;
}

export default ({title, onPress}: ISelectProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.TextCategory>
        {title}
      </S.TextCategory>

      <S.IconSelect name="chevron-down" />
    </S.Container>
  );
}