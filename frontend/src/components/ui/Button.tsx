import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

const base =
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 touch-manipulation';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-accent text-accent-on hover:bg-accent/90 focus:ring-accent shadow-sm',
  secondary: 'bg-panel text-slate-900 border border-slate-300 hover:bg-slate-200 focus:ring-accent',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-accent',
  danger: 'bg-danger text-white hover:bg-red-500 focus:ring-danger',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-10 px-4 text-sm min-h-[44px]',
  md: 'h-12 px-5 text-base min-h-[48px]',
  lg: 'h-14 px-6 text-lg min-h-[52px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
  },
);

Button.displayName = 'Button';
