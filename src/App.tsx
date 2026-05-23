import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Routers } from "./routers/routers";
import { Sidebar } from "./components/organismos/sidebar/Sidebar";
import { Login } from "./pages/Login";
import { useThemeStore } from "./store/ThemeStore";
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
          <div style={{
            display: "grid",
            minHeight: "100vh",
            gridTemplateColumns: sidebarOpen ? "260px 1fr" : "88px 1fr",
            gridTemplateRows: "1fr",
            gridTemplateAreas: '"sidebar routers"',
            transition: "grid-template-columns 0.3s ease-in-out"
          }}>
            <GlobalStyles />
            <section style={{
              gridArea: "sidebar",
              width: sidebarOpen ? "260px" : "88px",
              maxWidth: sidebarOpen ? "260px" : "88px",
              transition: "width 0.3s ease-in-out",
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
    </ThemeProvider>
  )
}

export default App