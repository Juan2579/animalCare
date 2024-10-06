"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  { field: "full_name", headerName: "Nombre", flex: 1 },
  { field: "username", headerName: "Usuario", flex: 1 },
  { field: "phone", headerName: "Teléfono", flex: 1 },
  { field: "email", headerName: "Correo Electrónico", flex: 1 },
  { field: "role", headerName: "Rol", flex: 1 },
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

const handleEdit = (row: any) => {
  // Lógica para editar
  console.log("Editar:", row);
};

const handleDelete = (row: any) => {
  // Lógica para eliminar
  console.log("Eliminar:", row);
};

const UsersGrid = ({ users }) => {
  return (
    <div className="h-[400px] w-full">
      <DataGrid
        rows={users}
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
