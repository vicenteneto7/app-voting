import styled from 'styled-components/native'

export const LoginButtonContainer = styled.TouchableOpacity`
  background: ${(props) => props.theme['purple']};

  height: 40px;
  border-radius: 3px;

  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || '300px'};
  margin-top: ${(props) => props.marginTop || '3px'};
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.color || '#FFFFFF'};
  font-size: 16px;
  font-weight: bold;
`;