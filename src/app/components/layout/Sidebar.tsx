import { NavLink, Link } from 'react-router';
import { LayoutGrid, Users, FileText, CreditCard, Calendar, MessageSquare, Settings, Shield, Sparkles, Clipboard, Activity, TrendingUp, UserPlus } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-[230px] bg-[var(--ink)] fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-transform duration-250">
      <Link to="/" className="flex items-center gap-2.5 p-5 pb-4 border-b border-white/[0.07] no-underline">
        <div className="w-[30px] h-[30px] bg-[var(--sage)] rounded-[7px] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2 [stroke-linecap:round]">
            <path d="M12 3c-4.5 0-8 3.5-8 8 0 3 1.7 5.6 4.2 7l-.2 3 4-2c.7.1 1.3.2 2 .2 4.5 0 8-3.5 8-8s-3.5-8-8-8z"/>
            <path d="M8 11h8M8 14h5"/>
          </svg>
        </div>
        <span className="font-[var(--font-display)] text-[17px] text-white">MentalPath</span>
      </Link>

      <div className="py-4 px-3">
        <div className="text-[10px] font-medium tracking-[0.8px] uppercase text-white/30 px-2 mb-1">Practice</div>
        <NavItem to="/dashboard" icon={LayoutGrid} label="Overview" />
        <NavItem to="/dashboard/clients" icon={Users} label="Clients" badge="23" />
        <NavItem to="/dashboard/notes" icon={FileText} label="Session Notes" badge="3" />
        <NavItem to="/dashboard/billing" icon={CreditCard} label="Billing" />
        <NavItem to="/dashboard/cultural-templates" icon={Sparkles} label="Cultural Templates" />
      </div>

      <div className="py-4 px-3">
        <div className="text-[10px] font-medium tracking-[0.8px] uppercase text-white/30 px-2 mb-1">Clinical</div>
        <NavItem to="/dashboard/clinical-tools" icon={Clipboard} label="Clinical Tools" />
        <NavItem to="/dashboard/session-prep" icon={Activity} label="Session Prep" />
        <NavItem to="/dashboard/outcome-measures" icon={TrendingUp} label="Outcome Measures" />
        <NavItem to="/dashboard/waitlist" icon={UserPlus} label="Waitlist" />
      </div>

      <div className="py-4 px-3">
        <div className="text-[10px] font-medium tracking-[0.8px] uppercase text-white/30 px-2 mb-1">Schedule</div>
        <NavItem to="/dashboard/calendar" icon={Calendar} label="Calendar" />
        <NavItem to="/dashboard/messages" icon={MessageSquare} label="Secure Messages" />
      </div>

      <div className="py-4 px-3">
        <div className="text-[10px] font-medium tracking-[0.8px] uppercase text-white/30 px-2 mb-1">Settings</div>
        <NavItem to="/dashboard/settings" icon={Settings} label="Practice Settings" />
        <NavItem to="/dashboard/compliance" icon={Shield} label="Compliance" />
      </div>

      <div className="flex items-center gap-2 bg-[var(--sage)]/20 mx-3 mb-3 rounded-md px-2.5 py-[7px] text-[11px] text-[var(--sage-light)] font-medium">
        <svg viewBox="0 0 16 16" className="w-3 h-3 flex-shrink-0 fill-none stroke-current stroke-[1.5]">
          <path d="M8 1L2 4v4c0 3.3 2.6 6.4 6 7 3.4-.6 6-3.7 6-7V4L8 1z"/>
          <path d="M5.5 8l1.5 1.5 3-3"/>
        </svg>
        CA servers · PHIPA compliant
      </div>

      <div className="mt-auto p-3.5 border-t border-white/[0.07] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[var(--sage)] flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
          AO
        </div>
        <div>
          <div className="text-[13px] font-medium text-white/85">Dr. Abena Osei</div>
          <div className="text-[11px] text-white/35">Registered Psychotherapist</div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label, badge }: { to: string; icon: any; label: string; badge?: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-2.5 py-[9px] rounded-lg text-sm text-white/55 no-underline cursor-pointer transition-all duration-150 mb-0.5 ${
          isActive ? 'bg-[var(--sage)] text-white' : 'hover:bg-white/[0.07] hover:text-white/85'
        }`
      }
    >
      <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
      {label}
      {badge && (
        <span className="ml-auto bg-[var(--sage-light)] text-white text-[10px] px-1.5 py-0.5 rounded-lg font-medium">
          {badge}
        </span>
      )}
    </NavLink>
  );
}