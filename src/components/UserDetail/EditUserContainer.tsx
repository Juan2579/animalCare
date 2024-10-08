"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { UserDetailHeader } from "./UserDetailHeader";
import { updateUser, UserType } from "@/actions/users";
import { UserDetail } from "./UserDetail";

export const EditUserContainer = ({ user }: { user: UserType }) => {
  const router = useRouter();
  const [userState, setUserState] = useState(user);

  const handleUpdateUser = async () => {
    enqueueSnackbar("Actualizando usuario...", { variant: "info" });
    const { error } = await updateUser(userState);

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    enqueueSnackbar("Usuario actualizado con éxito", {
      variant: "success",
    });

    router.push("/usuarios");
    router.refresh();
  };

  return (
    <>
      <UserDetailHeader user={userState} onSubmit={handleUpdateUser} />
      <UserDetail user={userState} setUser={setUserState} />
    </>
  );
};
