import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'block w-full rounded-lg border border-slate-300 bg-[#7581e2] px-4 py-4 text-base text-white placeholder-[#c2ccf5] shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[48px] touch-manipulation',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
