import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
