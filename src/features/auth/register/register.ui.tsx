"use client";

import { useForm } from "react-hook-form";
import { RegisterSchema } from "./register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { registerAction } from "./register.action";
import { toast } from "sonner";
import { CardWrapper } from "@/features/auth/wrapper";
import { RegisterSchemaType } from "./register.types";

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

export function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: RegisterSchemaType) => {
    startTransition(async () => {
      const result = await registerAction(values);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success);
      }
    });
  };

  return (
    <CardWrapper
      heading="Создать аккаунт"
      description="Для регистрации достаточно ввести своё имя, email и придумать пароль"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Tony Stark"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="tony@starkindustries.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
