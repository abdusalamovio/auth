"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { ResetPasswordSchema } from "@/shared/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { resetPassword } from "@/actions";

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
import { useTransition } from "react";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isPending, startTransittion] = useTransition();

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    startTransittion(async () => {
      const result = await resetPassword(values);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success);
      }
    });
  };

  return (
    <CardWrapper
      heading="Сброс пароля"
      description="Для сброса пароля введите свою почту"
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

          <Button disabled={isPending} type="submit">
            Продолжить
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
