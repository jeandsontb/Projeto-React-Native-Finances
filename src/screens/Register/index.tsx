import React, {useState} from 'react';

import S from './styles';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';

export default () => {

  const [transactionType, setTransactionType] = useState('');

  const handleTransactionSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  }

  return (
    <S.Container>
      <S.BoxHeader>
        <S.TextTitle>Cadastro</S.TextTitle>
      </S.BoxHeader>

      <S.Form>
        <S.BoxFields>
          <Input 
            placeholder='Nome'
          />

          <Input 
            placeholder='Preço'
          />

          <S.BoxTransactionsTypes>
            <TransactionTypeButton 
              type="up"
              title='Income'
              onPress={() => handleTransactionSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton 
              type="down"
              title='Outcome'
              onPress={() => handleTransactionSelect('down')}
              isActive={transactionType === 'down'}
            />
          </S.BoxTransactionsTypes>
        </S.BoxFields>

        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
}

