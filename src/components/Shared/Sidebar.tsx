import Image from "next/image";
import { Box } from "@mui/material";
import { SidebarLinks } from "./SidebarLinks";
import { getUser } from "@/actions/users";
import { redirect } from "next/navigation";

const Sidebar = async () => {
  const { data: user, error } = await getUser();

  if (error) {
    redirect("/sign-in");
  }

  return (
    <Box className="flex flex-col h-screen min-w-72 bg-[#6200E8] text-white">
      <div className="flex items-center justify-center">
        <Image src="/images/fullLogo.png" alt="Logo" width={210} height={120} />
      </div>

      <SidebarLinks user={user?.user_metadata} />
    </Box>
  );
};

export default Sidebar;
