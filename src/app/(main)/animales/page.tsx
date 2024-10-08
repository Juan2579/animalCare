import { AnimalsHeader } from "@/components/Animals/AnimalsHeader";
import { getAllAnimals } from "@/actions/animals";
import AnimalsGrid from "@/components/Animals/AnimalsGrid";
import { getUser } from "@/actions/users";
import { redirect } from "next/navigation";

export default async function AnimalesPage() {
  const { data: user, error: userError } = await getUser();

  if (userError && !user) {
    redirect("/sign-in");
  }

  const { data: animals, error: animalsError } = await getAllAnimals({
    id: user?.id,
  });

  if (animalsError && !animals) {
    return;
  }

  return (
    <div className="flex flex-col gap-16 p-8">
      <AnimalsHeader user={user} />
      <AnimalsGrid animals={animals} user={user} />
    </div>
  );
}
