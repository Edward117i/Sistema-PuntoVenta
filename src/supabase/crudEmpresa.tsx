import Swal from "sweetalert2";
import { supabase } from "../index";

const tabla = "empresa";


export async function InsertarEmpresa(p: any = {}, _f?: File | null){

    const {error,data} = await supabase.from
    (tabla).insert(p).select().maybeSingle();
    if (error){
        // Swal.fire({
        //     icon: "error",
        //     title: "Error al insertar la empresa",
        //     text: error.message
        // });
        return;
     }
    
    return data;
}