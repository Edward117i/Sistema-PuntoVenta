import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, Routers, Sidebar, Login, useThemeStore } from "./index"
import { Device } from "./styles/breakpoints"
import { useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { themeStyle } = useThemeStore()
  const { pathname } = useLocation();
  return (
    <ThemeProvider theme={themeStyle}>
      {
        pathname != "/login" ? (
          <Container className={sidebarOpen ? "active" : ""}>
            <GlobalStyles />
            <section className="contentSidebar">
              <Sidebar state={sidebarOpen} setState={setSidebarOpen} />
            </section>
            <section className="contentRouters">
              <Routers />
            </section>
            <section className="contentMenu">Menu</section>
          </Container>
        ) : (<Login />)
      }
    </ThemeProvider>
  )
}

const Container = styled.main`
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
    &.active {
      grid-template-columns: 260px 1fr;
    }
    grid-template-rows: 1fr;
    grid-template-areas: "sidebar routers";

    .contentSidebar {
      display: block;
      grid-area: sidebar;
    }
    .contentMenu {
      display: none;
    }
    .contentRouters {
      grid-area: routers;
    }
  }

  @media ${Device.laptop} {
    grid-template-columns: 88px 1fr;
    &.active {
      grid-template-columns: 260px 1fr;
    }
    grid-template-areas: "sidebar routers";
  }
`

export default App