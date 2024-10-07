"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const AnimalsGrid = ({ animals }) => {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre Animal", flex: 1 },
    { field: "specie", headerName: "Especie", flex: 1 },
    { field: "habitat", headerName: "Habitat", flex: 1 },
    {
      field: "full_name",
      headerName: "Nombre Cuidado",
      flex: 1,
      renderCell: (params) => params.row.user.full_name,
    },
    { field: "status", headerName: "Estado de Salud", flex: 1 },
    {
      field: "actions",
      type: "actions",
      width: 120,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <Tooltip title="Editar Animal">
            <IconButton color="primary" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar Animal">
            <IconButton color="error" onClick={() => handleDelete(params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleEdit = (row: any) => {
    router.push(`/animales/${row.id}`);
  };

  const handleDelete = (row: any) => {
    // Lógica para eliminar
    console.log("Eliminar:", row);
  };

  return (
    <div className="h-[400px] w-full">
      <DataGrid
        rows={animals}
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
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
        }}
      />
    </div>
  );
};

export default AnimalsGrid;
