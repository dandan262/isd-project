import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "ghost";
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type ButtonLinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

function getButtonClasses(variant: NonNullable<CommonProps["variant"]>) {
  const base =
    "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (variant === "secondary") {
    return cn(base, "border-border bg-card text-foreground hover:bg-muted");
  }

  if (variant === "ghost") {
    return cn(base, "border-transparent bg-transparent text-foreground hover:bg-muted");
  }

  return cn(base, "border-transparent bg-accent text-accent-foreground hover:opacity-90");
}

export function Button({ className, variant = "default", children, ...props }: ButtonProps | ButtonLinkProps) {
  const classes = cn(getButtonClasses(variant), className);

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;

    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
