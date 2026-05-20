import { supabase } from "../index"
const tabla = "usuarios"

export async function MostrarUsuarios(p: any) {
    const {data} = await supabase
    .from(tabla)
    .select().eq("id_auth", p.id_auth)
    .maybeSingle();
    return data;
}

export async function InsertarAdmin(p: any ){
    await supabase.from(tabla).insert(p)
}