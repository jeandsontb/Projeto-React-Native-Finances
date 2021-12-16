import styled, {css} from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ITypeProps {
  type: 'up' | 'down' | 'total';
}

export default {
  Container: styled.View<ITypeProps>`
    background-color: ${({theme, type}) => 
      type === 'total' ? theme.colors.secondary : theme.colors.shape };
    width: ${RFValue(280)}px;
    padding: 10px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;
    border-radius: 5px;
  `,
  BoxHeader: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
  TitleHeader: styled.Text<ITypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme, type }) => 
      type === 'total' ? theme.colors.shape : theme.colors.text_dark };
  `,
  IconHeaderCard: styled(Feather)<ITypeProps>`
    font-size: ${RFValue(40)}px;
    
    ${({type}) => type === 'up' && css`
      color: ${({ theme }) => theme.colors.success};
    `}

    ${({type}) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
    `}

    ${({type}) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
    `}
  `,
  BoxFooter: styled.View`
    
  `,
  TextAmount: styled.Text<ITypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme, type }) => 
      type === 'total' ? theme.colors.shape : theme.colors.text_dark };
    margin-top: 38px;
  `,
  LastTransaction: styled.Text<ITypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme, type }) => 
      type === 'total' ? theme.colors.shape : theme.colors.text };
    font-size: ${RFValue(12)}px;
  `
}