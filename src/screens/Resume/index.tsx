import React from 'react';

import HistoryCard from '../../components/HistoryCard';
import S from './styles';

export default () => {
  return (
    <S.Container>
      <S.BoxHeader>
        <S.TextTitle>
          Resumo por Categoria
        </S.TextTitle>
      </S.BoxHeader>

      <HistoryCard 
        title='Compras'
        amount='150,40'
        color='red'
      />
    </S.Container>
  )
}