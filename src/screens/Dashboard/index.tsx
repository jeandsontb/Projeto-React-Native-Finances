import React from 'react';

import HighLighCard from '../../components/HighLighCard';
import TransactionCard from '../../components/TransactionCard';

import S from './styles';

const Dashboard = () => {
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

        <TransactionCard />
        
      </S.BoxTransaction>
    </S.Container>
  );
}

export { Dashboard };