"use client";

import { UserType } from "@/actions/users";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
const validationSchema = Yup.object({
  full_name: Yup.string()
    .required("El nombre completo es obligatorio")
    .min(3, "El nombre completo debe tener al menos 3 caracteres"),
  username: Yup.string()
    .required("El nombre de usuario es obligatorio")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  phone: Yup.string().required("El número de teléfono es obligatorio"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const UserDetail = ({
  user,
  setUser,
}: {
  user: UserType;
  setUser: (user: UserType) => void;
}) => {
  const formik = useFormik({
    initialValues: user || {
      full_name: "",
      username: "",
      email: "",
      phone: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      setUser({ ...values });
    },
  });

  // Actualiza el estado del usuario en el componente padre en tiempo real
  useEffect(() => {
    setUser({ ...formik.values });
  }, [formik.values]);

  return (
    <form className="flex gap-4">
      <TextField
        label="Nombre Completo"
        name="full_name"
        value={formik.values.full_name}
        onChange={formik.handleChange}
        error={!!formik.errors["full_name"]}
        helperText={formik.errors.full_name}
        className="mb-4"
      />

      <TextField
        label="Usuario"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={!!formik.errors["username"]}
        helperText={formik.errors.username}
        className="mb-4"
      />

      <TextField
        label="Correo Electronico"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={!!formik.errors["email"]}
        helperText={formik.errors.email}
        className="mb-4"
      />

      <TextField
        label="Telefono"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={!!formik.errors["phone"]}
        helperText={formik.errors.phone}
        className="mb-4"
      />

      {!user.id && (
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={!!formik.errors["password"]}
          helperText={formik.errors.password}
          className="mb-4"
        />
      )}
    </form>
  );
};
