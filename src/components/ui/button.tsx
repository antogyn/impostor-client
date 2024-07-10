import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-md ring-offset-shark-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-pumpkin-400 text-gallery-100 hover:bg-pumpkin-300/90 disabled:bg-pumpkin-300 disabled:text-gallery-500 uppercase",
        destructive: "bg-cardinal-700 text-gallery-100 hover:bg-cardinal-400 uppercase text-sm",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-mortar-50",
        secondary:
          "bg-mako-400 text-xs text-gallery-200 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-mortar-50 dark:hover:bg-slate-800/80 capitalize",
        ghost:
          "hover:bg-summer-green-400/90 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-mortar-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-mortar-50",
        cta: "bg-mako-400 text-gallery-100 hover:bg-mako-400/90 uppercase text-sm",
      },
      size: {
        default: "h-10 px-4 py-2 w-[100px]",
        sm: "h-9 rounded-md px-3",
        withIcons: "h-10 px-2 py-2 w-[140px]",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
