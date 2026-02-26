import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

const initialReports = [
  { id: 'r1', name: 'Ugentlig tid', format: 'PDF', range: '11. - 17. nov', status: 'Klar' },
  { id: 'r2', name: 'Fravær Q4', format: 'XLSX', range: 'Okt - Dec', status: 'Klar' },
  { id: 'r3', name: 'Månedsoversigt', format: 'PDF', range: 'Nov 2024', status: 'Klar' },
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

  const handleDownload = (name: string) => {
    alert(`Downloader rapport: ${name} (simuleret)`);
  };

  const handleShare = (name: string) => {
    alert(`Deler rapport: ${name} (simuleret)`);
  };

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Rapporter</h1>
        <p className="text-slate-300">Eksportér dine registreringer til PDF eller Excel.</p>
      </div>

      <Button onClick={() => setShowAdd(true)} className="w-full">
        Opret ny rapport
      </Button>

      {showAdd && (
        <Card title="Ny rapport">
          <div className="space-y-4">
            <Input placeholder="Navn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Periode (f.eks. 1. - 7. apr)" value={form.range} onChange={(e) => setForm({ ...form, range: e.target.value })} />
            <select
              value={form.format}
              onChange={(e) => setForm({ ...form, format: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-base text-slate-900 min-h-[48px]"
            >
              <option value="PDF">PDF</option>
              <option value="XLSX">Excel</option>
            </select>
            <div className="flex gap-3">
              <Button onClick={handleCreate} className="flex-1">Opret</Button>
              <Button variant="ghost" onClick={() => { setShowAdd(false); setForm({ name: '', range: '', format: 'PDF' }); }} className="flex-1">
                Annullér
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Seneste rapporter</h2>
        {reports.map((report) => (
          <Card key={report.id} className="hover:border-accent/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{report.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{report.range}</p>
                </div>
                <Badge variant="success">{report.status}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="neutral">{report.format}</Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleDownload(report.name)}>
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleShare(report.name)}>
                    Del
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <p className="text-slate-600">Ingen rapporter endnu</p>
            <Button onClick={() => setShowAdd(true)} className="mt-4">
              Opret din første rapport
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
