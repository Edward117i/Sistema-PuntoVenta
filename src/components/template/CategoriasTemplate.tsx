import styled from "styled-components";

export function CategoriasTemplate() {
  return (
    <Container>
      <h1>Categorías</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgtotal};
`;
