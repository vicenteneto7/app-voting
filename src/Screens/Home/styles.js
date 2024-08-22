import styled from "styled-components/native";

export const HomeContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-color: ${(props) => props.theme["gray-900"]};
`;