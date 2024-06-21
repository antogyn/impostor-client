import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-summer-green-500 text-mortar-50 hover:bg-summer-green-400/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 disabled:bg-summer-green-100 disabled:text-summer-green-500",
        destructive:
          "bg-shiraz-700 text-mortar-50 hover:bg-shiraz-500/90 dark:bg-red-900 dark:text-mortar-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-mortar-50",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-mortar-50 dark:hover:bg-slate-800/80",
        ghost:
          "hover:bg-summer-green-400/90 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-mortar-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-mortar-50",
        cta: "bg-harvest-gold-500 text-mortar-50 hover:bg-harvest-gold-400/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 disabled:bg-summer-green-100 disabled:text-summer-green-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
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
