import styled from "styled-components/native";

export const HomeContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-color: ${(props) => props.theme["white"]};
`;

export const Container1 = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const Container2 = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const P = styled.Text`
  color: ${(props) => props.theme["black"]};
`