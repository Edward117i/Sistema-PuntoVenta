import { Routes, Route, Navigate, data } from 'react-router-dom'
import { Categorias, Configuraciones, Home, Login, ProtectedRoute, Spinner, useEmpresaStore, useUsuariosStore } from '../index'
import { UserAuth } from '../context/AuthContext'
import { useQuery } from '@tanstack/react-query'

export function Routers() {

  const {user}= UserAuth()
  const {dataUsuarios, mostrarUsuarios} = useUsuariosStore()
  const {mostrarempresa, dataEmpresa} = useEmpresaStore();
  const {isLoading,error} = useQuery({queryKey: ["mostrar usuarios"], queryFn: mostrarUsuarios})
  const {} = useQuery({queryKey:["mostrar empresa", dataUsuarios?.id_empresa],
                                queryFn: () => mostrarempresa({_id_usuario:dataUsuarios?.id}),
                                enabled: !! dataUsuarios?.id})
  
  if(isLoading){
    return(<Spinner/>)
  }
  if(error){
    return(<span>Error al cargar los usuarios</span>)
  }
  
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