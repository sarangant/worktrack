import { cn } from '../../utils/cn';

type TableProps = {
  headers: string[];
  children: React.ReactNode;
  className?: string;
};

export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn('overflow-x-auto -mx-4 px-4', className)}>
      <table className="w-full min-w-[500px] text-sm text-left text-text-primary">
        <thead className="text-xs uppercase text-text-muted border-b border-border bg-panel-high sticky top-0">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold whitespace-nowrap">
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
  return <tr className={cn('hover:bg-panel-high transition-colors', className)}>{children}</tr>;
}

export function TableCell({ children, className }: CellProps) {
  return <td className={cn('px-4 py-4 align-middle text-text-primary whitespace-nowrap', className)}>{children}</td>;
}
