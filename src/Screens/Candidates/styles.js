import styled from "styled-components/native";

export const CandidatesContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  background-color: ${(props) => props.theme["white"]};
`;