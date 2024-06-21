import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-burning-orange-300 bg-summer-green-100 px-3 py-2 text-sm text-summer-green-400 ring-offset-summer-green-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-summer-green-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burning-orange-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
