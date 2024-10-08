import { getUserById } from "@/actions/users";
import { EditUserContainer } from "@/components/UserDetail/EditUserContainer";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default async function UsuarioPage({ params }) {
  const { data: user, error: userError } = await getUserById(params.userId);

  if (!user) {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col gap-4 p-8">
        <Image
          src="/images/notFound.svg"
          alt="Not found"
          width={500}
          height={500}
        />
        <p>No se encontro el usuario que buscabas...</p>
        <Link href="/usuarios">
          <Button variant="contained" color="primary" size="large">
            Volver a página de usuarios
          </Button>
        </Link>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col gap-4 p-8">
        <Image
          src="/images/notFound.svg"
          alt="Not found"
          width={500}
          height={500}
        />
        <p>Hubo un error al encontrar este usuario</p>
        <Link href="/usuarios">
          <Button variant="contained" color="primary" size="large">
            Volver a página de usuarios
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 p-8">
      <EditUserContainer user={user} />
    </div>
  );
}
