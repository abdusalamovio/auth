"use client";

import { Loading } from "@/shared/ui";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions";
import { toast } from "sonner";

export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = useCallback(async () => {
    if (!token) {
      toast.error("Ссылка для подтверждения недействительна");
      setIsLoading(false);
      return;
    }

    try {
      const result = await newVerification(token);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success);
      }
    } catch (error) {
      console.error("Ошибка при подтверждении:", error);
      toast.error("Произошла ошибка при подтверждении почты");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper heading="Подтверждение почты">
      <div className="flex justify-center">
        {isLoading ? <Loading /> : <p>Обработка завершена</p>}
      </div>
    </CardWrapper>
  );
}
