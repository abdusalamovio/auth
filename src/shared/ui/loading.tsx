import { LuLoader } from "react-icons/lu";

export function Loading() {
  return (
    <div className="juctify-center flex items-center text-base">
      <LuLoader className="mr-2 size-5 animate-spin" />
      Загрузка...
    </div>
  );
}
