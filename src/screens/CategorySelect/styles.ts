import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ICategoryProps {
  isActive: boolean;
}

export default {
  Container: styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
  `,
  BoxHeader: styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({theme}) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
  `,
  TextTitle: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
  `,
  ButtonCategory: styled.TouchableOpacity<ICategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme, isActive}) => 
      isActive ? theme.colors.secondary_light : theme.colors.background};
  `,
  IconCategory: styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
  `,
  TextName: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
  `,
  BoxSeparator: styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.text};
  `,
  BoxFooter: styled.View`
    width: 100%;
    padding: 24px;
  `,
}