import { create } from "zustand";
import { InsertarEmpresa, MostrarEmpresaXidauth, MostrarEmpresaXidusuario } from "../supabase/crudEmpresa";

export const useEmpresaStore = create((set) => ({
    dataEmpresa: [],
    mostrarEmpresa: async (p: any) => {
        const response = await MostrarEmpresaXidusuario()
        set({ dataEmpresa: response})
        return response;
    },
    insertarEmpresa: async (p: any, f: File | null) => {
        const response = await InsertarEmpresa(p, f)
        if (response) {
            console.log("Response de la empresa", response)
            return true;
        }
        return false;
    }
}))