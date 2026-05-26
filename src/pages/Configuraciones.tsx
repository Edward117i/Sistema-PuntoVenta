
import { useQuery } from '@tanstack/react-query'
import {ConfiguracionesTemplate, useModuloStore} from '../index'

export function Configuraciones() {
    const {mostrarModulos} = useModuloStore()
    const {isLoading, error} = useQuery({
        queryKey: ["mostrarModulos"],
        queryFn: mostrarModulos
    })
    if (isLoading) {
        return <span style={{color: "black"}}>Cargando...</span>
    }
    if (error) {
        return <span style={{color: "red"}}>Error al cargar los modulos</span>
    }
    return (<ConfiguracionesTemplate/>)
}
