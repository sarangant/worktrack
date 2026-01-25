import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'block w-full rounded-lg border border-border bg-panel px-4 py-3 text-sm text-slate-100 placeholder:text-muted shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
