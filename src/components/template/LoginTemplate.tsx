import styled from "styled-components";
import { Title, InputText2, Btnsave, Linea, Footer, useAuthStore } from "../../index"; // Importamos ambos
import { v } from "../../styles/variables";

export function LoginTemplate() {
  const { loginGoogle } = useAuthStore();

  return (
    <Container>
      <section className="ContentCard">
        <div className="card">
          <div className="tituloContainer">
            <img src={v.logo} className="logoTitle" alt="logo" />
            <Title>INICIAR SESIÓN</Title>
          </div>
          <form>
            <InputText2>
              <input 
                className="form__field" 
                type="text" 
                placeholder="email"
              />
            </InputText2>
            <InputText2>
              <input 
                className="form__field" 
                type="text" 
                placeholder="password"
              />
            </InputText2>
            <div className="btnContainer">
              <Btnsave titulo='INGRESAR' bgcolor='#11A6FF' width='100%' funcion={() => {}}/>
            </div>
          </form>
          <Linea>
            <span>0</span>
          </Linea>
          <div className="googleBtnContainer">
            <Btnsave 
              color="0,0,0" 
              funcion={loginGoogle} 
              titulo="Google" 
              bgcolor="#fff" 
              icono={<v.iconogoogle/>}
            />
          </div>
        </div>
      </section>
      <Footer/>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.bgtotal};
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
  position: relative;
  overflow: hidden;

  @media (max-height: 650px) {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }

  & > *:last-child {
    margin-top: auto;
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .ContentCard {
    margin: auto;
    width: 100%;
    max-width: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    
    @media (max-width: 480px) {
      padding: 15px;
    }

    .card {
      background-color: ${(props) => props.theme.bg};
      padding: 40px 45px;
      border-radius: 30px; /* Bordes más suaves para look premium */
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,0.06);

      @media (max-width: 480px) {
        padding: 30px 25px; /* Reducir padding interno en móviles para que no se vea tan apretado */
      }

      .tituloContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 10px;

        .logoTitle {
          width: 42px;
          height: 42px;
          object-fit: contain;
          animation: flotar 1.7s ease-in-out infinite alternate;
        }
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        .form__field:focus{
          outline: none;
          border-color: #11A6FF;
        }
        .btnContainer {
          display: flex;
          justify-content: center;
          margin-top: 10px;
          width: 100%;
        }
      }

      .googleBtnContainer {
        display: flex;
        justify-content: center; 
        width: 100%;
        button {
          width: 80%; /* Un poco más ancho en móviles para mejor usabilidad */
          justify-content: center;
          @media (max-width: 480px) {
            width: 100%;
          }
        }
      }
    }
  }
`;
