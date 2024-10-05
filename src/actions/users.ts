"use server";

import { createClient } from "@/utils/supabase/server";

export const createUser = async (user: any) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          role: "ADMIN",
          name: "Juan David",
        },
      },
    });

    if (error) {
      console.log(error);
      return {
        error: error.message,
        data: null,
      };
    }

    return {
      error: null,
      data,
    };
  } catch {
    return {
      error: "Something went wrong",
      data: null,
    };
  }
};

export const loginUser = async (user: any) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      const isCredentialsError = error?.code === "invalid_credentials";
      return {
        error: isCredentialsError
          ? "Datos de ingreso invalidos, por favor verificalos"
          : error.message,
        data: null,
      };
    }

    return {
      error: null,
      data,
    };
  } catch {
    return {
      error: "Something went wrong",
      data: null,
    };
  }
};

export const getUser = async () => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.log(error);
      return {
        error: error.message,
        data: null,
      };
    }

    return {
      error: null,
      data: data.user,
    };
  } catch {
    return {
      error: "Something went wrong",
      data: null,
    };
  }
};
