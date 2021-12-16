import React from 'react';

import S from './styles';

export default () => {
  return (
    <S.Container>
      <S.TextTitle>Desenvolvimento de site</S.TextTitle>

      <S.TextAmount>R$ 12.000</S.TextAmount>

      <S.BoxFooter>
        <S.BoxCategory>
          <S.Icon name="dollar-sign" />
          <S.TextCategoryName>Vendas</S.TextCategoryName>
        </S.BoxCategory>

        <S.TextDate>12/12/2020</S.TextDate>
      </S.BoxFooter>
    </S.Container>
  );
}