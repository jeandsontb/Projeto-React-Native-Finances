import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export default {
  Container: styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
  `,
  BoxLoaderContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
  BoxHeader: styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
  `,
  TextTitle: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: 18px;
  `,
  ScrollContent: styled.ScrollView``,
  BoxChartContainer: styled.View`
    width: 100%;
    align-items: center;
  `,
  BoxMonthSelector: styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
  `,
  ButtonMonthSelector: styled.TouchableOpacity`
    
  `,
  IconMonthSelector: styled(Feather)`
    font-size: ${RFValue(24)}px;
  `,
  TextMonth: styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
  `
}