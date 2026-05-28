import styled from "styled-components";
import {Btnsave, Title, Buscador} from "../../index";
import { v } from "../../styles/variables"

export function CategoriasTemplate() {
  return (
    <Container>
      {/* <h1>Categorías</h1> */}
      <section className="area1"><Title>Categorias</Title>
      <Btnsave bgcolor={v.colorPrincipal} titulo="Agregar" icono={<v.iconoagregar/>}/>
      </section>
      <section className="area2">
        <Buscador/>
      </section>
      <section className="main">main</section>
    </Container>
  );
}

const Container = styled.div`
  height:calc(100vh - 30px);
  padding: 15px;
  //width: 100%;
  display: grid;
  grid-template:
    "area1" 60px
    "area2" 60px
    "main" 650px;

  .area1 {
    grid-area: area1;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
  }

  .area2{
    grid-area: area2;
    background-color: rgba(93, 234, 241, 0.14);
    display: flex;
    justify-content: end;
    align-items: center;

  }

  .main {
    grid-area: main;
    background-color: rgba(103, 93, 241, 0.14);
  }
`;