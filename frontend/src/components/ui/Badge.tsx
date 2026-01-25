import { cn } from '../../utils/cn';

type Props = {
  children: React.ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'accent';
  className?: string;
};

const styles: Record<NonNullable<Props['variant']>, string> = {
  neutral: 'bg-border/60 text-slate-100',
  success: 'bg-success/15 text-success border border-success/40',
  warning: 'bg-warning/15 text-warning border border-warning/40',
  danger: 'bg-danger/15 text-danger border border-danger/40',
  accent: 'bg-accent/15 text-accent border border-accent/40',
};

export function Badge({ children, variant = 'neutral', className }: Props) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold', styles[variant], className)}>
      {children}
    </span>
  );
}
