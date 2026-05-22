import { createContext, useEffect, useContext, useState, ReactNode } from "react";
import { supabase, InsertarAdmin, MostrarUsuarios, InsertarEmpresa, MostrarEmpresaXidauth, InsertarTipoDocumento, InsertarRol, TipoDocData } from "../index";

// 1. Definimos la forma del contexto
interface AuthContextType {
  user: any;
}

// 2. Creamos el contexto
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Comprobar sesión actual inmediatamente al cargar la web
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    checkSession();

    // 2. Escuchar cambios (Login, Logout, Token refrescado)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          console.log("session del user", session.user.id);
          insertarDatos(session.user.id, session.user.email ?? "");
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

const insertarDatos = async (id_auth: string, correo: string) => {
  console.log("🔍 Iniciando insertarDatos para:", id_auth);
  
  const response = await MostrarUsuarios({ id_auth: id_auth });
  if (response) {
    console.log("✅ Usuario ya existe, no se crea nada");
    return;
  }

  // Verificar si la empresa ya existe
  console.log("🔍 Verificando si empresa ya existe...");
  const empresaExistente = await MostrarEmpresaXidauth({ id_auth: id_auth });
  if (empresaExistente) {
    console.log("✅ Empresa ya existe, no se crea nada");
    return;
  }

  // 1. Crear la empresa
  console.log("📝 1. Creando empresa...");
  const responseEmpresa = await InsertarEmpresa({
    id_auth: id_auth,
    nombre: "Mi Empresa",
    id_fiscal: "",
    direccion_fiscal: "",
    logo: "",
    simbolomoneda: "$"
  });
  console.log("💼 Empresa creada:", responseEmpresa);
  if (!responseEmpresa) {
    console.error("❌ Error: No se pudo crear empresa");
    return;
  }

  // 2. Insertar los tipos de documento para esta empresa
  console.log("📝 2. Creando tipos de documento...");
  const tiposDocs = TipoDocData.map((td) => ({
    nombre: td.descripcion,
    id_empresa: responseEmpresa?.id,
  }));
  const responseTipoDoc = await InsertarTipoDocumento(tiposDocs);
  console.log("📄 Tipos de documento creados:", responseTipoDoc);
  if (!responseTipoDoc || responseTipoDoc.length === 0) {
    console.error("❌ Error: No se pudieron crear tipos de documento");
    return;
  }

  // 3. Insertar el rol Administrador
  console.log("📝 3. Creando rol Administrador...");
  const responseRol = await InsertarRol({
    nombre: "Administrador",
    id_empresa: responseEmpresa?.id,
  });
  console.log("👤 Rol creado:", responseRol);
  if (!responseRol) {
    console.error("❌ Error: No se pudo crear rol");
    return;
  }

  // 4. Crear el usuario administrador
  console.log("📝 4. Creando usuario administrador...");
  const pUser = {
    nombres: "Administrador",
    id_tipodocumento: responseTipoDoc[0].id,
    id_roll: responseRol.id,
    correo: correo,
    fecharegistro: new Date().toISOString().split('T')[0],
    id_auth: id_auth
  };
  console.log("👨‍💼 Datos del usuario:", pUser);
  const responseUsuario = await InsertarAdmin(pUser);
  console.log("✅ Usuario administrador creado:", responseUsuario);
};

  return (
    <AuthContext.Provider value={{ user }}>
      {/* Solo renderizamos la app cuando Supabase haya terminado de verificar la sesión */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth debe usarse dentro de un AuthContextProvider");
  }
  return context;
};
