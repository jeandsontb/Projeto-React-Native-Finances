import React, {useState} from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import S from './styles';
import InputForm from '../../components/Forms/InputForm';
import Button from '../../components/Forms/Button';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { useAuth } from '../../hooks/auth';

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

  const { user } = useAuth();
  const {navigate}: NavigationProp<ParamListBase> = useNavigation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(shema)
  });

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria'
  });
  
  const handleTransactionSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type);
  }

  const handleOpenModalSelectCategory = () => {
    setCategoryModalOpen(true);
  }

  const handleCloseModalSelectCategory = () => {
    setCategoryModalOpen(false);
  }

  const handleRegister = async (form: IFormData) => {

    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {      
      const dataKey = `@gofinances:transactions_user:${user.id}`;

      const tempTransaction = await AsyncStorage.getItem(dataKey);
      const verifyTempTransaction = tempTransaction ? JSON.parse(tempTransaction) : [];
      const objectTransaction = [
        ...verifyTempTransaction,
        newTransaction
      ];


      await AsyncStorage.setItem(dataKey, JSON.stringify(objectTransaction));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'categoria'
      });

      navigate('Listagem');

    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível salvar');
    }
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
                onPress={() => handleTransactionSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton 
                type="down"
                title='Outcome'
                onPress={() => handleTransactionSelect('negative')}
                isActive={transactionType === 'negative'}
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

