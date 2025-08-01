import type { Metadata } from "next";
import { SettingsForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Настройки профиля",
};

export default function SettingsPage() {
  return <SettingsForm />;
}
