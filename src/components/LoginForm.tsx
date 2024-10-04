"use client";

import { createUser, loginUser } from "@/actions/users";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async () => {
    enqueueSnackbar("Iniciando sesion...", { variant: "info" });
    const { data, error } = await loginUser({ email, password });

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    enqueueSnackbar("Sesion Iniciada", { variant: "success" });

    router.push("/animales");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center flex-col gap-4">
        <Image src="/images/logo.png" alt="logo" width={60} height={70} />
        <h1 className="font-bold">Bienvenido a AnimalCare</h1>
      </div>
      <div className="flex flex-col gap-4">
        <TextField
          label="Correo electronico"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        onClick={handleCreateUser}
        variant="contained"
        color="primary"
        size="large"
      >
        Iniciar sesión
      </Button>
    </div>
  );
};
