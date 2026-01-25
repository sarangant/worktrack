import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Table, TableCell, TableRow } from '../components/ui/Table';

const initialReports = [
  { id: 'r1', name: 'Ugentlig tid', format: 'PDF', range: '11. - 17. nov', status: 'Klar' },
  { id: 'r2', name: 'Fravær Q4', format: 'XLSX', range: 'Okt - Dec', status: 'Klar' },
];

export function ReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', range: '', format: 'PDF' });

  const handleCreate = () => {
    if (!form.name || !form.range) return;
    const newReport = {
      id: `r${Date.now()}`,
      name: form.name,
      format: form.format,
      range: form.range,
      status: 'Klar',
    };
    setReports([...reports, newReport]);
    setForm({ name: '', range: '', format: 'PDF' });
    setShowAdd(false);
  };

  const handleDownload = (id: string, name: string) => {
    alert(`Downloader rapport: ${name} (simuleret)`);
  };

  const handleShare = (id: string, name: string) => {
    alert(`Deler rapport: ${name} (simuleret)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Rapporter</h1>
          <p className="text-muted">Eksportér dine registreringer til PDF eller Excel.</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>Ny rapport</Button>
      </div>

      {showAdd && (
        <Card title="Ny rapport">
          <div className="space-y-4">
            <Input placeholder="Navn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Periode (f.eks. 1. - 7. apr)" value={form.range} onChange={(e) => setForm({ ...form, range: e.target.value })} />
            <select
              value={form.format}
              onChange={(e) => setForm({ ...form, format: e.target.value })}
              className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-sm text-slate-100"
            >
              <option value="PDF">PDF</option>
              <option value="XLSX">Excel</option>
            </select>
            <div className="flex gap-2">
              <Button onClick={handleCreate}>Opret</Button>
              <Button variant="ghost" onClick={() => { setShowAdd(false); setForm({ name: '', range: '', format: 'PDF' }); }}>
                Annullér
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card title="Seneste rapporter">
        <Table headers={['Navn', 'Format', 'Periode', 'Status', 'Handling']}>
          {reports.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.format}</TableCell>
              <TableCell>{r.range}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleDownload(r.id, r.name)}>
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleShare(r.id, r.name)}>
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
