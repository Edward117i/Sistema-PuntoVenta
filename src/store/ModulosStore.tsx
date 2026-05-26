import { create } from "zustand"
import { MostrarModulos } from "../index"

interface ModuloState {
    dataModulos: any[];
    mostrarModulos: () => Promise<any>;
}

export const useModuloStore = create<ModuloState>((set) => ({
    dataModulos: [],
    mostrarModulos: async () => {
        const response = await MostrarModulos();
        set({ dataModulos: response ?? [] });
        return response;
    }
}));