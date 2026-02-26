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
    <div className={cn('white-card p-6', className)}>
      {(title || description || actions) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
          {actions && <div className="mt-2">{actions}</div>}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
