import React from 'react';

import S from './styles';

interface ICategory {
  name: string;
  icon: string;
}

interface IData {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}

interface IResponseProps {
  data: IData;
}

export default ({ data }: IResponseProps) => {
  return (
    <S.Container>
      <S.TextTitle>{data.title}</S.TextTitle>

      <S.TextAmount type={data.type} >
        {data.type === 'negative' && '- '}
        {data.amount}
      </S.TextAmount>

      <S.BoxFooter>
        <S.BoxCategory>
          <S.Icon name={data.category.icon} />
          <S.TextCategoryName>{data.category.name}</S.TextCategoryName>
        </S.BoxCategory>

        <S.TextDate>{data.date}</S.TextDate>
      </S.BoxFooter>
    </S.Container>
  );
}