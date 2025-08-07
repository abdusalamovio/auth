"use client";

import { useForm } from "react-hook-form";
import { type NewPasswordSchemaType, NewPasswordSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { newPasswordAction } from "../action";
import { toast } from "sonner";
import { CardWrapper } from "@/features/auth/card-wrapper";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from "@/shared/ui";
import { useSearchParams } from "next/navigation";

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const [isPending, startTransittion] = useTransition();

  const onSubmit = async (values: NewPasswordSchemaType) => {
    startTransittion(async () => {
      const result = await newPasswordAction(values, token);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success);
      }
    });
  };

  return (
    <CardWrapper
      heading="Новый пароль"
      description="Придумайте новый пароль для вашего аккаунта"
      backButtonLabel="Уже есть аккаунт? Войти"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit">
            Продолжить
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
