"use client";

import Link from "next/link";
import { List, ListItemIcon } from "@mui/material";
import { Home, People, Assessment, ExitToApp } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";

export const SidebarLinks = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    enqueueSnackbar("Cerrando sesión...", { variant: "info" });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        enqueueSnackbar("Error al cerrar sesión", { variant: "error" });
        return;
      }
      enqueueSnackbar("Sesión cerrada exitosamente", { variant: "success" });

      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch {
      enqueueSnackbar("Error al cerrar sesión", { variant: "error" });
    }
  };

  const isActive = (currentPathname: string) =>
    pathname.includes(currentPathname);

  return (
    <List className="flex flex-col gap-3 p-4">
      <Link
        className={`flex items-center rounded-lg p-3 pl-4 ${
          isActive("/animales")
            ? "bg-purple-600"
            : "hover:bg-purple-600 hover:bg-opacity-50"
        }`}
        href="/animales"
      >
        <ListItemIcon>
          <Home className="text-white" />
        </ListItemIcon>
        <p className="font-bold">Lista de Animales</p>
      </Link>

      {user.role === "ADMIN" && (
        <Link
          className={`flex items-center rounded-lg p-3 pl-4 ${
            isActive("/usuarios")
              ? "bg-purple-600"
              : "hover:bg-purple-600 hover:bg-opacity-50"
          }`}
          href="/usuarios"
        >
          <ListItemIcon>
            <People className="text-white" />
          </ListItemIcon>
          <p className="font-bold">Lista de Usuarios</p>
        </Link>
      )}

      <Link
        className={`flex items-center rounded-lg p-3 pl-4 ${
          isActive("/reportes")
            ? "bg-purple-600"
            : "hover:bg-purple-600 hover:bg-opacity-50"
        }`}
        href="/reportes"
      >
        <ListItemIcon>
          <Assessment className="text-white" />
        </ListItemIcon>
        <p className="font-bold">Reportes</p>
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center rounded-lg p-3 pl-4 hover:bg-purple-600 hover:bg-opacity-5"
      >
        <ListItemIcon>
          <ExitToApp className="text-white" />
        </ListItemIcon>
        <p className="font-bold">Cerrar sesión</p>
      </button>
    </List>
  );
};
