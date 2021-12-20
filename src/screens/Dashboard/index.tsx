import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import HighLighCard from '../../components/HighLighCard';
import TransactionCard, { IDataTransactionCardProps } from '../../components/TransactionCard';

import S from './styles';

export interface IDataListProps extends IDataTransactionCardProps {
  id: string;
}

const Dashboard = () => {
  
  const [data, setData] = useState<IDataListProps[]>([]);

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransaction();
  }, []))

  const loadTransaction = async () => {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormated: IDataListProps[] = transactions.map((item: IDataListProps) => {
      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    })

    setData(transactionsFormated);

  }

  return (
    <S.Container >

      <S.BoxHeader>
        <S.BoxComponent>
          <S.BoxUserInfo>
            <S.Photo source={{ uri: 'https://avatars.githubusercontent.com/u/53402919?v=4' }} />
            <S.BoxUser>
              <S.TextGreeting>Olá</S.TextGreeting>
              <S.TextTitleName>Jeandson</S.TextTitleName>
            </S.BoxUser>
          </S.BoxUserInfo>

          <S.BoxLogoutButton onPress={() => {}} >
            <S.IconPower name="power"/>
          </S.BoxLogoutButton>

        </S.BoxComponent>
      </S.BoxHeader>

      <S.BoxHighLighCards>
        <HighLighCard   
          type="up"
          title="Entradas" 
          amount="R$ 17.900,00" 
          lastTransaction="Última entrada dia 13 de abril" 
        />
        <HighLighCard 
          type="down"  
          title="Saídas" 
          amount="R$ 1.900,00" 
          lastTransaction="Última entrada dia 13 de abril" 
        />
        <HighLighCard 
          type="total"  
          title="Total" 
          amount="R$ 15.100,00" 
          lastTransaction="Última entrada dia 13 de abril" 
        />
      </S.BoxHighLighCards>

      <S.BoxTransaction>
        <S.TextTransaction>Listagem</S.TextTransaction>

        <S.TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item} />}
        />

      </S.BoxTransaction>
    </S.Container>
  );
}

export { Dashboard };