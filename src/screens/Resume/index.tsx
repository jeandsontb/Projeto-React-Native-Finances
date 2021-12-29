import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([]);

  const handleChangeDate = (action: 'next' | 'prev') => {
    if(action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  } 

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))

  const loadData = async () => {
    setIsLoading(true);
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
      .filter((expensive: ITRansactionData) => 
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );

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
    setIsLoading(false);
  }

  return (
    <S.Container>
      <S.BoxHeader>
        <S.TextTitle>
          Resumo por Categoria
        </S.TextTitle>
      </S.BoxHeader>

      {isLoading ?
        <S.BoxLoaderContainer>
          <ActivityIndicator 
            color={theme.colors.primary}
            size="large"
          />
        </S.BoxLoaderContainer> 
        
        :

        <S.ScrollContent
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight()
          }}
        >

          <S.BoxMonthSelector>
            <S.ButtonMonthSelector onPress={() => handleChangeDate('prev')} >
              <S.IconMonthSelector name="chevron-left"/>
            </S.ButtonMonthSelector>

            <S.TextMonth>
              { format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }
            </S.TextMonth>

            <S.ButtonMonthSelector onPress={() => handleChangeDate('next')} >
              <S.IconMonthSelector name="chevron-right"/>
            </S.ButtonMonthSelector>
          </S.BoxMonthSelector>


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
              labelRadius={100}
              x={(info) => info.percent}
              y={(info) => info.total}
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
      }
    </S.Container>
  )
}