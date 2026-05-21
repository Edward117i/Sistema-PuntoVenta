import { supabase } from "../index"

export async function MostrarRolesXnombre(p:any) {
    const {data} = await supabase
    .from("roles")
    .select()
    .eq("nombre", p.nombre).maybeSingle();
    return data;
}

export async function InsertarRol(p: any) {
    console.log("📌 Insertando rol:", p);
    
    const { error, data } = await supabase
        .from("roles")
        .insert(p)
        .select()
        .maybeSingle();
    if (error) {
        console.error("❌ Error al insertar rol:", error.message);
        return null;
    }
    
    console.log("✅ Rol creado:", data);
    return data;
}
