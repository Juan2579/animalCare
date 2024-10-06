import { Button } from "@mui/material";
import Link from "next/link";

export const UsersHeader = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-3xl font-bold">Lista de Usuarios</h1>
      <Link href="/usuarios/crearUsuario">
        <Button variant="contained" color="primary" size="large">
          Crear Usuario
        </Button>
      </Link>
    </div>
  );
};
