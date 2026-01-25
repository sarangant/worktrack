import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

const base =
  'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-accent text-surface hover:bg-accentSoft focus:ring-accent',
  secondary: 'bg-panel text-slate-100 border border-border hover:border-accent focus:ring-accent',
  ghost: 'bg-transparent text-slate-200 hover:bg-panel focus:ring-border',
  danger: 'bg-danger text-white hover:bg-red-500 focus:ring-danger',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-5 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
  },
);

Button.displayName = 'Button';
