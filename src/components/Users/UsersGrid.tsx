"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  { field: "nombre", headerName: "Nombre", flex: 1 },
  { field: "usuario", headerName: "Usuario", flex: 1 },
  { field: "telefono", headerName: "Teléfono", flex: 1 },
  { field: "correo", headerName: "Correo Electrónico", flex: 1 },
  { field: "rol", headerName: "Rol", flex: 1 },
  {
    field: "actions",
    type: "actions",
    width: 120,
    renderCell: (params) => (
      <div className="flex space-x-2">
        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(params.row)}>
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    nombre: "Juan Pérez",
    usuario: "jperez",
    telefono: "555-1234",
    correo: "jperez@mail.com",
    rol: "Cuidador",
  },
  {
    id: 2,
    nombre: "María García",
    usuario: "mgarcia",
    telefono: "555-5678",
    correo: "mgarcia@mail.com",
    rol: "Cuidador",
  },
  {
    id: 3,
    nombre: "Laura Martínez",
    usuario: "lmartinez",
    telefono: "555-9012",
    correo: "lmartinez@mail.com",
    rol: "Cuidador",
  },
  {
    id: 4,
    nombre: "Jorge Hernández",
    usuario: "jhernandez",
    telefono: "555-3456",
    correo: "jhernandez@mail.com",
    rol: "Cuidador",
  },
  {
    id: 5,
    nombre: "Ana Fernández",
    usuario: "afernandez",
    telefono: "555-7890",
    correo: "afernandez@mail.com",
    rol: "Cuidador",
  },
];

const handleEdit = (row: any) => {
  // Lógica para editar
  console.log("Editar:", row);
};

const handleDelete = (row: any) => {
  // Lógica para eliminar
  console.log("Eliminar:", row);
};

const UsersGrid = () => {
  return (
    <div className="h-[400px] w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSorting
        disableColumnSelector
        disableColumnResize
        hideFooter
        hideFooterPagination
        hideFooterSelectedRowCount
        disableColumnFilter
        sx={{
          border: "none", // Quita el borde externo
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none", // Quita el borde inferior del encabezado
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none", // Quita el borde inferior de las celdas
          },
        }}
      />
    </div>
  );
};

export default UsersGrid;
