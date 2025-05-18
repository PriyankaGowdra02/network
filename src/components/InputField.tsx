
import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground/80">{label}</label>
        )}
        <div className="relative">
          <input
            className={cn(
              "w-full px-4 py-2 bg-neural-dark-accent border border-neural-muted rounded-sm",
              "focus:outline-none focus:ring-1 focus:ring-neural-accent",
              "placeholder:text-neural-muted/70",
              error && "border-destructive focus:ring-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
