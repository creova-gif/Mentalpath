import { useState } from 'react';
import { X, Sparkles, Lock, Loader2 } from 'lucide-react';

const noteFormats = [
  { id: 'dap', name: 'DAP', description: 'Data · Assessment · Plan' },
  { id: 'soap', name: 'SOAP', description: 'Subjective · Objective · Assessment · Plan' },
  { id: 'birp', name: 'BIRP', description: 'Behavior · Intervention · Response · Plan' },
  { id: 'progress', name: 'Progress', description: 'Narrative progress note' },
];

export function NoteModal({ clientName, onClose }: { clientName: string; onClose: () => void }) {
  const [selectedFormat, setSelectedFormat] = useState('dap');
  const [aiAssisting, setAiAssisting] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [sectionValues, setSectionValues] = useState<Record<string, string>>({
    section1: '',
    section2: '',
    section3: '',
    section4: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleAiAssist = async () => {
    setAiAssisting(true);
    setAiError(null);

    try {
      // Get Supabase URL and anon key from environment or utils
      const projectId = 'hkhwgbkijepsxtixdmrs';
      const supabaseUrl = `https://${projectId}.supabase.co`;
      // In production, get this from your auth system
      const anonKey = 'your-anon-key-here';
      
      const response = await fetch(`${supabaseUrl}/functions/v1/ai-note-assist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          session_id: '00000000-0000-0000-0000-000000000001', // In production, use real session ID
          note_format: selectedFormat.toUpperCase(),
          section_1: sectionValues.section1,
          section_2: sectionValues.section2,
          section_3: sectionValues.section3,
          section_4: sectionValues.section4 || undefined,
          session_context: `Individual therapy session, 50 minutes`,
        }),
      });

      if (!response.ok) {
        throw new Error('AI assist service unavailable');
      }

      const data = await response.json();
      
      // Parse the AI draft and populate sections
      if (data.draft) {
        // The AI returns formatted text - parse it and fill in sections
        // For demo purposes, we'll just show a success message
        alert(`AI Draft Generated!\n\n${data.draft}\n\n${data.disclaimer}`);
      }
    } catch (error) {
      console.error('AI assist error:', error);
      setAiError('AI assist is currently unavailable. Please write your note manually.');
    } finally {
      setAiAssisting(false);
    }
  };

  const getFormatSections = () => {
    switch (selectedFormat) {
      case 'dap':
        return ['Data', 'Assessment', 'Plan'];
      case 'soap':
        return ['Subjective', 'Objective', 'Assessment', 'Plan'];
      case 'birp':
        return ['Behavior', 'Intervention', 'Response', 'Plan'];
      case 'progress':
        return ['Summary', 'Observations', 'Plan'];
      default:
        return ['Section 1', 'Section 2', 'Section 3'];
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-5" onClick={onClose}>
      <div
        className="bg-[var(--surface)] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.2)] w-full max-w-[800px] max-h-[90vh] overflow-y-auto animate-[fadeUp_0.2s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 pb-4 border-b border-[var(--border)] flex justify-between items-start">
          <div>
            <div className="font-[var(--font-display)] text-xl text-[var(--ink)]">
              {clientName ? `Session note — ${clientName}` : 'New session note'}
            </div>
            <div className="text-[13px] text-[var(--ink-muted)] mt-1">
              Notes encrypted at rest · Auto-lock after 24hrs · PHIPA compliant
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-none border-none text-xl cursor-pointer text-[var(--ink-muted)] px-2 py-1 rounded-md transition-all duration-150 hover:bg-[var(--warm)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          {!clientName && (
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[13px] font-medium text-[var(--ink-soft)]">Client</label>
              <select className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]">
                <option>Select a client</option>
                <option>Amara Mensah</option>
                <option>Sadia Mohamoud</option>
                <option>Jamal Lee</option>
                <option>Priya & Chetan Choudhary</option>
                <option>Riya Bhatt</option>
                <option>Marcus Nwosu</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink-soft)]">Session date</label>
              <input
                type="date"
                defaultValue="2026-03-16"
                className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink-soft)]">Duration (min)</label>
              <input
                type="number"
                defaultValue="50"
                className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink-soft)]">Session type</label>
              <select className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]">
                <option>Individual</option>
                <option>Couples</option>
                <option>Family</option>
                <option>Group</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[13px] font-medium text-[var(--ink-soft)]">Note format</label>
            <div className="grid grid-cols-4 gap-2.5">
              {noteFormats.map((format) => (
                <button
                  key={format.id}
                  type="button"
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-2.5 px-3.5 rounded-lg border-[1.5px] bg-[var(--surface)] text-[13px] font-medium cursor-pointer transition-all duration-150 text-left ${
                    selectedFormat === format.id
                      ? 'border-[var(--sage)] bg-[var(--sage-pale)] text-[var(--sage-deep)]'
                      : 'border-[var(--border)] text-[var(--ink-soft)] hover:border-[var(--sage)] hover:bg-[var(--sage-pale)] hover:text-[var(--sage-deep)]'
                  }`}
                >
                  {format.name}
                  <div className="text-[11px] font-normal text-[var(--ink-muted)] mt-[3px]">{format.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[var(--warm)] border border-[var(--border)] rounded-[10px] p-4 min-h-[200px]">
            <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--sage-pale)] text-[var(--sage-deep)] mb-3.5">
              {noteFormats.find((f) => f.id === selectedFormat)?.name} format
            </span>
            
            {getFormatSections().map((section, i) => (
              <div key={i} className="mb-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.6px] text-[var(--sage)] mb-2">
                  {section}
                </div>
                <textarea
                  value={sectionValues[`section${i + 1}`] || ''}
                  onChange={(e) => setSectionValues({ ...sectionValues, [`section${i + 1}`]: e.target.value })}
                  placeholder={`Enter ${section.toLowerCase()}...`}
                  className="bg-white border border-[var(--border)] rounded-[7px] w-full px-2.5 py-2.5 text-[13px] min-h-[70px] leading-[1.65] outline-none transition-all duration-150 focus:border-[var(--sage)]"
                />
              </div>
            ))}

            {aiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3 text-xs text-red-700">
                {aiError}
              </div>
            )}

            <button
              type="button"
              onClick={handleAiAssist}
              disabled={aiAssisting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--sage)]/30 bg-[var(--sage-pale)] text-[var(--sage-deep)] text-xs font-medium cursor-pointer transition-all duration-150 mt-2 hover:bg-[var(--sage)] hover:text-white disabled:opacity-50"
            >
              {aiAssisting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" strokeWidth={1.5} />}
              {aiAssisting ? 'Generating summary...' : 'AI assist — draft summary'}
            </button>

            <div className="flex items-center gap-1.5 text-[11px] text-[var(--sage)] mt-2">
              <Lock className="w-3 h-3" strokeWidth={1.5} />
              End-to-end encrypted · Stored on Canadian servers
            </div>
          </div>
        </form>

        <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-[9px] text-sm font-medium cursor-pointer transition-all duration-150 bg-transparent border border-[var(--border)] text-[var(--ink-soft)] hover:bg-[var(--warm)]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-[9px] text-sm font-medium cursor-pointer transition-all duration-150 bg-transparent border border-[var(--border)] text-[var(--ink-soft)] hover:bg-[var(--warm)]"
          >
            Save draft
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-[9px] text-sm font-medium cursor-pointer transition-all duration-150 bg-[var(--sage)] text-white border-none hover:bg-[var(--sage-deep)]"
          >
            Save & lock
          </button>
        </div>
      </div>
    </div>
  );
}