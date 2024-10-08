"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { deleteAnimalById } from "@/actions/animals";

const AnimalsGrid = ({ animals, user }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);

  const handleDelete = (animal) => {
    setOpen(true);
    setAnimalToDelete(animal);
  };

  const handleClose = () => {
    setOpen(false);
    setAnimalToDelete(null);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre Animal", flex: 1 },
    { field: "specie", headerName: "Especie", flex: 1 },
    { field: "habitat", headerName: "Habitat", flex: 1 },
    {
      field: "full_name",
      headerName: "Nombre Cuidador",
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
          {user.user_metadata.role === "ADMIN" && (
            <Tooltip title="Eliminar Animal">
              <IconButton
                color="error"
                onClick={() => handleDelete(params.row)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const handleDeleteAnimal = async () => {
    try {
      // Lógica para borrar el animal de la base de datos
      const { error } = await deleteAnimalById(animalToDelete.id); // Asume que tienes esta función implementada

      if (error) {
        enqueueSnackbar(error, { variant: "error" });
      }

      // Mostrar la notificación de éxito
      enqueueSnackbar("Animal eliminado correctamente", { variant: "success" });
      router.refresh();
    } catch {
      enqueueSnackbar("Failed to delete animal", { variant: "error" });
    } finally {
      setOpen(false); // Cerrar el diálogo
    }
  };

  const handleEdit = (row: any) => {
    router.push(`/animales/${row.id}`);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="font-bold" id="alert-dialog-title">
          Eliminar Animal
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estas seguro de que quieres eliminar este animal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteAnimal}
            variant="contained"
            color="primary"
            autoFocus
          >
            Confirmar
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AnimalsGrid;
