"use client";

import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";

export default function SnackbarContext({ children }: { children: ReactNode }) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      maxSnack={1}
    >
      {children}
    </SnackbarProvider>
  );
}
