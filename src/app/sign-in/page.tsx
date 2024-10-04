import { LoginForm } from "@/components/LoginForm";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-1/2 h-full flex justify-center items-center">
        <LoginForm />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <Image
          width={600}
          height={800}
          className="w-full h-full object-cover"
          src="/images/bg-login.png"
          alt="BG login"
        />
      </div>
    </div>
  );
}
