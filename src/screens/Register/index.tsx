import React, {useState} from 'react';
import { Modal } from 'react-native';

import S from './styles';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

export default () => {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria'
  });
  
  const handleTransactionSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  }

  const handleOpenModalSelectCategory = () => {
    setCategoryModalOpen(true);
  }

  const handleCloseModalSelectCategory = () => {
    setCategoryModalOpen(false);
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

          <CategorySelectButton 
            title={category.name}  
            onPress={handleOpenModalSelectCategory}
          />
        </S.BoxFields>

        <Button title="Enviar" />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseModalSelectCategory}
        />
      </Modal>
    </S.Container>
  );
}

