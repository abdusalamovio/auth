"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: "/settings",
    });
  };

  return (
    <div className="mb-2 grid grid-cols-2 gap-6 space-y-4">
      <Button onClick={() => onClick("google")} variant="outline">
        <FcGoogle className="mr-2 size-4" />
        Google
      </Button>
      <Button onClick={() => onClick("github")} variant="outline">
        <FaGithub className="mr-2 size-4" />
        Github
      </Button>
    </div>
  );
};
