import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

type Tab = 'prep' | 'noshow';

interface SessionData {
  name: string;
  initials: string;
  color: string;
  textColor: string;
  meta: string;
  key: string;
  time: string;
  badge: 'ready' | 'none' | 'intake';
}

const sessionBriefs: Record<string, { left: string; watch: string; focus: string }> = {
  sadia: {
    left: 'Last session focused on safety and stability — housing stabilised, first full night of sleep in three weeks reported. Emotional tone was cautiously hopeful with continued hypervigilance.',
    watch: 'Dissociative episodes triggered by home-country news. Sessions 7 and 8 both required mid-session grounding. Sleep is the most reliable wellbeing indicator.',
    focus: 'Continue trauma-stabilisation phase. Resist moving to processing until sleep and safety are consistent for 3+ sessions. Consider introducing Window of Tolerance psychoeducation.'
  },
  amara: {
    left: 'Explored workplace microaggression incident from the previous week using the anti-racism framework. Client demonstrated strong externalization skills and showed reduced self-blame compared to early sessions.',
    watch: 'Treatment plan 3-month review is due today. PHQ-9 has moved from 10 (moderate) to 3 (minimal). Client reports increased confidence at work — watch for premature closure impulse.',
    focus: 'Conduct formal treatment plan review. Celebrate measurable progress explicitly. Begin discussion of maintenance strategies and discharge planning if criteria are met.'
  },
  jamal: {
    left: 'Penultimate session before planned discharge. Client articulated a coherent professional identity narrative — significant shift from intake presentation. Reviewed all three treatment goals.',
    watch: 'Discharge is planned for today. Monitor for late-emerging ambivalence about ending treatment. The therapeutic alliance has been strong — separation process may surface.',
    focus: 'Formal discharge session. Confirm all discharge criteria met. Review safety plan. Discuss return-to-treatment indicators. Offer 3-month follow-up contact.'
  }
};

