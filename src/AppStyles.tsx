import styled from "styled-components";
import { Device } from "./styles/breakpoints";

export const AppContainer = styled.main`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 60px;
  grid-template-areas:
    "routers"
    "menu";

  .contentSidebar {
    display: none;
  }
  .contentMenu {
    grid-area: menu;
  }
  .contentRouters {
    grid-area: routers;
    overflow: auto;
  }

  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "sidebar routers";

    &.active {
      grid-template-columns: 260px 1fr;
    }
    .contentSidebar {
      display: block;
      grid-area: sidebar;
    }
    .contentMenu {
      display: none;
    }
  }
`;