import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

export async function SettingsForm() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center gap-3">
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">
          <ArrowLeft />
          Выйти
        </Button>
      </form>
    </div>
  );
}
