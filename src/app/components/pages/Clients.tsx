import { useState } from 'react';
import { ClientDetailPanel } from '../modals/ClientDetailPanel';
import { NoteModal } from '../modals/NoteModal';

type Client = {
  initials: string;
  name: string;
  since: string;
  status: 'active' | 'waitlist' | 'inactive';
  nextSession: string;
  sessions: string;
  tags: string[];
  rate: string;
  color: string;
};

const clients: Client[] = [
  {
    initials: 'AM',
    name: 'Amara Mensah',
    since: 'Since Jan 2024 · RP: Dr. Osei',
    status: 'active',
    nextSession: 'Today 10:00am',
    sessions: 'Session 14',
    tags: ['Newcomer', 'Racialized stress'],
    rate: '$140/hr',
    color: 'c-av-b',
  },
  {
    initials: 'SM',
    name: 'Sadia Mohamoud',
    since: 'Since Mar 2024 · RP: Dr. Osei',
    status: 'active',
    nextSession: 'Thu Mar 19, 9:00am',
    sessions: 'Session 8',
    tags: ['Refugee trauma', 'Cultural adjustment'],
    rate: '$70/hr (sliding)',
    color: 'c-av-a',
  },
  {
    initials: 'JL',
    name: 'Jamal Lee',
    since: 'Since Sep 2023 · RP: Dr. Osei',
    status: 'active',
    nextSession: 'Today 11:30am',
    sessions: 'Session 22',
    tags: ['Anti-Black racism', 'Workplace trauma'],
    rate: '$140/hr',
    color: 'c-av-c',
  },
  {
    initials: 'PC',
    name: 'Priya & Chetan Choudhary',
    since: 'Since Feb 2025 · Couples',
    status: 'active',
    nextSession: 'Today 2:00pm',
    sessions: 'Session 3',
    tags: ['Intergenerational', 'Cultural identity'],
    rate: '$180/session',
    color: 'c-av-d',
  },
  {
    initials: 'RB',
    name: 'Riya Bhatt',
    since: 'Since Mar 2025 · RP: Dr. Osei',
    status: 'active',
    nextSession: 'Today 3:30pm',
    sessions: 'Session 2',
    tags: ['Newcomer', 'Anxiety'],
    rate: '$110/hr',
    color: 'c-av-e',
  },
  {
    initials: 'MN',
    name: 'Marcus Nwosu',
    since: 'New — intake today · RP: Dr. Osei',
    status: 'active',
    nextSession: 'Today 5:00pm',
    sessions: 'Intake',
    tags: ['Pending intake'],
    rate: '$140/hr',
    color: 'c-av-f',
  },
  {
    initials: 'DK',
    name: 'Daniyah Khalil',
    since: 'Waitlist since Feb 2025',
    status: 'waitlist',
    nextSession: '—',
    sessions: '—',
    tags: ['Trauma', 'Newcomer'],
    rate: 'TBD',
    color: 'bg-[#e8d4e8] text-[#5a1a5a]',
  },
];

export function Clients() {
  const [filter, setFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [noteModalClient, setNoteModalClient] = useState<string | null>(null);

  const filteredClients = clients.filter((client) => {
    if (filter === 'all') return true;
    return client.status === filter;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div className="text-sm text-[var(--ink-muted)]">23 active clients · 2 on waitlist</div>
        <div className="flex gap-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
          <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
          <FilterButton active={filter === 'waitlist'} onClick={() => setFilter('waitlist')}>Waitlist</FilterButton>
          <FilterButton active={filter === 'inactive'} onClick={() => setFilter('inactive')}>Inactive</FilterButton>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Client
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Status
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Next session
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Sessions
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Cultural context
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]">
                Rate
              </th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.5px] text-[var(--ink-muted)] px-5 py-2.5 bg-[var(--warm)]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, i) => (
              <tr
                key={i}
                onClick={() => setSelectedClient(client)}
                className="transition-all duration-100 cursor-pointer hover:[&>td]:bg-[var(--warm)]"
              >
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-sm text-[var(--ink-soft)] align-middle">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${getAvatarColor(client.color)}`}>
                      {client.initials}
                    </div>
                    <div>
                      <div className="font-medium text-[var(--ink)] text-sm">{client.name}</div>
                      <div className="text-xs text-[var(--ink-muted)]">{client.since}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-sm text-[var(--ink-soft)] align-middle">
                  <StatusPill status={client.status} />
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-sm text-[var(--ink-soft)] align-middle">
                  {client.nextSession}
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-sm text-[var(--ink-soft)] align-middle">
                  {client.sessions}
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-sm text-[var(--ink-soft)] align-middle">
                  {client.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="inline-block text-[11px] px-2 py-0.5 rounded bg-[var(--sage-pale)] text-[var(--sage-deep)] m-0.5 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-sm text-[var(--ink-soft)] align-middle">
                  {client.rate}
                </td>
                <td className="px-5 py-3.5 border-t border-[var(--border)] text-sm text-[var(--ink-soft)] align-middle">
                  {client.sessions !== '—' && client.sessions !== 'Intake' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNoteModalClient(client.name);
                      }}
                      className="px-2.5 py-[5px] rounded-md text-xs font-medium border border-[var(--border)] bg-transparent cursor-pointer text-[var(--ink-soft)] transition-all duration-150 hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)]"
                    >
                      + Note
                    </button>
                  )}
                  {client.sessions === 'Intake' && (
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-[5px] rounded-md text-xs font-medium border border-[var(--border)] bg-transparent cursor-pointer text-[var(--ink-soft)] transition-all duration-150 hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)]"
                    >
                      View intake
                    </button>
                  )}
                  {client.status === 'waitlist' && (
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-[5px] rounded-md text-xs font-medium border border-[var(--border)] bg-transparent cursor-pointer text-[var(--ink-soft)] transition-all duration-150 hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)]"
                    >
                      Assign slot
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClient && <ClientDetailPanel client={selectedClient} onClose={() => setSelectedClient(null)} />}
      {noteModalClient && <NoteModal clientName={noteModalClient} onClose={() => setNoteModalClient(null)} />}
    </>
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

function StatusPill({ status }: { status: 'active' | 'waitlist' | 'inactive' }) {
  const styles = {
    active: 'bg-[#e8f4f0] text-[var(--sage-deep)] before:bg-[var(--sage)]',
    waitlist: 'bg-[#fef3e2] text-[#7a4a00] before:bg-[var(--gold)]',
    inactive: 'bg-[var(--warm)] text-[var(--ink-muted)] before:bg-[var(--ink-muted)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-[5px] text-xs font-medium px-2.5 py-[3px] rounded-[20px] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function getAvatarColor(color: string) {
  if (color.startsWith('bg-')) return color;
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
