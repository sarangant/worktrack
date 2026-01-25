import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Table, TableCell, TableRow } from '../../components/ui/Table';

const requests = [
  { id: 'k1', user: 'Mark Jensen', date: '12. nov', change: '+18m (sluttid)', status: 'Afventer' },
  { id: 'k2', user: 'Sofie Lau', date: '10. nov', change: '-10m (pausetid)', status: 'Godkendt' },
];

export function CorrectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Korretioner</h1>
          <p className="text-muted">Godkend eller afvis foreslåede ændringer fra medarbejdere.</p>
        </div>
        <Button size="sm" variant="secondary">
          Eksportér
        </Button>
      </div>

      <Card title="Anmodninger">
        <Table headers={['Bruger', 'Dato', 'Ændring', 'Status', 'Handling']}>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>{req.user}</TableCell>
              <TableCell>{req.date}</TableCell>
              <TableCell>{req.change}</TableCell>
              <TableCell>
                <Badge variant={req.status === 'Afventer' ? 'warning' : 'success'}>{req.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">
                    Godkend
                  </Button>
                  <Button size="sm" variant="ghost">
                    Afvis
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
