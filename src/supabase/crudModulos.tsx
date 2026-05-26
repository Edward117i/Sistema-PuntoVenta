import { supabase } from "../index"

export async function MostrarModulos() {
    const {data} = await supabase
    .from("modulos")
    .select();
    return data;
}

export async function InsertarModulo(p: any) {
    console.log("📌 Insertando modulos:", p);
    
    const { error, data } = await supabase
        .from("modulos")
        .insert(p)
        .select()
        .maybeSingle();
    if (error) {
        console.error("❌ Error al insertar modulos:", error.message);
        return null;
    }
    
    console.log("✅ Modulo creado:", data);
    return data;
}
