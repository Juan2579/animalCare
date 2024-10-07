"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export const AnimalDetailHeader = ({ onSubmit }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-3xl font-bold">Crear Animal</h1>
      <div className="flex gap-4">
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          Crear
        </Button>
        <Link href="/animales">
          <Button variant="contained" color="error" size="large">
            Volver
          </Button>
        </Link>
      </div>
    </div>
  );
};
