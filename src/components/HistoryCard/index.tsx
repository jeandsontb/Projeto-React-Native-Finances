import React from 'react';

import S from './styled';

interface IInfoProps {
  title: string;
  amount: string;
  color: string;
}

export default ({title, amount, color}: IInfoProps) => {
  return (
    <S.Container color={color} >
      <S.TextTitle>{title}</S.TextTitle>
      <S.TextAmout>{amount}</S.TextAmout>
    </S.Container>
  )
}