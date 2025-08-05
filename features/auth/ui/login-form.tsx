"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { LoginSchema } from "@/shared/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { login } from "@/actions";
import { toast } from "sonner";
import { CardWrapper } from "./card-wrapper";

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
import Link from "next/link";

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransittion] = useTransition();

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransittion(async () => {
      const result = await login(values);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success);
      }
    });
  };

  return (
    <CardWrapper
      heading="Войти в аккаунт"
      description="Для входа на сайт используйте ваш email и пароль, которые были указаны при регистрации на сайте"
      backButtonLabel="Ещё нет аккаунта? Регистрация"
      backButtonHref="/register"
      isShowSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
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
                <div className="flex items-center justify-between">
                  <FormLabel>Пароль</FormLabel>
                  <Link
                    href="/reset-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Забыли пароль?
                  </Link>
                </div>
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
