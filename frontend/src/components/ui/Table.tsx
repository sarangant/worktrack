import { cn } from '../../utils/cn';

type TableProps = {
  headers: string[];
  children: React.ReactNode;
  className?: string;
};

export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm text-left text-slate-200">
        <thead className="text-xs uppercase text-muted border-b border-border">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}

type RowProps = {
  children: React.ReactNode;
  className?: string;
};

type CellProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableRow({ children, className }: RowProps) {
  return <tr className={cn('hover:bg-white/5 transition-colors', className)}>{children}</tr>;
}

export function TableCell({ children, className }: CellProps) {
  return <td className={cn('px-4 py-3 align-middle text-slate-100', className)}>{children}</td>;
}
