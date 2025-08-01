import { Button } from "@/components/ui";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
  return (
    <div className="mb-2 grid grid-cols-2 gap-6 space-y-4">
      <Button variant="outline">
        <FcGoogle className="mr-2 size-4" />
        Google
      </Button>
      <Button variant="outline">
        <FaGithub className="mr-2 size-4" />
        Github
      </Button>
    </div>
  );
};
