import { create } from "zustand"
import { MostrarUsuarios, ObtenerIdAuthSupabse } from "../index"


export const useUsuariosStore = create((set) => ({
    dataUsuarios: [],
    mostrarUsuarios: async () => {
        const idauth = await ObtenerIdAuthSupabse();
        const response = await MostrarUsuarios({idauth: idauth});
        set({ dataUsuarios: response });
        return response;
    }
}));