import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Routers } from "./routers/routers";
import { Sidebar } from "./components/organismos/sidebar/Sidebar";
import { Login } from "./pages/Login";
import { useThemeStore } from "./store/ThemeStore";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const SIDEBAR_WIDTH_OPEN = "260px";
const SIDEBAR_WIDTH_CLOSED = "88px";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { themeStyle } = useThemeStore()
  const { pathname } = useLocation();
  return (
    <ThemeProvider theme={themeStyle}>
      {
        pathname != "/login" ? (
          <div style={{
            display: "grid",
            minHeight: "100vh",
            gridTemplateColumns: "auto 1fr",
            gridTemplateRows: "1fr",
            gridTemplateAreas: '"sidebar routers"',
          }}>
            <GlobalStyles />
            <section style={{
              gridArea: "sidebar",
              width: sidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
              minWidth: sidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
              maxWidth: sidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
              transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              overflow: "hidden",
              height: "100vh"
            }}>
              <Sidebar state={sidebarOpen} setState={setSidebarOpen} />
            </section>
            <section style={{gridArea: "routers", overflow: "auto"}}>
              <Routers />
            </section>
          </div>
        ) : (<Login />)
      }
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  )
}

export default App