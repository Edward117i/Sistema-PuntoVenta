import { supabase } from "../index"

export async function MostrarTipoDocumentos(p:any) {
    const {data} = await supabase.from("tipodocumento")
    .select()
    .eq("id_empresa", p.id_empresa)
    
    return data;
}

export async function InsertarTipoDocumento(p: any) {
    console.log("📌 Insertando tipos de documento:", p);
    
    const { error, data } = await supabase
        .from("tipodocumento")
        .insert(p)
        .select();
    if (error) {
        console.error("❌ Error al insertar tipo documento:", error.message);
        return null;
    }
    
    console.log("✅ Tipos de documento creados:", data);
    return data;
}
