import { supabase } from "../index"
const tabla = "tipo_documentos"

export async function MostrarTipoDocumentos(p:any) {
    const {data} = await supabase.from(tabla)
    .select()
    .eq("id_empresa", p.id_empresa)
    
    return data;
}