export function SessionPrep() {
  const [activeTab, setActiveTab] = useState<Tab>('prep');
  const [selectedSession, setSelectedSession] = useState<string>('sadia');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const sessions: SessionData[] = [
    { time: '9:00', name: 'Sadia Mohamoud', initials: 'SM', color: '#d4e8d4', textColor: '#1a5a1a', meta: 'Session 9 · Individual · 50min', key: 'sadia', badge: 'ready' },
    { time: '10:00', name: 'Amara Mensah', initials: 'AM', color: '#d4e8e4', textColor: 'var(--sage-deep)', meta: 'Session 15 · Individual �� 50min', key: 'amara', badge: 'ready' },
    { time: '11:30', name: 'Jamal Lee', initials: 'JL', color: '#faeeda', textColor: '#633806', meta: 'Session 23 · Individual · 50min', key: 'jamal', badge: 'ready' },
    { time: '2:00', name: 'Priya & Chetan C.', initials: 'PC', color: '#EEEDFE', textColor: '#26215C', meta: 'Couples · Session 4 · 80min', key: 'couples', badge: 'ready' },
    { time: '3:30', name: 'Riya Bhatt', initials: 'RB', color: '#d4d4e8', textColor: '#303070', meta: 'Session 3 · Individual · 50min', key: 'riya', badge: 'none' },
    { time: '5:00', name: 'Marcus Nwosu', initials: 'MN', color: '#dde8f5', textColor: '#0C447C', meta: 'Session 1 (intake) · 50min', key: 'intake', badge: 'intake' }
  ];

  const currentSession = sessions.find(s => s.key === selectedSession) || sessions[0];
  const brief = sessionBriefs[selectedSession];

  const regeneratePrep = () => {
    setIsRegenerating(true);
    setTimeout(() => setIsRegenerating(false), 1200);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="bg-[var(--ink)] flex gap-0 px-5">
        <TabButton active={activeTab === 'prep'} onClick={() => setActiveTab('prep')}>
          Session prep AI
        </TabButton>
        <TabButton active={activeTab === 'noshow'} onClick={() => setActiveTab('noshow')}>
          No-show tracker
        </TabButton>
      </div>

      {/* SESSION PREP */}
      {activeTab === 'prep' && (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4.5">
            <div>
              <h1 className="font-[var(--font-display)] text-xl text-[var(--ink)]">Today's sessions — Monday March 16</h1>
              <p className="text-[13px] text-[var(--ink-muted)] mt-0.5">
                6 sessions · AI prep ready for 3 clients with prior notes
              </p>
            </div>
            <button className="btn-primary">Prep all sessions</button>
          </div>

          <div className="grid grid-cols-[1fr_340px] gap-5">
            {/* Schedule */}
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)]">
                <div className="font-[var(--font-display)] text-[18px] text-[var(--ink)]">Schedule</div>
                <div className="text-[13px] text-[var(--ink-muted)]">Mon March 16, 2026</div>
              </div>
              {sessions.map((session, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedSession(session.key)}
                  className={`flex items-center gap-3.5 px-5 py-4 border-b border-[var(--border)] last:border-b-0 cursor-pointer transition-all relative ${
                    selectedSession === session.key ? 'bg-[var(--sage-pale)] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[var(--sage)]' : 'hover:bg-[var(--warm)]'
                  }`}
                >
                  <div className="text-[13px] font-medium text-[var(--ink-muted)] min-w-[56px] pt-px">{session.time}</div>
                  <div
                    className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[11px] font-medium"
                    style={{ background: session.color, color: session.textColor }}
                  >
                    {session.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-[var(--ink)] mb-0.5">{session.name}</div>
                    <div className="text-[12px] text-[var(--ink-muted)]">{session.meta}</div>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    {session.badge === 'ready' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--sage-pale)] text-[var(--sage-deep)] rounded text-[11px] font-medium">
                        ✦ Prep ready
                      </span>
                    )}
                    {session.badge === 'none' && (
                      <span className="px-2.5 py-1 bg-[var(--warm)] text-[var(--ink-muted)] rounded text-[11px] font-medium">
                        No prior notes
                      </span>
                    )}
                    {session.badge === 'intake' && (
                      <span className="px-2.5 py-1 bg-[var(--warm)] text-[var(--ink-muted)] rounded text-[11px] font-medium">
                        Intake session
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Prep Panel */}
            <div className="flex flex-col gap-3.5 sticky top-4">
              <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-[var(--border)]">
                  <div
                    className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[11px] font-medium"
                    style={{ background: currentSession.color, color: currentSession.textColor }}
                  >
                    {currentSession.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[var(--ink)]">{currentSession.name}</div>
                    <div className="text-[11px] text-[var(--ink-muted)]">{currentSession.meta}</div>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-3">
                  {isRegenerating ? (
                    <div className="space-y-2">
                      <div className="h-3 bg-[var(--warm)] rounded animate-pulse w-4/5"></div>
                      <div className="h-3 bg-[var(--warm)] rounded animate-pulse w-full"></div>
                      <div className="h-3 bg-[var(--warm)] rounded animate-pulse w-3/5"></div>
                    </div>
                  ) : brief ? (
                    <>
                      <div className="p-3 rounded-lg bg-[var(--warm)]">
                        <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--sage)] mb-1.5">
                          Where we left off
                        </div>
                        <div className="text-[13px] text-[var(--ink-soft)] leading-relaxed">{brief.left}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--warm)]">
                        <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--sage)] mb-1.5">
                          Patterns to watch
                        </div>
                        <div className="text-[13px] text-[var(--ink-soft)] leading-relaxed">{brief.watch}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--warm)]">
                        <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--sage)] mb-1.5">
                          Suggested focus today
                        </div>
                        <div className="text-[13px] text-[var(--ink-soft)] leading-relaxed">{brief.focus}</div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[var(--ink-muted)] px-0.5">
                        <svg className="w-[11px] h-[11px]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6" />
                          <path d="M8 5v3l2 2" />
                        </svg>
                        Generated by session-prep edge function · 3 locked notes analysed
                      </div>
                    </>
                  ) : (
                    <div className="py-5 text-center text-[13px] text-[var(--ink-muted)]">
                      No session notes available — this is a new client.
                    </div>
                  )}
                </div>

                <div className="flex gap-1.5 px-3.5 py-2.5 border-t border-[var(--border)]">
                  <button className="flex-1 px-2 py-1.5 border border-[var(--bmed)] rounded-lg bg-white text-[11px] font-medium text-[var(--ink-soft)] hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)] transition-colors">
                    Open note
                  </button>
                  <button className="flex-1 px-2 py-1.5 border border-[var(--bmed)] rounded-lg bg-white text-[11px] font-medium text-[var(--ink-soft)] hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)] transition-colors">
                    View intake
                  </button>
                  <button className="flex-1 px-2 py-1.5 border border-[var(--bmed)] rounded-lg bg-white text-[11px] font-medium text-[var(--ink-soft)] hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)] transition-colors">
                    Outcomes
                  </button>
                  <button
                    onClick={regeneratePrep}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--bmed)] rounded-lg bg-white text-[11px] font-medium text-[var(--ink-soft)] hover:bg-[var(--sage-pale)] transition-colors"
                  >
                    <RefreshCw className="w-[11px] h-[11px]" />
                    Regen
                  </button>
                </div>
              </div>

              {/* Quick Reminders */}
              <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="px-4 py-3.5 border-b border-[var(--border)] text-[13px] font-medium text-[var(--ink)]">
                  Quick reminders
                </div>
                <div className="p-4 flex flex-col gap-2 text-[13px] text-[var(--ink-soft)]">
                  <div className="flex gap-2 items-start">
                    <span className="text-[11px] bg-[#faeeda] text-[#633806] px-2 py-0.5 rounded flex-shrink-0 mt-0.5">10am</span>
                    <span>Amara — Treatment plan review due this session (3-month mark)</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-[11px] bg-[#fde8e8] text-[#791F1F] px-2 py-0.5 rounded flex-shrink-0 mt-0.5">11:30am</span>
                    <span>Jamal — Last session before planned discharge. Confirm discharge criteria met.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-[11px] bg-[var(--sage-pale)] text-[var(--sage-deep)] px-2 py-0.5 rounded flex-shrink-0 mt-0.5">5:00pm</span>
                    <span>Marcus Nwosu — New intake. Racialized stress template sent. Review intake form before session.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NO-SHOW TRACKER */}
      {activeTab === 'noshow' && (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4.5">
            <div>
              <h1 className="font-[var(--font-display)] text-xl text-[var(--ink)]">No-show & cancellation tracker</h1>
              <p className="text-[13px] text-[var(--ink-muted)] mt-0.5">
                Practice no-show rate: 5% · Down from 18% before automated reminders
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-5.5">
            <div className="bg-white border border-[var(--border)] rounded-xl p-3.5">
              <div className="font-[var(--font-display)] text-[26px] text-[var(--ink)]">5%</div>
              <div className="text-[12px] text-[var(--ink-muted)] mt-1">Current no-show rate</div>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-3.5">
              <div className="font-[var(--font-display)] text-[26px] text-[var(--green)]">↓ 13%</div>
              <div className="text-[12px] text-[var(--ink-muted)] mt-1">Reduction since reminders</div>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-3.5">
              <div className="font-[var(--font-display)] text-[26px] text-[var(--ink)]">2</div>
              <div className="text-[12px] text-[var(--ink-muted)] mt-1">Clients flagged (3+ pattern)</div>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-3.5">
              <div className="font-[var(--font-display)] text-[26px] text-[var(--ink)]">$280</div>
              <div className="text-[12px] text-[var(--ink-muted)] mt-1">Revenue at risk this month</div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_90px_80px_80px_90px_120px] gap-0 bg-[var(--warm)] border-b border-[var(--border)] px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-[var(--ink-muted)]">
              <div>Client</div>
              <div>No-shows</div>
              <div>Late cancel</div>
              <div>Rate</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Flagged rows */}
            <div className="grid grid-cols-[1fr_90px_80px_80px_90px_120px] gap-0 px-4 py-3.5 border-b border-[var(--border)] items-center bg-[#fff8f0] border-l-[3px] border-l-[var(--amber)]">
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full bg-[#d4d4e8] text-[#303070] flex items-center justify-center text-[10px] font-medium">RB</div>
                <div>
                  <div className="text-[14px] font-medium text-[var(--ink)]">Riya Bhatt</div>
                  <div className="text-[11px] text-[var(--amber)]">3 consecutive no-shows</div>
                </div>
              </div>
              <div>
                <div className="text-[14px] font-medium text-[var(--red)]">3</div>
                <div className="h-1 rounded bg-[var(--warm)] overflow-hidden w-[50px] mt-0.5">
                  <div className="h-full bg-[var(--red)] w-[75%]"></div>
                </div>
              </div>
              <div className="text-[13px] text-[var(--ink-soft)]">1</div>
              <div><span className="px-2 py-0.5 bg-[#fde8e8] text-[#791F1F] rounded text-[11px] font-medium">High</span></div>
              <div><span className="text-[12px] text-[var(--amber)] font-medium">⚠ Follow up</span></div>
              <div className="flex gap-1.5 justify-end">
                <button className="px-2.5 py-1 border border-[var(--bmed)] bg-white text-[11px] font-medium rounded hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)]">
                  Contact
                </button>
                <button className="px-2.5 py-1 border border-[#f09595] bg-[#fde8e8] text-[var(--red)] text-[11px] font-medium rounded">
                  Invoice
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_90px_80px_80px_90px_120px] gap-0 px-4 py-3.5 border-b border-[var(--border)] items-center bg-[#fff8f0] border-l-[3px] border-l-[var(--amber)]">
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full bg-[#EEEDFE] text-[#26215C] flex items-center justify-center text-[10px] font-medium">PC</div>
                <div>
                  <div className="text-[14px] font-medium text-[var(--ink)]">Priya & Chetan Chadha</div>
                  <div className="text-[11px] text-[var(--amber)]">Pattern: Monday AM no-shows</div>
                </div>
              </div>
              <div>
                <div className="text-[14px] font-medium text-[var(--amber)]">3</div>
                <div className="h-1 rounded bg-[var(--warm)] overflow-hidden w-[50px] mt-0.5">
                  <div className="h-full bg-[var(--amber)] w-[60%]"></div>
                </div>
              </div>
              <div className="text-[13px] text-[var(--ink-soft)]">2</div>
              <div><span className="px-2 py-0.5 bg-[#faeeda] text-[#633806] rounded text-[11px] font-medium">Moderate</span></div>
              <div><span className="text-[12px] text-[var(--amber)] font-medium">⚠ Pattern detected</span></div>
              <div className="flex gap-1.5 justify-end">
                <button className="px-2.5 py-1 border border-[var(--bmed)] bg-white text-[11px] font-medium rounded hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)]">
                  Contact
                </button>
                <button className="px-2.5 py-1 border border-[#f09595] bg-[#fde8e8] text-[var(--red)] text-[11px] font-medium rounded">
                  Invoice
                </button>
              </div>
            </div>

            {/* Good standing */}
            {[
              { initials: 'AM', name: 'Amara Mensah', noShows: 1, lateCancels: 0, status: 'Low', message: 'Good standing', color: '#d4e8e4' },
              { initials: 'JL', name: 'Jamal Lee', noShows: 0, lateCancels: 1, status: 'Excellent', message: 'Perfect attendance', color: '#faeeda' },
              { initials: 'SM', name: 'Sadia Mohamoud', noShows: 0, lateCancels: 1, status: 'Excellent', message: 'Good standing', color: '#d4e8d4' }
            ].map((client, i) => (
              <div key={i} className="grid grid-cols-[1fr_90px_80px_80px_90px_120px] gap-0 px-4 py-3.5 border-b border-[var(--border)] last:border-b-0 items-center hover:bg-[var(--warm)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[10px] font-medium" style={{ background: client.color, color: 'var(--sage-deep)' }}>
                    {client.initials}
                  </div>
                  <div className="text-[14px] font-medium text-[var(--ink)]">{client.name}</div>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[var(--ink)]">{client.noShows}</div>
                  <div className="h-1 rounded bg-[var(--warm)] overflow-hidden w-[50px] mt-0.5">
                    <div className="h-full bg-[var(--sage)]" style={{ width: `${client.noShows * 10}%` }}></div>
                  </div>
                </div>
                <div className="text-[13px] text-[var(--ink-soft)]">{client.lateCancels}</div>
                <div><span className="px-2 py-0.5 bg-[#e8f4f0] text-[var(--sage-deep)] rounded text-[11px] font-medium">{client.status}</span></div>
                <div><span className="text-[12px] text-[var(--green)] font-medium">{client.message}</span></div>
                <div className="flex justify-end">
                  <button className="px-2.5 py-1 border border-[var(--bmed)] bg-white text-[11px] font-medium rounded hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)]">
                    View history
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Info banner */}
          <div className="bg-[var(--sage-pale)] rounded-lg px-4 py-3 flex gap-2.5 items-start text-[13px] text-[var(--sage-deep)] leading-relaxed mt-4">
            <svg className="w-[15px] h-[15px] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <div>
              Late-cancel fee auto-invoicing is <strong>off</strong>. Enable it in Practice Settings → Billing to automatically create a
              late-cancel invoice when a session is marked as no-show or cancelled within 24 hours.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4.5 py-3.5 text-[13px] border-none bg-transparent cursor-pointer border-b-2 transition-all ${
        active
          ? 'text-white border-b-[var(--sage-light)]'
          : 'text-white/50 border-b-transparent hover:text-white/80'
      }`}
    >
      {children}
    </button>
  );
}
