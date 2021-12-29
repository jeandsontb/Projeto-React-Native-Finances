import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import HighLighCard from '../../components/HighLighCard';
import TransactionCard, { IDataTransactionCardProps } from '../../components/TransactionCard';

import S from './styles';

export interface IDataListProps extends IDataTransactionCardProps {
  id: string;
}

interface IHighLightProps {
  amount: string;
}

interface IHighlightData {
  entries: IHighLightProps;
  expensives: IHighLightProps;
  total: IHighLightProps;
}

const Dashboard = () => {
  
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>({} as IHighlightData);


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

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: IDataListProps[] = transactions.map((item: IDataListProps) => {

      if(item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

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

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    });

    setTransactions(transactionsFormated);
    setIsLoading(false);    
  }

  return (
    <S.Container >
      {isLoading ? 
      <S.LoadingContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </S.LoadingContainer> :
        <>
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
              amount={highlightData.entries.amount} 
              lastTransaction="Última entrada dia 13 de abril" 
            />
            <HighLighCard 
              type="down"  
              title="Saídas" 
              amount={highlightData.expensives.amount} 
              lastTransaction="Última entrada dia 13 de abril" 
            />
            <HighLighCard 
              type="total"  
              title="Total" 
              amount={highlightData.total.amount}
              lastTransaction="Última entrada dia 13 de abril" 
            />
          </S.BoxHighLighCards>

          <S.BoxTransaction>
            <S.TextTransaction>Listagem</S.TextTransaction>

            <S.TransactionList 
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => <TransactionCard data={item} />}
            />

          </S.BoxTransaction>
        </>
      }
    </S.Container>
  );
}

export { Dashboard };