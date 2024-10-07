"use server";

import { createClient } from "@/utils/supabase/server";

export const createAnimal = async (animal: any) => {
  try {
    const supabase = createClient();

    const { error } = await supabase.from("animals").insert(animal);

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

export const getAllAnimals = async () => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("animals").select(`
      id,
      name,
      specie,
      habitat,
      status,
      user: profiles (*)
    `);

    if (error) {
      console.log(error);
      return {
        error: error.message,
      };
    }

    return {
      data,
      error: null,
    };
  } catch {
    return {
      error: "Something went wrong",
    };
  }
};

export const getAnimalById = async (id: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("animals")
      .select(
        `
        id,
        name,
        specie,
        habitat,
        status,
        user_id
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      return {
        error: error.message,
        data: null,
      };
    }

    return {
      data,
      error: null,
    };
  } catch {
    return {
      error: "Something went wrong",
    };
  }
};

export const updateAnimal = async (animal: any) => {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("animals")
      .update(animal)
      .eq("id", animal.id);

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
