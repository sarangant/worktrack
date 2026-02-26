import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Table, TableCell, TableRow } from '../components/ui/Table';

const dummyNotes = [
  { id: 'n1', date: '2024-11-20', content: 'Huskede at gemme frokostpausen i systemet.' },
  { id: 'n2', date: '2024-11-19', content: 'Mødte for sent til kunden pga. trafik.' },
  { id: 'n3', date: '2024-11-18', content: 'Ekstra overarbejde på projekt X.' },
];

const dummyReports = [
  { id: 'r1', name: 'Ugentlig tid', format: 'PDF', range: '11. - 17. nov', status: 'Klar', downloadUrl: '#' },
  { id: 'r2', name: 'Fravær Q4', format: 'XLSX', range: 'Okt - Dec', status: 'Klar', downloadUrl: '#' },
];

export function NotesPage() {
  const [notes, setNotes] = useState(dummyNotes);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ content: '' });

  const handleAdd = () => {
    if (!form.content.trim()) return;
    const newNote = {
      id: `n${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      content: form.content,
    };
    setNotes([newNote, ...notes]);
    setForm({ content: '' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Noter</h1>
          <p className="text-muted">Se og tilføj dine noter.</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>Ny note</Button>
      </div>

      {showAdd && (
        <Card title="Ny note">
          <div className="space-y-4">
            <textarea
              placeholder="Skriv din note her..."
              value={form.content}
              onChange={(e) => setForm({ content: e.target.value })}
              className="w-full h-24 rounded-lg border border-border bg-panel px-4 py-3 text-sm text-slate-100 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={handleAdd}>Gem</Button>
              <Button variant="ghost" onClick={() => { setShowAdd(false); setForm({ content: '' }); }}>
                Annullér
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card title="Mine noter">
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="rounded-lg border border-border bg-panel p-4">
              <p className="text-xs text-muted mb-1">{note.date}</p>
              <p className="text-sm text-white">{note.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function SampleReportsPage() {
  const [reports] = useState(dummyReports);

  const handleDownload = (name: string, url: string) => {
    alert(`Downloader rapport: ${name}\nI en rigtig app ville denne blive downloadet fra: ${url}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Eksempelrapporter</h1>
        <p className="text-muted">Prøveeksempler på rapporter du kan downloade.</p>
      </div>

      <Card title="Rapporter">
        <Table headers={['Navn', 'Format', 'Periode', 'Status', 'Handling']}>
          {reports.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.format}</TableCell>
              <TableCell>{r.range}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell>
                <Button size="sm" variant="secondary" onClick={() => handleDownload(r.name, r.downloadUrl)}>
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}
