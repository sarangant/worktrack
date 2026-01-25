import { cn } from '../../utils/cn';

type TableProps = {
  headers: string[];
  children: React.ReactNode;
  className?: string;
};

export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-panel', className)}>
      <div className="overflow-auto">
        <table className="min-w-full text-sm text-slate-100">
          <thead className="bg-[#0f1832] text-muted uppercase text-[11px] tracking-wide">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </table>
      </div>
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
