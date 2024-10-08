"use client";

import { animalType } from "@/actions/animals";
import { Button } from "@mui/material";
import Link from "next/link";

export const AnimalDetailHeader = ({
  animal,
  onSubmit,
}: {
  animal?: animalType;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  onSubmit: () => {};
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        {animal?.id ? "Editar Animal" : "Crear animal"}
      </h1>
      <div className="flex gap-4">
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          {animal?.id ? "Editar" : "Crear"}
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
