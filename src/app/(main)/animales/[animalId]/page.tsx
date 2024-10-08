import { getAnimalById } from "@/actions/animals";
import { getAllUsers, getUser } from "@/actions/users";
import { EditAnimalContainer } from "@/components/AnimalDetail/EditAnimalContainer";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AnimalPage({ params }) {
  const { data: user, error: userError } = await getUser();

  if (userError) {
    redirect("/sign-in");
  }

  const { data: animal, error: animalError } = await getAnimalById(
    params.animalId
  );

  const { data: users, error: usersError } = await getAllUsers();

  if (usersError) {
    redirect("/sign-in");
  }

  if (!animal) {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col gap-4 p-8">
        <Image
          src="/images/notFound.svg"
          alt="Not found"
          width={500}
          height={500}
        />
        <p>No se encontro el animal que buscabas...</p>
        <Link href="/animales">
          <Button variant="contained" color="primary" size="large">
            Volver a página de animales
          </Button>
        </Link>
      </div>
    );
  }

  if (animalError) {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col gap-4 p-8">
        <Image
          src="/images/notFound.svg"
          alt="Not found"
          width={500}
          height={500}
        />
        <p>Hubo un error al encontrar este animal</p>
        <Link href="/animales">
          <Button variant="contained" color="primary" size="large">
            Volver a página de animales
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 p-8">
      <EditAnimalContainer animal={animal} users={users} user={user} />
    </div>
  );
}
