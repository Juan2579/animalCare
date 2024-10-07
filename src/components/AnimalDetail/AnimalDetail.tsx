"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
const validationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre del animal es obligatorio")
    .min(3, "El nombre del animal debe tener al menos 3 caracteres"),
  specie: Yup.string()
    .required("La especie es obligatoria")
    .min(3, "La especie debe tener al menos 3 caracteres"),
  habitat: Yup.string()
    .required("El habitat es obligatorio")
    .min(3, "El habitat debe tener al menos 3 caracteres"),
  status: Yup.string().required("El estado de salud es obligatorio"),
  user_id: Yup.string().required("El cuidador asignado es obligatorio"),
});

export const AnimalDetail = ({ animal, setAnimal, users }) => {
  const formik = useFormik({
    initialValues: animal || {
      name: "",
      specie: "",
      habitat: "",
      status: "",
      user_id: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      setAnimal({ ...values });
    },
  });

  useEffect(() => {
    setAnimal({ ...formik.values });
  }, [formik.values]);

  return (
    <form className="gap-4 grid grid-cols-15">
      <TextField
        label="Nombre Animal"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={!!formik.errors["name"]}
        helperText={formik.errors.name}
        className="mb-4 col-span-3"
      />

      <TextField
        label="Especie"
        name="specie"
        value={formik.values.specie}
        onChange={formik.handleChange}
        error={!!formik.errors["specie"]}
        helperText={formik.errors.specie}
        className="mb-4 col-span-3"
      />

      <TextField
        label="Habitat"
        name="habitat"
        value={formik.values.habitat}
        onChange={formik.handleChange}
        error={!!formik.errors["habitat"]}
        helperText={formik.errors.habitat}
        className="mb-4 col-span-3"
      />

      <TextField
        select
        slotProps={{ select: { native: true } }}
        label="Estado de Salud"
        name="status"
        value={formik.values.status}
        onChange={formik.handleChange}
        error={!!formik.errors["status"]}
        helperText={formik.errors.status}
        className="mb-4 col-span-3"
      >
        <option value=""></option>
        <option value="Sano">Buen estado</option>
        <option value="Enfermo">Mal estado</option>
      </TextField>

      <Autocomplete
        loading={users.length === 0}
        loadingText="Cargando cuidadores..."
        options={users}
        getOptionLabel={(option) => option?.full_name}
        value={users.find((user) => user.id === formik.values.user_id) || null}
        onChange={(event, newValue) => {
          if (!newValue) {
            formik.setFieldValue("user_id", "");
            return;
          }
          formik.setFieldValue("user_id", newValue.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cuidador"
            error={!!formik.errors["user_id"]}
            helperText={formik.errors.user_id}
            className="mb-4 col-span-3"
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText="No hay cuidadores disponibles"
        className="w-full mb-4 col-span-3"
      />
    </form>
  );
};
