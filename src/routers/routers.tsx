import { Routes, Route, Navigate } from 'react-router-dom'
import { Categorias, Configuraciones, Home, Login, ProtectedRoute } from '../index'
import { UserAuth } from '../context/AuthContext'

export function Routers() {
  const {user}= UserAuth()
  return (
    <Routes>
      <Route element={<ProtectedRoute user={user} redirectTo='/login'/>}>
        <Route path="/" element={<Home />} />
        <Route path="/configuracion" element={<Configuraciones />} />
        <Route path="/configuracion/categorias" element={<Categorias />} />
      </Route>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
    </Routes>
  )
} 