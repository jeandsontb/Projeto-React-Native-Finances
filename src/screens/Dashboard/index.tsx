import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import HighLighCard from '../../components/HighLighCard';
import TransactionCard from '../../components/TransactionCard';

import S from './styles';

const Dashboard = () => {

  const data = [
    {
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 1.350,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "12/12/2020"
    },
    {
      type: 'negative',
      title: "Hamburgueria",
      amount: "R$ 1.350,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "12/12/2020"
    },
    {
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.350,00",
      category: {
        name: 'Vendas',
        icon: 'shopping-bag'
      },
      date: "12/12/2020"
    }
  ];

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

          <S.IconPower name="power"/>
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
          renderItem={({item}) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace() 
          }}
        />

      </S.BoxTransaction>
    </S.Container>
  );
}

export { Dashboard };