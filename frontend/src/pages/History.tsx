import { format } from 'date-fns';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Table, TableCell, TableRow } from '../components/ui/Table';

const history = [
  { id: 'h1', start: '2024-11-15T08:02:00Z', end: '2024-11-15T15:59:00Z', delta: '+4m', note: 'Møde' },
  { id: 'h2', start: '2024-11-14T08:10:00Z', end: '2024-11-14T16:04:00Z', delta: '+24m', note: 'Overtid' },
  { id: 'h3', start: '2024-11-13T08:05:00Z', end: '2024-11-13T15:40:00Z', delta: '-25m', note: 'Tidlig gå' },
];

export function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Historik</h1>
        <p className="text-muted">Se og gennemgå dine tidligere registreringer.</p>
      </div>

      <Card title="Registreringer" description="Dobbeltklik en række for at foreslå rettelse.">
        <Table headers={['Start', 'Slut', 'Saldo', 'Note']}>
          {history.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{format(new Date(row.start), 'dd. MMM HH:mm')}</TableCell>
              <TableCell>{format(new Date(row.end), 'dd. MMM HH:mm')}</TableCell>
              <TableCell>
                <Badge variant={row.delta.startsWith('-') ? 'warning' : 'success'}>{row.delta}</Badge>
              </TableCell>
              <TableCell>{row.note}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
