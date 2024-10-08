"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { UserType } from "@/actions/users";

const UsersGrid = ({ users }: { users: UserType[] }) => {
  const router = useRouter();

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
          <Tooltip title="Editar usuario">
            <IconButton color="primary" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleEdit = (row: UserType) => {
    router.push(`/usuarios/${row.id}`);
  };

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
