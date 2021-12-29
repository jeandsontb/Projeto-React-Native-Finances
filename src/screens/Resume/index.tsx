import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HistoryCard from '../../components/HistoryCard';
import S from './styles';
import { categories } from '../../utils/categories';

interface ITRansactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface ICategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export default () => {

  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive: ITRansactionData) => 
      expensive.type === 'negative');

    const totalByCategory: ICategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: ITRansactionData) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  return (
    <S.Container>
      <S.BoxHeader>
        <S.TextTitle>
          Resumo por Categoria
        </S.TextTitle>
      </S.BoxHeader>

      <S.ScrollContent>
        {totalByCategories.map(item => (
          <HistoryCard 
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
            />
          ))
        }
      </S.ScrollContent>
    </S.Container>
  )
}