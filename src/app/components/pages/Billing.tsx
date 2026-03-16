import { useState } from 'react';
import { Plus } from 'lucide-react';
import { InvoiceModal } from '../modals/InvoiceModal';

const invoices = [
  {
    number: 'INV-0031',
    client: { initials: 'AM', name: 'Amara Mensah', color: 'c-av-b' },
    date: 'Mar 9, 2026',
    sessions: '2 sessions',
    amount: '$280.00',
    status: 'paid' as const,
  },
  {
    number: 'INV-0032',
    client: { initials: 'JL', name: 'Jamal Lee', color: 'c-av-c' },
    date: 'Mar 9, 2026',
    sessions: '2 sessions',
    amount: '$280.00',
    status: 'pending' as const,
  },
  {
    number: 'INV-0030',
    client: { initials: 'SM', name: 'Sadia Mohamoud', color: 'c-av-a' },
    date: 'Mar 6, 2026',
    sessions: '2 sessions',
    amount: '$140.00',
    status: 'paid' as const,
  },
  {
    number: 'INV-0029',
    client: { initials: 'PC', name: 'Priya & Chetan C.', color: 'c-av-d' },
    date: 'Mar 7, 2026',
    sessions: '1 session',
    amount: '$180.00',
    status: 'overdue' as const,
  },
  {
    number: 'INV-0028',
    client: { initials: 'AM', name: 'Amara Mensah', color: 'c-av-b' },
    date: 'Feb 23, 2026',
    sessions: '2 sessions',
    amount: '$280.00',
    status: 'paid' as const,
  },
  {
    number: 'INV-0027',
    client: { initials: 'RB', name: 'Riya Bhatt', color: 'c-av-e' },
    date: 'Mar 10, 2026',
    sessions: '1 session',
    amount: '$110.00',
    status: 'pending' as const,
  },
];

export function Billing() {
  const [filter, setFilter] = useState('all');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === 'all') return true;
    return invoice.status === filter;
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <SummaryBox label="Collected — March" value="$4,200" highlight />
        <SummaryBox label="Outstanding" value="$840" />
        <SummaryBox label="YTD collected" value="$10,640" />
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden mb-5">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <span className="text-sm font-medium text-[var(--ink)]">Invoices</span>
          <div className="flex gap-2.5 items-center">
            <div className="flex gap-2">
              <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
              <FilterButton active={filter === 'paid'} onClick={() => setFilter('paid')}>Paid</FilterButton>
              <FilterButton active={filter === 'pending'} onClick={() => setFilter('pending')}>Pending</FilterButton>
              <FilterButton active={filter === 'overdue'} onClick={() => setFilter('overdue')}>Overdue</FilterButton>
            </div>
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="flex items-center gap-[7px] px-3.5 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-150 border-none bg-[var(--sage)] text-white hover:bg-[var(--sage-deep)]"
            >
              <Plus className="w-[13px] h-[13px]" strokeWidth={2} />
              New invoice
            </button>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Invoice #
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Client
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Date
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Sessions
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Amount
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Status
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice, i) => (
              <tr key={i} className="cursor-pointer transition-all duration-100 hover:[&>td]:bg-[var(--warm)]">
                <td className="px-5 py-3.5 border-t border-[var(--border)] font-medium text-[var(--ink)] text-[13px] align-middle">
                  {invoice.number}
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-[13px] text-[var(--ink-soft)] align-middle">
                  <div className="flex items-center gap-2">
                    <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 ${getAvatarColor(invoice.client.color)}`}>
                      {invoice.client.initials}
                    </div>
                    {invoice.client.name}
                  </div>
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-[13px] text-[var(--ink-soft)] align-middle">
                  {invoice.date}
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-[13px] text-[var(--ink-soft)] align-middle">
                  {invoice.sessions}
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] font-medium text-[var(--ink)] text-sm align-middle">
                  {invoice.amount}
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-[13px] text-[var(--ink-soft)] align-middle">
                  <InvoiceStatus status={invoice.status} />
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-[13px] text-[var(--ink-soft)] align-middle">
                  <button className="px-2.5 py-[5px] rounded-md text-xs font-medium border border-[var(--border)] bg-transparent cursor-pointer text-[var(--ink-soft)] transition-all duration-150 hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)]">
                    {invoice.status === 'paid' ? 'Receipt' : 'Send reminder'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
        <div className="text-[13px] font-medium text-[var(--ink)] mb-3">Tax prep — T2125 self-employment summary</div>
        <div className="text-[13px] text-[var(--ink-muted)] mb-4 leading-[1.6]">
          MentalPath generates a year-end income summary formatted for Schedule T2125 (Statement of Business Activities).
          Download at tax time — no accountant needed for the basics.
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-[7px] px-3.5 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-150 border border-[var(--border)] bg-transparent text-[var(--ink-soft)] hover:bg-[var(--warm)] hover:text-[var(--ink)]">
            Export 2025 T2125 summary
          </button>
          <button className="flex items-center gap-[7px] px-3.5 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-150 border border-[var(--border)] bg-transparent text-[var(--ink-soft)] hover:bg-[var(--warm)] hover:text-[var(--ink)]">
            Download all receipts (ZIP)
          </button>
        </div>
      </div>

      {showInvoiceModal && <InvoiceModal onClose={() => setShowInvoiceModal(false)} />}
    </>
  );
}

function SummaryBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`border rounded-[10px] p-4 ${
        highlight ? 'border-[var(--sage)] bg-[var(--sage-pale)]' : 'bg-[var(--surface)] border-[var(--border)]'
      }`}
    >
      <div className="text-[11px] text-[var(--ink-muted)] font-medium uppercase tracking-[0.4px] mb-1.5">{label}</div>
      <div className={`font-[var(--font-display)] text-2xl ${highlight ? 'text-[var(--sage-deep)]' : 'text-[var(--ink)]'}`}>
        {value}
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-[20px] text-xs font-medium border border-[var(--border)] cursor-pointer transition-all duration-150 ${
        active
          ? 'bg-[var(--sage)] border-[var(--sage)] text-white'
          : 'bg-transparent text-[var(--ink-muted)] hover:bg-[var(--warm)]'
      }`}
    >
      {children}
    </button>
  );
}

function InvoiceStatus({ status }: { status: 'paid' | 'pending' | 'overdue' }) {
  const styles = {
    paid: 'bg-[#e8f4f0] text-[var(--sage-deep)]',
    pending: 'bg-[#fef3e2] text-[#7a4a00]',
    overdue: 'bg-[#fde8e8] text-[#7a1a1a]',
  };

  return (
    <span className={`inline-block text-[11px] font-medium px-[9px] py-[3px] rounded ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function getAvatarColor(color: string) {
  const colors: Record<string, string> = {
    'c-av-a': 'bg-[#d4e8e4] text-[var(--sage-deep)]',
    'c-av-b': 'bg-[#e8d4d4] text-[#7a3030]',
    'c-av-c': 'bg-[#d4d4e8] text-[#303070]',
    'c-av-d': 'bg-[#e8e4d4] text-[#5a4a10]',
    'c-av-e': 'bg-[#e4d4e8] text-[#5a1a6a]',
    'c-av-f': 'bg-[#d4e8d4] text-[#1a5a1a]',
  };
  return colors[color] || colors['c-av-a'];
}
