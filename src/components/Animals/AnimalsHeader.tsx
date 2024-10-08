import { SessionUser } from "@/actions/users";
import { Button } from "@mui/material";
import Link from "next/link";

export const AnimalsHeader = ({ user }: { user: SessionUser | null }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-3xl font-bold">Lista de Animales</h1>
      {user?.user_metadata?.role === "ADMIN" && (
        <Link href="/animales/crearAnimal">
          <Button variant="contained" color="primary" size="large">
            Crear Animal
          </Button>
        </Link>
      )}
    </div>
  );
};
