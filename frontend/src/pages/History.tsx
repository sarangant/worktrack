import { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const history = [
  { id: 'h1', start: '2024-11-15T08:02:00Z', end: '2024-11-15T15:59:00Z', delta: '+4m', note: 'Møde' },
  { id: 'h2', start: '2024-11-14T08:10:00Z', end: '2024-11-14T16:04:00Z', delta: '+24m', note: 'Overtid' },
  { id: 'h3', start: '2024-11-13T08:05:00Z', end: '2024-11-13T15:40:00Z', delta: '-25m', note: 'Tidlig gå' },
  { id: 'h4', start: '2024-11-12T07:58:00Z', end: '2024-11-12T16:12:00Z', delta: '+32m', note: '' },
  { id: 'h5', start: '2024-11-11T08:15:00Z', end: '2024-11-11T15:45:00Z', delta: '-15m', note: 'Læge' },
];

export function HistoryPage() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(row => 
    row.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
    format(new Date(row.start), 'dd. MMM').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (id: string, note: string) => {
    if (selectedRow === id) {
      setSelectedRow(null);
      setEditNote('');
    } else {
      setSelectedRow(id);
      setEditNote(note);
    }
  };

  const handleSaveNote = () => {
    if (selectedRow && editNote.trim()) {
      alert(`Note opdateret for registrering ${selectedRow}: "${editNote}"`);
      setSelectedRow(null);
      setEditNote('');
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Historik</h1>
        <p className="text-slate-300">Se og gennemgå dine tidligere registreringer.</p>
      </div>

      <Card>
        <div className="space-y-4">
          <Input
            placeholder="Søg i noter eller datoer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              {filteredHistory.length} registreringer
            </span>
            <Button variant="ghost" size="sm">
              Eksportér
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Registreringer" description="Tryk på en række for at redigere noten.">
        <div className="space-y-3">
          {filteredHistory.map((row) => (
            <div
              key={row.id}
              onClick={() => handleRowClick(row.id, row.note)}
              className={`
                border border-border rounded-lg p-4 cursor-pointer transition-all
                ${selectedRow === row.id 
                  ? 'border-accent bg-panel/80' 
                  : 'hover:bg-panel/40'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">
                      {format(new Date(row.start), 'dd. MMM yyyy')}
                    </div>
                    <div className="text-slate-600">
                      {format(new Date(row.start), 'HH:mm')} - {format(new Date(row.end), 'HH:mm')}
                    </div>
                  </div>
                </div>
                <Badge variant={row.delta.startsWith('-') ? 'warning' : 'success'}>
                  {row.delta}
                </Badge>
              </div>
              
              {selectedRow === row.id ? (
                <div className="space-y-3 mt-3">
                  <Input
                    placeholder="Tilføj note..."
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={(e) => { e.stopPropagation(); handleSaveNote(); }}>
                      Gem
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedRow(null); setEditNote(''); }}>
                      Annullér
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-600 min-h-[20px]">
                  {row.note || <span className="text-slate-400">Ingen note</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
