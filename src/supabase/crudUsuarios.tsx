import Swal from "sweetalert2";
import { supabase } from "../index"

export async function MostrarUsuarios(p: any) {
    const {data} = await supabase
    .from("usuarios")
    .select()
    .eq("id_auth", p.id_auth)
    .maybeSingle();
    return data;
}

export async function InsertarAdmin(p: any ){
    console.log("📌 Insertando usuario admin:", p);
    
    try {
        const { error, data, status } = await supabase.from("usuarios").insert([p]).select();
        
        console.log("🔍 Respuesta de Supabase - Status:", status, "Error:", error, "Data:", data);
        
        if(error){
            console.error("❌ Error al insertar usuario admin:", error.message, error.code, error.details);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message
            });
            return null;
        }
        
        if(!data || data.length === 0) {
            console.warn("⚠️ Inserción aparente pero sin datos retornados");
        }
        
        console.log("✅ Usuario admin creado:", data);
        return data?.[0] || null;
    } catch (err) {
        console.error("❌ Exception al insertar usuario admin:", err);
        return null;
    }
}