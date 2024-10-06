"use server";

import { createClient } from "@/utils/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createUser = async (user: any) => {
  const cookieStore = cookies();

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aXJybXJnbmh6cmRycXlnc2ZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzU3NzQ3MiwiZXhwIjoyMDQzMTUzNDcyfQ.YkgELmhsYIXLM3jO965jf35LNrfqn3v9mnmEW3AGHEk",
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      user_metadata: {
        full_name: user.full_name,
        username: user.username,
        phone: user.phone,
        role: "CUIDADOR",
      },
      email_confirm: true,
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

export const logoutUser = async () => {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return {
        error: error.message,
      };
    }

    return {
      error: null,
    };
  } catch {
    return {
      error: "Something went wrong",
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

export const getAllUsers = async () => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("profiles").select();

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
