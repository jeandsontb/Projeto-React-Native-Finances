import React from 'react';

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
        </S.BoxComponent>

      </S.BoxHeader>
    </S.Container>
  );
}

export { Dashboard };