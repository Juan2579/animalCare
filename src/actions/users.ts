"use server";

import { createClient } from "@/utils/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export interface UserType {
  id?: string;
  full_name: string;
  username: string;
  phone: string;
  email: string;
  password?: string;
  role?: string;
  user_metadata?: {
    full_name: string;
    username: string;
    phone: string;
    role: string;
  };
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface SessionUser {
  id?: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    username?: string;
    phone?: string;
    role?: string;
  };
}

export const createUser = async (user: UserType) => {
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

export const loginUser = async (user: LoginUser) => {
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

export const getUserById = async (id: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", id);

    if (error) {
      return {
        error: error.message,
        data: null,
      };
    }

    return {
      error: null,
      data: data[0],
    };
  } catch {
    return {
      error: "Something went wrong",
      data: null,
    };
  }
};

export const updateUser = async (user: UserType) => {
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

    const { data, error } = await supabase.auth.admin.updateUserById(user.id!, {
      user_metadata: {
        full_name: user.full_name,
        username: user.username,
        phone: user.phone,
        role: user.role,
        email: user.email,
      },
      email: user.email,
      email_confirm: true,
    });

    const { data: data2, error: error2 } = await supabase
      .from("profiles")
      .update({
        full_name: user.full_name,
        username: user.username,
        phone: user.phone,
        role: user.role,
        email: user.email,
      })
      .eq("id", user.id);

    if (error || error2) {
      return {
        error: error?.code || error2?.message,
        data: null,
      };
    }

    return {
      error: null,
      data,
      data2,
    };
  } catch {
    return {
      error: "Something went wrong",
      data: null,
    };
  }
};
