import React from 'react';

import S from './styles';
import Input from '../../components/Forms/Input';

export default () => {
  return (
    <S.Container>
      <S.BoxHeader>
        <S.TextTitle>Cadastro</S.TextTitle>
      </S.BoxHeader>

      <S.Form>
        <Input 
          placeholder='Nome'
        />

        <Input 
          placeholder='Preço'
        />
      </S.Form>
    </S.Container>
  );
}

