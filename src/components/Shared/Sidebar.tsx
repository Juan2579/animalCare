"use client";

import React from "react";
import Link from "next/link";
import { List, ListItemIcon, Box } from "@mui/material";
import { Home, People, Assessment, ExitToApp } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (currentPathname: string) => pathname === currentPathname;

  return (
    <Box className="flex flex-col h-screen min-w-72 bg-[#6200E8] text-white">
      <div className="flex items-center justify-center">
        <Image src="/images/fullLogo.png" alt="Logo" width={210} height={120} />
      </div>

      <List className="flex flex-col gap-3 p-4">
        <Link
          className={`flex items-center rounded-lg p-3 pl-4 ${
            isActive("/animales")
              ? "bg-purple-600"
              : "hover:bg-purple-600 hover:bg-opacity-50"
          }`}
          href="/animales"
        >
          <ListItemIcon>
            <Home className="text-white" />
          </ListItemIcon>
          <p className="font-bold">Lista de Animales</p>
        </Link>

        <Link
          className={`flex items-center rounded-lg p-3 pl-4 ${
            isActive("/usuarios")
              ? "bg-purple-600"
              : "hover:bg-purple-600 hover:bg-opacity-50"
          }`}
          href="/usuarios"
        >
          <ListItemIcon>
            <People className="text-white" />
          </ListItemIcon>
          <p className="font-bold">Lista de Usuarios</p>
        </Link>

        <Link
          className={`flex items-center rounded-lg p-3 pl-4 ${
            isActive("/reportes")
              ? "bg-purple-600"
              : "hover:bg-purple-600 hover:bg-opacity-50"
          }`}
          href="/reportes"
        >
          <ListItemIcon>
            <Assessment className="text-white" />
          </ListItemIcon>
          <p className="font-bold">Reportes</p>
        </Link>

        <Link
          className="flex items-center rounded-lg p-3 pl-4 hover:bg-purple-600 hover:bg-opacity-5"
          href="/logout"
        >
          <ListItemIcon>
            <ExitToApp className="text-white" />
          </ListItemIcon>
          <p className="font-bold">Cerrar sesión</p>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;
