import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

import { IDataListProps } from '.';

export default {
  Container: styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
  `,
  BoxHeader: styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  `,
  BoxComponent: styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  `,
  BoxUserInfo: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Photo: styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
  `,
  BoxUser: styled.View`
    margin-left: 17px;
  `,
  TextGreeting: styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
  `,
  TextTitleName: styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
  `,
  BoxLogoutButton: styled(BorderlessButton)``,
  IconPower: styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
  `,
  BoxHighLighCards: styled.ScrollView.attrs({
    horizontal: true, 
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
  })`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
  `,
  BoxTransaction: styled.View`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(8)}px;
  `,
  TextTransaction: styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin-bottom: 16px;
  `,
  TransactionList: styled(
    FlatList as new (props: FlatListProps<IDataListProps>) => FlatList<IDataListProps>
    ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: getBottomSpace() 
    }
  })``,
  LoadingContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
}