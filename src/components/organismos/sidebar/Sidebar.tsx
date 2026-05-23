import {
  LinksArray,
  SecondarylinksArray,
  ToggleTema,
} from "../../../index";
import { v } from "../../../styles/variables";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useThemeStore } from "../../../store/ThemeStore";

export function Sidebar({ state, setState }: { state: boolean; setState: (val: boolean) => void }) {
  const { themeStyle } = useThemeStore()

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      paddingTop: "20px",
      borderRight: `2px solid ${themeStyle.color2}`,
      position: "relative",
      backgroundColor: themeStyle.bgtotal,
      color: themeStyle.text,
    }}>
      <span
        onClick={() => setState(!state)}
        style={{
          position: "fixed",
          top: "70px",
          left: state ? "241px" : "68px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: themeStyle.bgtgderecha,
          boxShadow: `0 0 4px ${themeStyle.bg3}, 0 0 7px ${themeStyle.bg}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "left 0.3s ease-in-out",
          zIndex: 3,
          transform: state ? "rotate(3.142rad)" : "initial",
          color: themeStyle.text,
        }}
      >
        <v.iconoflechaderecha />
      </span>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "60px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "30px",
          cursor: "pointer",
          transform: state ? "scale(0.7)" : "scale(1.5)",
          transition: "0.3s ease",
        }}>
          <img src={v.logo} style={{width: "100%"}} />
        </div>
        {state && <h2 style={{color: "#f88533", margin: "0 0 0 10px"}}>Sistema PoS</h2>}
      </div>

      {LinksArray.map(({ icon, label, to }) => (
        <div style={{margin: "9px 8px 9px 8px"}} key={label}>
          <NavLink
            to={to}
            style={({ isActive }) => ({
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              height: "60px",
              background: isActive ? themeStyle.bg6 : "transparent",
              border: isActive ? `2px solid ${themeStyle.bg5}` : "2px solid transparent",
              color: isActive ? themeStyle.color1 : themeStyle.text,
            })}
          >
            <div style={{
              display: "flex",
              justifyContent: state ? "flex-start" : "center",
              alignItems: "center",
              width: "100%",
              gap: state ? "20px" : "0",
              padding: state ? "0 20px" : "0",
            }}>
              <Icon style={{fontSize: "33px"}} icon={icon} />
              {state && <span style={{fontWeight: 700, textTransform: "uppercase"}}>{label}</span>}
            </div>
          </NavLink>
        </div>
      ))}

      <div style={{height: "1px", background: themeStyle.bg4, margin: "24px 0"}} />

      {SecondarylinksArray.map(({ icon, label, to, color }) => (
        <div style={{margin: "9px 8px 9px 8px"}} key={label}>
          <NavLink
            to={to}
            style={({ isActive }) => ({
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              height: "60px",
              background: isActive ? themeStyle.bg6 : "transparent",
              border: isActive ? `2px solid ${themeStyle.bg5}` : "2px solid transparent",
              color: isActive ? themeStyle.color1 : themeStyle.text,
            })}
          >
            <div style={{
              display: "flex",
              justifyContent: state ? "flex-start" : "center",
              alignItems: "center",
              width: "100%",
              gap: state ? "20px" : "0",
              padding: state ? "0 20px" : "0",
            }}>
              <Icon color={color} style={{fontSize: "33px"}} icon={icon} />
              {state && <span style={{fontWeight: 700, textTransform: "uppercase"}}>{label}</span>}
            </div>
          </NavLink>
        </div>
      ))}

      <div style={{margin: "9px 8px 9px 8px"}}>
        <div style={{
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          height: "60px",
          cursor: "pointer",
        }}>
          <div style={{
            display: "flex",
            justifyContent: state ? "flex-start" : "center",
            alignItems: "center",
            width: "100%",
            gap: state ? "20px" : "0",
            padding: state ? "0 20px" : "0",
          }}>
            <Icon color="#CE82FF" style={{fontSize: "33px"}} icon="heroicons:ellipsis-horizontal-circle-solid" />
            {state && <span style={{fontWeight: 700, textTransform: "uppercase", color: themeStyle.text}}>MÁS</span>}
          </div>
        </div>
      </div>

      <ToggleTema />
    </div>
  );
}