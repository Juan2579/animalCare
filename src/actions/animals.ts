"use server";

import { createClient } from "@/utils/supabase/server";
import { SessionUser } from "./users";

export interface animalType {
  id?: string;
  name: string;
  specie: string;
  habitat: string;
  status: string;
  user_id?: string;
}

export const createAnimal = async (animal: animalType) => {
  try {
    const supabase = createClient();

    const { error } = await supabase.from("animals").insert(animal);

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

export const getAllAnimals = async (user: SessionUser) => {
  try {
    const supabase = createClient();

    const { user_metadata, id } = user;

    let query = supabase.from("animals").select(`
        id,
        name,
        specie,
        habitat,
        status,
        user: profiles (*)
      `);

    if (user_metadata?.role === "CUIDADOR") {
      query = query.eq("user_id", id);
    }

    const { data, error } = await query;

    if (error) {
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

export const updateAnimal = async (animal: animalType) => {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("animals")
      .update(animal)
      .eq("id", animal.id);

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

export const deleteAnimalById = async (id: string) => {
  try {
    const supabase = createClient();

    const { error } = await supabase.from("animals").delete().eq("id", id);

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
