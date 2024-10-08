"use client";

import { createAnimal } from "@/actions/animals";
import { getAllUsers } from "@/actions/users";
import { AnimalDetail } from "@/components/AnimalDetail/AnimalDetail";
import { AnimalDetailHeader } from "@/components/AnimalDetail/AnimalDetailHeader";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function CrearAnimalPage() {
  const router = useRouter();
  const [animal, setAnimal] = useState({
    name: "",
    specie: "",
    habitat: "",
    status: "",
    user_id: "",
  });
  const [users, setUsers] = useState([]);

  const handleCreateAnimal = async () => {
    enqueueSnackbar("Creando animal...", { variant: "info" });
    const { error } = await createAnimal(animal);

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    enqueueSnackbar("Animal creado con exito", {
      variant: "success",
    });

    router.push("/animales");
    router.refresh();
  };

  const handleLoadAllUsers = async () => {
    const { data, error } = await getAllUsers();

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    setUsers(data as []);
  };

  useEffect(() => {
    handleLoadAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-16 p-8">
      <AnimalDetailHeader onSubmit={handleCreateAnimal} />
      <AnimalDetail
        animal={animal}
        setAnimal={setAnimal}
        users={users}
        user={{ user_metadata: { role: "ADMIN" } }}
      />
    </div>
  );
}
