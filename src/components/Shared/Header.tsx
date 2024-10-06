import { getUser } from "@/actions/users";
import { redirect } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Header = async () => {
  const { data: user, error } = await getUser();

  if (error) redirect("/sign-in");

  return (
    <div className="w-full flex justify-end h-20 shadow-lg p-4">
      <div className="flex items-center justify-center gap-2">
        <div>
          <p className="font-bold">
            {user?.user_metadata["full_name"] || user?.user_metadata["name"]}
          </p>
          <p className="text-sm text-right">{user?.user_metadata["role"]}</p>
        </div>
        <AccountCircleIcon color="primary" sx={{ fontSize: 52 }} />
      </div>
    </div>
  );
};
