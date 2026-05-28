import { supabase } from "../index";
import Swal from "sweetalert2";


const tabla = "categorias";


export async function InsertarCategorias(p: any, file: File) {

     const {error,data} = await supabase.rpc("insertar_categoria",p)
        if(error){
            Swal.fire({
                icon: "error",
                title: "Error al insertar la categoria",
                text: error.message
            });
            return;
        }
        const img = file.size;
        if (img!=undefined){
            const nuevo_id = data;
        const urlImagen = await subirImagen(nuevo_id, file);
        if (urlImagen) {
            const piconoeditar = {
                icono: urlImagen,
                id: nuevo_id
            }
            await EditarIconoCategorias(piconoeditar)
        }
    }
}



async function subirImagen(idcategoria: any, file: File) {

    const ruta = "categorias/" + idcategoria
    const {data,error} = await supabase.storage
    .from("imagenes")
    .upload(ruta, file, {
        cacheControl: "0",
        upsert: true,
    });
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return
    }
    if (data) {
        const { data: urlData } = supabase.storage
            .from("imagenes")
            .getPublicUrl(ruta);
        return urlData.publicUrl;
    }
}


export async function EditarIconoCategorias(p: any) {

    const {error} = await supabase.from("categorias").update
    (p).eq("id",p.id);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
    Swal.fire({
        icon: "success",
        title: "Categoria editada correctamente",
        showConfirmButton: false,
        timer: 1500
    });
    return;
}

export async function MostrarCategorias(p: any) {

    const {data} = await supabase
    .from(tabla)
    .select()
    .eq("id_empresa",p.id_empresa)
    .eq("activo",1)
    .order("id", {ascending: false});
    return data;
}

export async function BuscarCategorias (p: any){
    const {data} = await supabase.from(tabla).select().eq("id_empresa", p.id_empresa).ilike("nombre", `%${p.buscar}%`)
    return data
}

export async function EliminarCategorias(p: any){
    const {error} = await supabase.from(tabla).delete().eq("id",p.id);
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
    if(p.icono !="-"){
        const ruta = "categorias/" + p.id;
        await supabase.storage.from("imagenes").remove([ruta]);
    }
}

export async function EditarCategoria(p: any, fileold: any, filenew: any){
    const {error} = await supabase.rpc("editar_categoria",p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops",
            text: error.message
        });
        return
    }
    if(filenew!="-" && filenew.size!=undefined){
        if(fileold!="-"){
            await EditarIconoStorage(p._id, filenew)
        }
        else{
            const dataImagen = await subirImagen(p._id,filenew)
            const piconoeditar = {
                icono: dataImagen,
                id: p._id
            }
            await EditarIconoCategorias(piconoeditar);
            
        }
    }
}

export async function EditarIconoStorage(id: any, file: File){
    const ruta = "categorias/" + id;
    await supabase.storage.from("imagenes").update(ruta,file,{
        cacheControl: "0",
        upsert: true
    })
}

