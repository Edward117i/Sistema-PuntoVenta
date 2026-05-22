import styled from "styled-components";
import fondocuadros from "../../assets/fondocuadros.svg";
import { Link } from "react-router-dom";
import { DataModulosConfiguracion } from "../../utils/dataEstatica";
import { useEffect } from "react";

export function ConfiguracionesTemplate() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll(".card").forEach((card) => {
        const htmlCard = card as HTMLElement;
        const rect = htmlCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        htmlCard.style.setProperty("--mouse-x", `${x}px`);
        htmlCard.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    const cardsContainer = document.getElementById("cards");
    if (cardsContainer) {
      cardsContainer.addEventListener("mousemove", handleMouseMove);
      return () => {
        cardsContainer.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <Container>
      <CardsGrid id="cards">
        {DataModulosConfiguracion.map((item: any, index: number) => (
          <StyledLink to={item.link} className="card" key={index}>
            <div className="card-content">
              <div className="card-image">
                <img src={item.icono} alt={item.title} />
              </div>
              <div className="card-info-wrapper">
                <div className="card-info">
                  <div className="card-info-title">
                    <h3>{item.title}</h3>
                    <h4>{item.subtitle}</h4>
                  </div>
                </div>
              </div>
            </div>
          </StyledLink>
        ))}
      </CardsGrid>
    </Container>
  );
}

const CardsGrid = styled.div`
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 16px;
  max-width: 1000px;
  width: 100%;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  height: 260px;
  flex-direction: column;
  position: relative;
  flex: 1 1 calc(50% - 8px);
  max-width: calc(50% - 8px);
  transition: all 0.3s ease;

  &:hover .card-image img {
    filter: grayscale(0);
  }

  &::before,
  &::after {
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
    pointer-events: none;
  }

  &::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    z-index: 3;
  }

  &::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 40%
    );
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  .card-content {
    background-color: ${({ theme }) => theme.bgcards};
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    inset: 1px;
    padding: 10px;
    position: absolute;
    z-index: 2;
  }

  .card-image {
    align-items: center;
    display: flex;
    height: 140px;
    justify-content: center;

    img {
      transition: 0.3s;
      height: 70%;
      filter: grayscale(100%);
    }
  }

  .card-info-wrapper {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    padding: 0px 20px;
  }

  .card-info {
    align-items: flex-start;
    display: flex;
    gap: 10px;
  }

  .card-info-title > h3 {
    font-size: 1.1em;
    line-height: 20px;
    color: ${({ theme }) => theme.colorsubtitlecard};
    font-family: "Rubik", sans-serif;
    font-weight: 600;
    margin: 0px;
  }

  .card-info-title > h4 {
    color: ${({ theme }) => theme.colortitlecard};
    font-size: 0.85em;
    margin-top: 8px;
    font-weight: 500;
    font-family: "Rubik", sans-serif;
  }

  @media (max-width: 600px) {
    height: 180px;
    .card-image {
      height: 80px;
    }
    .card-info-wrapper {
      padding: 0px 10px;
    }
    .card-info-title > h3 {
      font-size: 0.9em;
    }
    .card-info-title > h4 {
      font-size: 0.8em;
      margin-top: 4px;
    }
  }
`;

const Container = styled.div`
  background-image: url(${fondocuadros});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat, repeat;
  background-color: ${({ theme }) => theme.bgtotal};
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 40px 20px;
  padding: 40px 20px;
`;