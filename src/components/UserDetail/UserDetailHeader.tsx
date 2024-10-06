"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export const UserDetailHeader = ({ onSubmit }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-3xl font-bold">Crear Usuario</h1>
      <div className="flex gap-4">
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          Crear
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
