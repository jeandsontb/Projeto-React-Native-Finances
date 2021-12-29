import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export default () => {

  const theme = useTheme();

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

    const expensivesTotal = expensives.reduce((
      acumullator: number, expensive: ITRansactionData
    ) => {
      return acumullator + Number(expensive.amount);
    }, 0);

    const totalByCategory: ICategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: ITRansactionData) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
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
        <S.BoxChartContainer>
          <VictoryPie 
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={60}
            x="percent"
            y="total"
          />
        </S.BoxChartContainer>

        {totalByCategories.map(item => (
          <HistoryCard 
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
            />
          ))
        }
      </S.ScrollContent>
    </S.Container>
  )
}