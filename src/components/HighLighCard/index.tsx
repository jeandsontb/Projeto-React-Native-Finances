import React from 'react';

import S from './styles'

interface IProps {
  type: 'up' | 'down' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export default ({type, title, amount, lastTransaction}: IProps) => {
  return (
    <S.Container type={type}>
      <S.BoxHeader>
        <S.TitleHeader type={type} >{title}</S.TitleHeader>
        <S.IconHeaderCard name={icon[type]} type={type} />
      </S.BoxHeader>

      <S.BoxFooter>
        <S.TextAmount type={type} >{amount}</S.TextAmount>
        <S.LastTransaction type={type}>{lastTransaction}</S.LastTransaction>
      </S.BoxFooter>
    </S.Container>
  )
}