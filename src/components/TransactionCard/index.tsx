import React from 'react';
import { categories } from '../../utils/categories';

import S from './styles';

export interface IDataTransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface IResponseProps {
  data: IDataTransactionCardProps;
}

export default ({ data }: IResponseProps) => {

  const category = categories.filter(item => item.key === data.category)[0];
  // const [category] = categories.filter(item => item.key === data.category); poderia ser assim também

  return (
    <S.Container>
      <S.TextTitle>{data.name}</S.TextTitle>

      <S.TextAmount type={data.type} >
        {data.type === 'negative' && '- '}
        {data.amount}
      </S.TextAmount>

      <S.BoxFooter>
        <S.BoxCategory>
          <S.Icon name={category.icon} />
          <S.TextCategoryName>{category.name}</S.TextCategoryName>
        </S.BoxCategory>

        <S.TextDate>{data.date}</S.TextDate>
      </S.BoxFooter>
    </S.Container>
  );
}