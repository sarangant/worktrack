import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Table, TableCell, TableRow } from '../../components/ui/Table';

const initialExports = [
  { id: 'er1', name: 'Lønkørsel uge 46', range: '11. - 17. nov', status: 'Klar' },
  { id: 'er2', name: 'Fravær Q4', range: 'Okt - Dec', status: 'Kører' },
];

export function AdminReportsPage() {
  const [exports, setExports] = useState(initialExports);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', range: '' });

  const handleCreate = () => {
    if (!form.name || !form.range) return;
    const newExp = {
      id: `er${Date.now()}`,
      name: form.name,
      range: form.range,
      status: 'Planlagt',
    };
    setExports([...exports, newExp]);
    setForm({ name: '', range: '' });
    setShowAdd(false);
  };

  const handleDownload = (id: string) => {
    alert(`Downloader rapport ${id} (simuleret)`);
  };

  const handleShare = (id: string) => {
    alert(`Deler rapport ${id} (simuleret)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Rapporter (admin)</h1>
          <p className="text-muted">Planlæg, del og download eksport til løn og HR.</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>Planlæg rapport</Button>
      </div>

      {showAdd && (
        <Card title="Ny rapport">
          <div className="space-y-4">
            <Input placeholder="Navn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Periode (f.eks. 1. - 7. apr)" value={form.range} onChange={(e) => setForm({ ...form, range: e.target.value })} />
            <div className="flex gap-2">
              <Button onClick={handleCreate}>Opret</Button>
              <Button variant="ghost" onClick={() => { setShowAdd(false); setForm({ name: '', range: '' }); }}>
                Annullér
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card title="Rapport-eksporter">
        <Table headers={['Navn', 'Periode', 'Status', 'Handling']}>
          {exports.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>{exp.name}</TableCell>
              <TableCell>{exp.range}</TableCell>
              <TableCell>{exp.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleDownload(exp.id)}>
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleShare(exp.id)}>
                    Del
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
