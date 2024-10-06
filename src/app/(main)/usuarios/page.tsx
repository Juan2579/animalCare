import { UsersHeader } from "@/components/Users/UsersHeader";
import UsersGrid from "@/components/Users/UsersGrid";
import { getAllUsers } from "@/actions/users";

export default async function UsuariosPage() {
  const { data, error } = await getAllUsers();

  if (error) {
    console.log(error);
    return;
  }

  return (
    <div className="flex flex-col gap-16 p-8">
      <UsersHeader />
      <UsersGrid users={data} />
    </div>
  );
}
