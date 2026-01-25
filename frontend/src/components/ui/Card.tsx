import { cn } from '../../utils/cn';

type CardProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export function Card({ title, description, children, actions, className }: CardProps) {
  return (
    <div className={cn('rounded-2xl border border-border bg-panel p-5 shadow-card', className)}>
      {(title || actions) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {description && <p className="text-sm text-muted">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
