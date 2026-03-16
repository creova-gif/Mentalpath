import { useState } from 'react';
import { X } from 'lucide-react';

export function InvoiceModal({ onClose }: { onClose: () => void }) {
  const [sessionCount, setSessionCount] = useState(1);
  const [ratePerSession, setRatePerSession] = useState(140);
  const [hstApplicable, setHstApplicable] = useState(false);

  const subtotal = sessionCount * ratePerSession;
  const hst = hstApplicable ? subtotal * 0.13 : 0;
  const total = subtotal + hst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-5" onClick={onClose}>
      <div
        className="bg-[var(--surface)] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.2)] w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-[fadeUp_0.2s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 pb-4 border-b border-[var(--border)] flex justify-between items-start">
          <div>
            <div className="font-[var(--font-display)] text-xl text-[var(--ink)]">Create invoice</div>
            <div className="text-[13px] text-[var(--ink-muted)] mt-1">
              Generate and send invoice to client
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

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink-soft)]">Invoice date</label>
              <input
                type="date"
                defaultValue="2026-03-16"
                className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink-soft)]">Due date</label>
              <input
                type="date"
                defaultValue="2026-03-30"
                className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[13px] font-medium text-[var(--ink-soft)]">Service description</label>
            <input
              type="text"
              defaultValue="Registered Psychotherapy — Individual sessions"
              className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink-soft)]">Number of sessions</label>
              <input
                type="number"
                value={sessionCount}
                onChange={(e) => setSessionCount(Number(e.target.value))}
                className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--ink-soft)]">Rate per session ($)</label>
              <input
                type="number"
                value={ratePerSession}
                onChange={(e) => setRatePerSession(Number(e.target.value))}
                className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hstApplicable}
                onChange={(e) => setHstApplicable(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-[var(--ink-soft)]">Add HST (13%)</span>
            </label>
            <div className="text-[11px] text-[var(--ink-muted)]">
              In Ontario, psychotherapy is generally HST-exempt unless you've opted in
            </div>
          </div>

          <div className="bg-[var(--warm)] border border-[var(--border)] rounded-lg p-4 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--ink-muted)]">Subtotal</span>
              <span className="font-medium text-[var(--ink)]">${subtotal.toFixed(2)}</span>
            </div>
            {hstApplicable && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--ink-muted)]">HST (13%)</span>
                <span className="font-medium text-[var(--ink)]">${hst.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-[var(--border)] pt-2 flex justify-between">
              <span className="font-medium text-[var(--ink)]">Total</span>
              <span className="font-[var(--font-display)] text-xl text-[var(--sage-deep)]">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[13px] font-medium text-[var(--ink-soft)]">Payment method</label>
            <select className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)]">
              <option>Stripe (credit card)</option>
              <option>E-transfer</option>
              <option>Cash</option>
              <option>Insurance direct billing</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[var(--ink-soft)]">Notes (optional)</label>
            <textarea
              placeholder="Payment due within 14 days..."
              className="px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] text-sm outline-none transition-all duration-150 focus:border-[var(--sage)] resize-vertical min-h-[80px] leading-[1.6]"
            />
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
            Create & send
          </button>
        </div>
      </div>
    </div>
  );
}
