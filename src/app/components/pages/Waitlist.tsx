import { useState } from 'react';
import { Search } from 'lucide-react';

type ModalType = 'add' | 'notify' | 'convert' | null;

export function Waitlist() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPerson, setSelectedPerson] = useState({ name: '', email: '' });
  const [priority, setPriorityState] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const waitlistData = [
    { initials: 'AK', name: 'Aisha Kamara', email: 'aisha.k@email.com', concern: 'Refugee trauma, PTSD', days: 31, addedDate: 'Feb 14', status: 'waiting', priority: 9, priorityLabel: 'Priority 9/10', color: '#d4e8d4', tag: 'Refugee trauma', tagColor: 'bg-[#E6F1FB] text-[#0C447C]' },
    { initials: 'PS', name: 'Priya Sharma', email: 'priya.s@email.com', concern: 'Depression, newcomer adjustment', days: 22, addedDate: 'Feb 23', status: 'waiting', priority: 8, priorityLabel: 'Priority 8/10', color: '#dde8f5', tag: 'Newcomer', tagColor: 'bg-[#E1F5EE] text-[#085041]' },
    { initials: 'MN', name: 'Marcus Nwosu', email: 'marcus.n@email.com', concern: 'Anxiety, cultural identity', days: 18, addedDate: 'Feb 27', status: 'waiting', priority: 7, priorityLabel: 'Priority 7/10', color: '#d4d4e8', tag: 'Racial stress', tagColor: 'bg-[#FAECE7] text-[#712B13]' },
    { initials: 'DC', name: 'David Chen', email: 'david.c@email.com', concern: 'Couples therapy referral', days: 15, addedDate: 'Mar 1', status: 'notified', priority: 5, priorityLabel: 'Priority 5/10', color: '#faeeda', tag: 'Couples', tagColor: 'bg-[#EEEDFE] text-[#3C3489]', notifiedDate: 'Notified Mar 14' }
  ];

  const filteredData = waitlistData.filter(person => {
    const matchesSearch = searchQuery === '' || person.name.toLowerCase().includes(searchQuery.toLowerCase()) || person.concern.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === '' || person.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openNotifyModal = (name: string, email: string) => {
    setSelectedPerson({ name, email });
    setActiveModal('notify');
  };

  const openConvertModal = (name: string) => {
    setSelectedPerson({ name, email: '' });
    setActiveModal('convert');
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-[var(--warm)]">
      {/* Topbar */}
      <div className="bg-white border-b border-[var(--border)] px-7 h-[54px] flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="font-[var(--font-display)] text-xl text-[var(--ink)]">Waitlist</div>
          <div className="text-[13px] text-[var(--ink-muted)]">4 people waiting · Average wait: 23 days</div>
        </div>
        <button onClick={() => setActiveModal('add')} className="btn-primary">
          + Add to waitlist
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-5.5">
          <div className="bg-white border border-[var(--border)] rounded-xl p-3.5">
            <div className="font-[var(--font-display)] text-[26px] text-[var(--ink)]">4</div>
            <div className="text-[12px] text-[var(--ink-muted)] mt-1">Currently waiting</div>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-xl p-3.5">
            <div className="font-[var(--font-display)] text-[26px] text-[var(--ink)]">23</div>
            <div className="text-[12px] text-[var(--ink-muted)] mt-1">Avg days waiting</div>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-xl p-3.5">
            <div className="font-[var(--font-display)] text-[26px] text-[var(--ink)]">1</div>
            <div className="text-[12px] text-[var(--ink-muted)] mt-1">Notified this week</div>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-xl p-3.5">
            <div className="font-[var(--font-display)] text-[26px] text-[var(--ink)]">8</div>
            <div className="text-[12px] text-[var(--ink-muted)] mt-1">Converted this year</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2.5 mb-4 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-[var(--bmed)] rounded-lg px-3.5 py-2 flex-1 min-w-[200px] max-w-[300px]">
            <Search className="w-[14px] h-[14px] text-[var(--ink-muted)]" />
            <input
              type="text"
              placeholder="Search waitlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none bg-transparent text-[13px] text-[var(--ink)] outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[var(--bmed)] rounded-lg text-[13px] bg-white text-[var(--ink)] outline-none cursor-pointer"
          >
            <option value="">All statuses</option>
            <option value="waiting">Waiting</option>
            <option value="notified">Notified</option>
          </select>
          <select className="px-3 py-2 border border-[var(--bmed)] rounded-lg text-[13px] bg-white text-[var(--ink)] outline-none cursor-pointer">
            <option>Sort: Priority (high first)</option>
            <option>Sort: Waiting longest</option>
            <option>Sort: Recently added</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[32px_1fr_100px_120px_90px_130px_100px] gap-0 bg-[var(--warm)] border-b border-[var(--border)] px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-[var(--ink-muted)]">
            <div></div>
            <div>Person</div>
            <div>Waiting</div>
            <div>Concern</div>
            <div>Status</div>
            <div>Priority</div>
            <div className="text-right">Actions</div>
          </div>

          {filteredData.map((person, i) => (
            <div
              key={i}
              className={`grid grid-cols-[32px_1fr_100px_120px_90px_130px_100px] gap-0 px-4 py-3.5 border-b border-[var(--border)] last:border-b-0 items-center cursor-pointer transition-colors hover:bg-[var(--warm)] ${
                person.priority >= 8 ? 'bg-[#fff8f0] border-l-[3px] border-l-[var(--amber)]' : ''
              }`}
            >
              <div
                className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-medium"
                style={{
                  background: person.priority >= 9 ? '#fde8e8' : person.priority >= 8 ? '#faeeda' : '#e8f0ed',
                  color: person.priority >= 9 ? '#791F1F' : person.priority >= 8 ? '#633806' : 'var(--sage-deep)'
                }}
              >
                {person.priority}
              </div>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[11px] font-medium"
                  style={{ background: person.color, color: 'var(--sage-deep)' }}
                >
                  {person.initials}
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[var(--ink)]">{person.name}</div>
                  <div className="text-[12px] text-[var(--ink-muted)] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {person.email} · {person.concern}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-[var(--ink)]">{person.days} days</div>
                <div className="text-[11px] text-[var(--ink-muted)]">Added {person.addedDate}</div>
              </div>
              <div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${person.tagColor}`}>{person.tag}</span>
              </div>
              <div>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    person.status === 'waiting'
                      ? 'bg-[var(--sage-pale)] text-[var(--sage-deep)]'
                      : 'bg-[#faeeda] text-[#633806]'
                  }`}
                >
                  {person.status === 'waiting' ? 'Waiting' : person.notifiedDate}
                </span>
              </div>
              <div>
                <div className="text-[12px] font-medium text-[var(--ink)]">{person.priorityLabel}</div>
                <div className="h-1 rounded bg-[var(--warm)] overflow-hidden w-[60px] mt-0.5">
                  <div
                    className="h-full"
                    style={{
                      width: `${person.priority * 10}%`,
                      background: person.priority >= 9 ? '#c0392b' : person.priority >= 7 ? '#BA7517' : '#4a7c6f'
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-1.5 justify-end">
                <button
                  onClick={() => openNotifyModal(person.name, person.email)}
                  className="px-2.5 py-1 border border-[var(--bmed)] bg-white text-[11px] font-medium rounded hover:bg-[var(--sage-pale)] hover:border-[var(--sage-light)] hover:text-[var(--sage-deep)] whitespace-nowrap"
                >
                  {person.status === 'notified' ? 'Resend' : 'Notify'}
                </button>
                <button
                  onClick={() => openConvertModal(person.name)}
                  className="px-2.5 py-1 bg-[var(--sage)] border border-[var(--sage)] text-white text-[11px] font-medium rounded hover:bg-[var(--sage-deep)] whitespace-nowrap"
                >
                  Convert →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD MODAL */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 bg-black/35 z-100 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-[540px] max-h-[85vh] overflow-y-auto">
            <div className="font-[var(--font-display)] text-xl text-[var(--ink)] mb-1.5">Add to waitlist</div>
            <div className="text-[13px] text-[var(--ink-muted)] mb-5">Person will be queued and notified when a slot opens.</div>
            
            <div className="grid grid-cols-2 gap-3 mb-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">First name *</label>
                <input type="text" placeholder="First name" className="input-field" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">Last name *</label>
                <input type="text" placeholder="Last name" className="input-field" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">Email</label>
                <input type="email" placeholder="email@example.com" className="input-field" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">Phone</label>
                <input type="tel" placeholder="(416) 555-0100" className="input-field" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">Presenting concerns</label>
                <input type="text" placeholder="Brief description of what they're seeking support for" className="input-field" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">Referral source</label>
                <select className="input-field">
                  <option>Self-referred</option>
                  <option>GP / Family doctor</option>
                  <option>Psychiatrist</option>
                  <option>Previous therapist</option>
                  <option>CAMH / hospital</option>
                  <option>Employee assistance</option>
                  <option>Online directory</option>
                  <option>Word of mouth</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">Preferred intake template</label>
                <select className="input-field">
                  <option>Standard general</option>
                  <option>Newcomer & cultural adjustment</option>
                  <option>Racialized stress</option>
                  <option>Refugee trauma</option>
                  <option>LGBTQ2S+ affirming</option>
                  <option>Youth (14-24)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">Clinical priority (1 = low, 10 = urgent)</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <button
                      key={n}
                      onClick={() => setPriorityState(n)}
                      className={`w-[32px] h-[32px] rounded-lg border-[1.5px] text-[12px] font-medium transition-all ${
                        priority === n
                          ? 'bg-[var(--sage)] border-[var(--sage)] text-white'
                          : 'border-[var(--bmed)] text-[var(--ink-muted)]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[12px] font-medium text-[var(--ink-soft)]">Notes</label>
                <textarea placeholder="Any clinical notes, scheduling preferences, etc." className="input-field resize-vertical min-h-[70px]" />
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-1">
              <button onClick={closeModal} className="btn-ghost">Cancel</button>
              <button onClick={closeModal} className="btn-primary">Add to waitlist</button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFY MODAL */}
      {activeModal === 'notify' && (
        <div className="fixed inset-0 bg-black/35 z-100 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-[540px]">
            <div className="font-[var(--font-display)] text-xl text-[var(--ink)] mb-1.5">Notify {selectedPerson.name}</div>
            <div className="text-[13px] text-[var(--ink-muted)] mb-5">Send an email letting them know a slot has opened.</div>
            
            <div className="bg-[var(--sage-pale)] rounded-lg px-4 py-3.5 mb-3.5">
              <div className="text-[13px] font-medium text-[var(--sage-deep)] mb-2">Preview email</div>
              <div className="text-[13px] text-[var(--ink-soft)] border border-[rgba(74,124,111,0.2)] rounded-lg px-2.5 py-2.5 bg-white leading-relaxed">
                Hi {selectedPerson.name.split(' ')[0]}, I'm pleased to let you know that a spot has opened in my practice. I'd love to schedule an intake appointment with you at your earliest convenience. Please reply to this email or call directly to book.<br /><br />
                Warm regards,<br />
                Dr. Abena Osei-Mensah, RP
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[12px] font-medium text-[var(--ink-soft)]">Add a personal note (optional)</label>
              <textarea placeholder="Any additional context to include..." className="input-field resize-vertical min-h-[70px]" />
            </div>

            <div className="flex gap-2 justify-end">
              <button onClick={closeModal} className="btn-ghost">Cancel</button>
              <button onClick={closeModal} className="btn-primary">Send notification</button>
            </div>
          </div>
        </div>
      )}

      {/* CONVERT MODAL */}
      {activeModal === 'convert' && (
        <div className="fixed inset-0 bg-black/35 z-100 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-[540px]">
            <div className="font-[var(--font-display)] text-xl text-[var(--ink)] mb-1.5">Convert {selectedPerson.name} to active client</div>
            <div className="text-[13px] text-[var(--ink-muted)] mb-4">
              This will create a full client profile and send a portal invite with their selected intake form.
            </div>
            
            <div className="bg-[var(--sage-pale)] rounded-lg px-4 py-3.5 text-[13px] text-[var(--sage-deep)] leading-relaxed mb-4">
              This will:<br />
              • Create a client profile from their waitlist information<br />
              • Send a portal invite with their chosen intake template<br />
              • Remove them from the waitlist and mark as converted<br />
              • Create an initial appointment placeholder
            </div>

            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[12px] font-medium text-[var(--ink-soft)]">Initial session date (optional)</label>
              <input type="date" className="input-field" />
            </div>

            <div className="flex flex-col gap-1.5 mb-3.5">
              <label className="text-[12px] font-medium text-[var(--ink-soft)]">Session format</label>
              <select className="input-field">
                <option>Video (online)</option>
                <option>In-person</option>
                <option>Phone</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end">
              <button onClick={closeModal} className="btn-ghost">Cancel</button>
              <button onClick={closeModal} className="btn-primary">Convert & send invite →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
