import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import HighLighCard from '../../components/HighLighCard';
import TransactionCard, { IDataTransactionCardProps } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/auth';

import S from './styles';

export interface IDataListProps extends IDataTransactionCardProps {
  id: string;
}

interface IHighLightProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightData {
  entries: IHighLightProps;
  expensives: IHighLightProps;
  total: IHighLightProps;
}

const Dashboard = () => {
  
  const theme = useTheme();
  const { signOut, user } = useAuth();
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
    const dataKey = `@gofinances:transactions_user:${user.id}`;
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

    const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative');

    const totalInterval = lastTransactionsExpensives === 0 
      ? 'N??o h?? transa????es'
      : `01 a ${lastTransactionsExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsEntries === 0 
          ? `N??o h?? transa????es ` 
          : `??ltima entrada dia ${lastTransactionsEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsExpensives === 0 
        ? `N??o h?? transa????es`
        : `??ltima sa??da dia ${lastTransactionsExpensives}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    });

    setTransactions(transactionsFormated);
    setIsLoading(false);  
  }

  const getLastTransactionDate = (
    collection: IDataListProps[], 
    type: 'positive' | 'negative'
  ) => {

    const collectionFilttered = collection
      .filter(transaction => transaction.type === type);

    if(collectionFilttered.length === 0) {
      return 0;
    }

    const lastTransactions = new Date(Math.max.apply(Math, collectionFilttered
      .map(transaction => new Date(transaction.date).getTime())));

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString(
      'pt-BR',
      {
        month: 'long'
      }
    )}`;
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
                <S.Photo source={{ uri: user.photo }} />
                <S.BoxUser>
                  <S.TextGreeting>Ol??</S.TextGreeting>
                  <S.TextTitleName>{user.name}</S.TextTitleName>
                </S.BoxUser>
              </S.BoxUserInfo>

              <TouchableWithoutFeedback onPress={signOut}>
                <S.BoxLogoutButton>
                  <S.IconPower name="power"/>
                </S.BoxLogoutButton>
              </TouchableWithoutFeedback>

            </S.BoxComponent>
          </S.BoxHeader>

          <S.BoxHighLighCards>
            <HighLighCard   
              type="up"
              title="Entradas" 
              amount={highlightData.entries.amount} 
              lastTransaction={highlightData.entries.lastTransaction} 
            />
            <HighLighCard 
              type="down"  
              title="Sa??das" 
              amount={highlightData.expensives.amount} 
              lastTransaction={highlightData.expensives.lastTransaction} 
            />
            <HighLighCard 
              type="total"  
              title="Total" 
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction} 
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