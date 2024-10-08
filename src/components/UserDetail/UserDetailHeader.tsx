"use client";

import { UserType } from "@/actions/users";
import { Button } from "@mui/material";
import Link from "next/link";

export const UserDetailHeader = ({
  user,
  onSubmit,
}: {
  user?: UserType;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  onSubmit: () => {};
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        {user?.id ? "Editar usuario" : "Crear usuario"}
      </h1>
      <div className="flex gap-4">
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          {user?.id ? "Editar" : "Crear"}
        </Button>
        <Link href="/usuarios">
          <Button variant="contained" color="error" size="large">
            Volver
          </Button>
        </Link>
      </div>
    </div>
  );
};
