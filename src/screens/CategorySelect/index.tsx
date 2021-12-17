import React from 'react';
import { FlatList } from 'react-native';
import Button from '../../components/Forms/Button';
import { categories } from '../../utils/categories';

import S from './styles'

interface ICategory {
  key: string;
  name: string;
}

interface IActionsProps {
  category: ICategory;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

const CategorySelect = ({category, setCategory, closeSelectCategory}: IActionsProps) => {

  const handleCategorySelect = (category: ICategory) => {
    setCategory(category);
  }

  return (
    <S.Container>
      <S.BoxHeader>
        <S.TextTitle>Categoria</S.TextTitle>
      </S.BoxHeader>

      <FlatList 
        data={categories}
        style={{flex: 1, width: '100%'}}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <S.ButtonCategory
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <S.IconCategory name={item.icon} />
            <S.TextName>{item.name}</S.TextName>
          </S.ButtonCategory>
        )}
        ItemSeparatorComponent={() => <S.BoxSeparator />}
      />

      <S.BoxFooter>
        <Button title='Selecionar' onPress={closeSelectCategory} />
      </S.BoxFooter>
    </S.Container>
  );
}

export { CategorySelect };