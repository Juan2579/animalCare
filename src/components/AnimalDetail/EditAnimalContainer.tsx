"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimalDetailHeader } from "./AnimalDetailHeader";
import { AnimalDetail } from "./AnimalDetail";
import { enqueueSnackbar } from "notistack";
import { animalType, updateAnimal } from "@/actions/animals";
import { SessionUser, UserType } from "@/actions/users";

export const EditAnimalContainer = ({
  animal,
  users,
  user,
}: {
  animal: animalType;
  users: UserType[] | null;
  user: SessionUser | null;
}) => {
  const router = useRouter();
  const [animalState, setAnimalState] = useState<animalType>(animal);

  const handleUpdateAnimal = async () => {
    enqueueSnackbar("Actualizando animal...", { variant: "info" });
    const { error } = await updateAnimal(animalState);

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    enqueueSnackbar("Animal actualizado con éxito", {
      variant: "success",
    });

    router.push("/animales");
    router.refresh();
  };

  return (
    <>
      <AnimalDetailHeader animal={animalState} onSubmit={handleUpdateAnimal} />
      <AnimalDetail
        animal={animalState}
        setAnimal={setAnimalState}
        users={users}
        user={user}
      />
    </>
  );
};
