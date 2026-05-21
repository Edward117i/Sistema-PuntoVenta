import Swal from "sweetalert2";
import { supabase } from "../index";

export async function MostrarEmpresaXidauth(p: any) {
    const {data} = await supabase
    .from("empresa")
    .select()
    .eq("id_auth", p.id_auth)
    .maybeSingle();
    return data;
}

export async function InsertarEmpresa(p: any = {}, _f?: File | null){
    console.log("📌 Insertando empresa con datos:", p);
    
    try {
        const {error, data} = await supabase
            .from("empresa")
            .insert(p)
            .select()
            .maybeSingle();
        
        if (error) {
            console.error("❌ Error al insertar empresa:", error.message);
            return;
        }
        
        console.log("✅ Empresa creada:", data);
        return data;
    } catch (err) {
        console.error("❌ Exception al insertar empresa:", err);
        return;
    }
}