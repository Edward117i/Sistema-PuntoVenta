import { useQuery } from "@tanstack/react-query";
import { CategoriasTemplate } from "../index";
import { useCategoriasStore } from "../index";
import { useEmpresaStore } from "../index";

export function Categorias() {
    const {mostrarCategorias} = useCategoriasStore()
    const {} = useEmpresaStore()
    const {} = useQuery({queryKey:["mostrar categorias",]})
    return (<CategoriasTemplate/>);
}