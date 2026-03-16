import { useState } from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { useLocation } from 'react-router';
import { NewClientModal } from '../modals/NewClientModal';

export function Topbar() {
  const location = useLocation();
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Overview';
      case '/clients':
        return 'Clients';
      case '/notes':
        return 'Session Notes';
      case '/billing':
        return 'Billing';
      case '/calendar':
        return 'Calendar';
      default:
        return 'MentalPath';
    }
  };

  return (
    <>
      <div className="h-14 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-7 sticky top-0 z-40">
        <div className="font-[var(--font-display)] text-xl text-[var(--ink)] tracking-tight">
          {getPageTitle()}
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-[var(--warm)] border border-[var(--border)] rounded-lg px-3 py-[7px] text-[13px] text-[var(--ink-muted)]">
            <Search className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
            Search clients, notes...
          </div>
          <button className="flex items-center gap-[7px] px-3.5 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-150 border-none bg-transparent text-[var(--ink-muted)] border border-[var(--border)] hover:bg-[var(--warm)] hover:text-[var(--ink)]">
            <Bell className="w-3.5 h-3.5" strokeWidth={1.8} />
          </button>
          <button
            onClick={() => setShowNewClientModal(true)}
            className="flex items-center gap-[7px] px-3.5 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-150 border-none bg-[var(--sage)] text-white hover:bg-[var(--sage-deep)]"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.8} />
            New client
          </button>
        </div>
      </div>

      {showNewClientModal && <NewClientModal onClose={() => setShowNewClientModal(false)} />}
    </>
  );
}
