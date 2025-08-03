import Link from "next/link";
import type { PropsWithChildren } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@/shared/ui";

import { Social } from "./social";

type CardWrapperProps = {
  heading: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  isShowSocial?: boolean;
};

export const CardWrapper = ({
  children,
  heading,
  description,
  backButtonLabel,
  backButtonHref,
  isShowSocial = false,
}: PropsWithChildren<CardWrapperProps>) => {
  return (
    <Card className="w-[400px] gap-3">
      <CardHeader className="space-y-2">
        <CardTitle>{heading}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isShowSocial && <Social />}
        {children}
      </CardContent>
      <CardFooter>
        {backButtonLabel && backButtonHref && (
          <Button variant="link" className="w-full font-normal">
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
