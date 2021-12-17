import React, {useState} from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const shema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
})

export default () => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(shema)
  });

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

    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
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
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm 
              name='amount'
              control={control}
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
  );
}

