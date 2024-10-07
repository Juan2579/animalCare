import { AnimalsHeader } from "@/components/Animals/AnimalsHeader";
import { getAllAnimals } from "@/actions/animals";
import AnimalsGrid from "@/components/Animals/AnimalsGrid";

export default async function AnimalesPage() {
  const { data, error } = await getAllAnimals();

  if (error) {
    console.log(error);
    return;
  }

  return (
    <div className="flex flex-col gap-16 p-8">
      <AnimalsHeader />
      <AnimalsGrid animals={data} />
    </div>
  );
}
