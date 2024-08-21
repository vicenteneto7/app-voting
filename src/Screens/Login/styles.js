import styled from "styled-components/native";

export const LoginContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-color: ${(props) => props.theme["gray-900"]};
`;

export const TecladoView = styled.KeyboardAvoidingView`
  height: 230px;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1px;
`;

export const InputForm = styled.TextInput`
  height: 40px;
  width: 300px;
  padding: 0 10px;
  margin-top: 3px;

  background-color: ${(props) => props.theme["white"]};

  color: ${(props) => props.theme["gray-900"]};

  border: 1px;
  border-radius: 3px;
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme["gray-300"]};
`;

export const ContainerLink = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const Link = styled.TouchableOpacity`
  font-size: 18px;
  color: red;
`;
