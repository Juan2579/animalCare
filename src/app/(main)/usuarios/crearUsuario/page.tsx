"use client";

import { createUser } from "@/actions/users";
import { UserDetail } from "@/components/UserDetail/UserDetail";
import { UserDetailHeader } from "@/components/UserDetail/UserDetailHeader";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export default function CrearUsuarioPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const handleCreateUser = async () => {
    enqueueSnackbar("Creando usuario...", { variant: "info" });
    const { data, error } = await createUser(user);

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    enqueueSnackbar("Usuario creado con exito", {
      variant: "success",
    });

    router.push("/usuarios");
  };

  console.log(user);

  return (
    <div className="flex flex-col gap-16 p-8">
      <UserDetailHeader onSubmit={handleCreateUser} />
      <UserDetail user={user} setUser={setUser} />
    </div>
  );
}
