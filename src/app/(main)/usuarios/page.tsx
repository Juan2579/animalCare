import { UsersHeader } from "@/components/Users/UsersHeader";
import UsersGrid from "@/components/Users/UsersGrid";

export default function UsuariosPage() {
  return (
    <div className="flex flex-col gap-16 p-8">
      <UsersHeader />
      <UsersGrid />
    </div>
  );
}
