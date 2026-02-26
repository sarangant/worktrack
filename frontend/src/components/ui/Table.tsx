import { cn } from '../../utils/cn';

type TableProps = {
  headers: string[];
  children: React.ReactNode;
  className?: string;
};

export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn('overflow-x-auto -mx-4 px-4', className)}>
      <table className="w-full min-w-[500px] text-sm text-left text-slate-900">
        <thead className="text-xs uppercase text-slate-600 border-b border-slate-200 bg-slate-50 sticky top-0">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">{children}</tbody>
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
  return <tr className={cn('hover:bg-slate-50 transition-colors', className)}>{children}</tr>;
}

export function TableCell({ children, className }: CellProps) {
  return <td className={cn('px-4 py-4 align-middle text-slate-900 whitespace-nowrap', className)}>{children}</td>;
}
