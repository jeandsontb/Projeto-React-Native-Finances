import React, {useState} from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import S from './styles';
import InputForm from '../../components/Forms/InputForm';
import Button from '../../components/Forms/Button';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

interface IFormData {
  name: string;
  amount: string;
}

export default () => {

  const { control, handleSubmit } = useForm();

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

  const handleRegister = (form: IFormData) => {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return (
    <S.Container>
      <S.BoxHeader>
        <S.TextTitle>Cadastro</S.TextTitle>
      </S.BoxHeader>

      <S.Form>
        <S.BoxFields>
          <InputForm 
            name='name'
            control={control}
            placeholder='Nome'
          />

          <InputForm 
            name='amount'
            control={control}
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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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

