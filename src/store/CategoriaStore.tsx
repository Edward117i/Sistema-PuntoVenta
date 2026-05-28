import { create } from "zustand";
import {
  BuscarCategorias,
  EditarCategoria,
  EliminarCategorias,
  InsertarCategorias,
  MostrarCategorias,
} from "../supabase/crudCategories";

export const useCategoriasStore = create((set: any, get: any) => ({
  buscador: "",
  setBuscador: (p: any) => {
    set({ buscador: p });
  },
  datacategorias: [],
  categoriaItemSelect: [],
  parametros: {},
  mostrarCategorias: async (p: any) => {
    const response = await MostrarCategorias(p);
    set({ parametros: p });
    set({ datacategorias: response });
    set({ categoriaItemSelect: response ? response[0] : null });
    return response;
  },
  selectCategoria: (p: any) => {
    set({ categoriaItemSelect: p });
  },
  InsertarCategorias: async (p: any) => {
    await InsertarCategorias(p, p.file);
    const { mostrarCategorias } = get();
    const { parametros } = get();
    await mostrarCategorias(parametros);
  },
  EliminarCategorias: async (p: any) => {
    await EliminarCategorias(p);
    const { mostrarCategorias } = get();
    const { parametros } = get();
    await mostrarCategorias(parametros);
  },
  EditarCategoria: async (p: any, fileold: any, filenew: any) => {
    await EditarCategoria(p, fileold, filenew);
    const { mostrarCategorias } = get();
    const { parametros } = get();
    await mostrarCategorias(parametros);
  },
  BuscarCategorias: async (p: any) => {
    const data = await BuscarCategorias(p);
    set({ datacategorias: data });
    return data;
  },
}));