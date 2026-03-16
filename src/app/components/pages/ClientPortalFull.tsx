import { useState } from 'react';
import { Check, Send, FileText, Phone } from 'lucide-react';

type TabType = 'home' | 'checkin' | 'invoices' | 'messages' | 'safety';

export function ClientPortalFull() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [wellbeing, setWellbeing] = useState(7);
  const [anxiety, setAnxiety] = useState(4);
  const [sleep, setSleep] = useState(6);
  const [moods, setMoods] = useState(['Hopeful']);
  const [checkinSubmitted, setCheckinSubmitted] = useState(false);
  const [messageText, setMessageText] = useState('');

  const moodOptions = [
    'Hopeful', 'Anxious', 'Tired', 'Calm', 'Overwhelmed',
    'Motivated', 'Sad', 'Grateful', 'Frustrated', 'Disconnected'
  ];

  const toggleMood = (mood: string) => {
    setMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const submitCheckin = () => {
    setCheckinSubmitted(true);
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      // In production: call API to send message
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--warm)]">
      {/* Header */}
      <div className="bg-[var(--sage-deep)] text-white">
        <div className="flex items-center justify-between px-7 pt-5 pb-5">
          <div className="font-[var(--font-display)] text-[18px] opacity-90">MentalPath</div>
          <div className="text-[13px] text-white/60">Amara Mensah · Dr. Osei-Mensah</div>
        </div>
        <div className="flex gap-0 px-5">
          {[
            { id: 'home', label: 'Home' },
            { id: 'checkin', label: 'Check-in' },
            { id: 'invoices', label: 'Receipts' },
            { id: 'messages', label: 'Messages' },
            { id: 'safety', label: 'Safety plan' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4.5 py-2.5 text-[13px] border-none bg-transparent cursor-pointer border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white border-b-[var(--sage-light)]'
                  : 'text-white/50 border-b-transparent hover:text-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-[700px] mx-auto">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            {/* Next Appointment */}
            <div className="bg-[var(--sage-deep)] rounded-xl p-5 mb-4 text-white">
              <div className="text-[11px] font-medium uppercase tracking-wider text-white/60 mb-1.5">Next session</div>
              <div className="font-[var(--font-display)] text-[22px] mb-1">Monday, March 16 at 10:00 AM</div>
              <div className="text-[13px] text-white/70">
                Individual session · 50 minutes · Video (online) · Dr. Abena Osei-Mensah, RP
              </div>
              <div className="flex gap-2 mt-3.5">
                <button className="px-4 py-2 border border-white/25 rounded-lg text-[13px] font-medium bg-white/15 hover:bg-white/20 transition-colors">
                  Join video session
                </button>
                <button className="px-4 py-2 border border-white/25 rounded-lg text-[13px] font-medium bg-transparent hover:bg-white/10 transition-colors">
                  Reschedule
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden mb-4">
              <div className="px-4.5 py-3.5 border-b border-[var(--border)] text-[14px] font-medium text-[var(--ink)]">
                Quick actions
              </div>
              <div className="p-4.5 flex flex-col gap-2.5">
                <button
                  onClick={() => setActiveTab('checkin')}
                  className="flex items-center justify-between px-4 py-3.5 bg-[var(--warm)] border border-[var(--border)] rounded-lg text-[14px] font-medium text-[var(--ink)] hover:border-[var(--sage-light)] transition-colors"
                >
                  <span>How are you feeling this week? →</span>
                  <span className="text-[12px] text-[var(--ink-muted)]">Takes 2 minutes</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="flex items-center justify-between px-4 py-3.5 bg-[var(--warm)] border border-[var(--border)] rounded-lg text-[14px] font-medium text-[var(--ink)] hover:border-[var(--sage-light)] transition-colors"
                >
                  <span>Send Dr. Osei a message →</span>
                  <span className="text-[11px] bg-[var(--sage)] text-white px-2 py-0.5 rounded-lg">1 unread</span>
                </button>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className="flex items-center justify-between px-4 py-3.5 bg-[var(--warm)] border border-[var(--border)] rounded-lg text-[14px] font-medium text-[var(--ink)] hover:border-[var(--sage-light)] transition-colors"
                >
                  <span>Download receipts for insurance →</span>
                  <span className="text-[12px] text-[var(--ink-muted)]">14 receipts</span>
                </button>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="px-4.5 py-3.5 border-b border-[var(--border)] text-[14px] font-medium text-[var(--ink)]">
                Your progress (PHQ-9 — Depression scores)
              </div>
              <div className="p-4.5">
                <div className="flex items-end gap-2.5 h-[80px] mb-2">
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-[11px] font-medium text-[var(--ink-muted)]">10</div>
                    <div className="flex-1 w-full bg-[#FFF0C0] rounded-t" style={{ height: '70%' }}></div>
                    <div className="text-[10px] text-[var(--ink-muted)]">Session 1</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-[11px] font-medium text-[var(--ink-muted)]">7</div>
                    <div className="flex-1 w-full bg-[var(--sage-pale)] rounded-t" style={{ height: '49%' }}></div>
                    <div className="text-[10px] text-[var(--ink-muted)]">Session 5</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-[11px] font-medium text-[var(--sage-deep)]">3</div>
                    <div className="flex-1 w-full bg-[var(--sage)] rounded-t" style={{ height: '21%' }}></div>
                    <div className="text-[10px] text-[var(--ink-muted)]">Session 14</div>
                  </div>
                </div>
                <div className="text-[13px] text-[var(--sage-deep)] font-medium">
                  Score dropped from 10 (Moderate) → 3 (Minimal) ↓ 70% improvement
                </div>
              </div>
            </div>
          </>
        )}

        {/* CHECKIN TAB */}
        {activeTab === 'checkin' && (
          <>
            <div className="text-[14px] text-[var(--ink-soft)] leading-relaxed mb-5">
              A quick check-in between sessions. Your therapist can see your responses before your next appointment — it helps them understand how you've been doing since you last met.
            </div>

            {!checkinSubmitted ? (
              <>
                {/* Wellbeing Scale */}
                <div className="mb-5">
                  <div className="text-[14px] font-medium text-[var(--ink)] mb-1">Overall wellbeing this week</div>
                  <div className="text-[12px] text-[var(--ink-muted)] mb-2.5">1 = really struggling · 10 = doing well</div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <button
                        key={n}
                        onClick={() => setWellbeing(n)}
                        className={`w-9 h-9 rounded-lg border-[1.5px] text-[13px] font-medium transition-all ${
                          wellbeing === n
                            ? 'bg-[var(--sage)] border-[var(--sage)] text-white'
                            : 'border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--sage-light)]'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Anxiety Scale */}
                <div className="mb-5">
                  <div className="text-[14px] font-medium text-[var(--ink)] mb-1">Anxiety level</div>
                  <div className="text-[12px] text-[var(--ink-muted)] mb-2.5">1 = very calm · 10 = very anxious</div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <button
                        key={n}
                        onClick={() => setAnxiety(n)}
                        className={`w-9 h-9 rounded-lg border-[1.5px] text-[13px] font-medium transition-all ${
                          anxiety === n
                            ? 'bg-[var(--sage)] border-[var(--sage)] text-white'
                            : 'border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--sage-light)]'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleep Scale */}
                <div className="mb-5">
                  <div className="text-[14px] font-medium text-[var(--ink)] mb-1">Sleep quality</div>
                  <div className="text-[12px] text-[var(--ink-muted)] mb-2.5">1 = very poor · 10 = great sleep</div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <button
                        key={n}
                        onClick={() => setSleep(n)}
                        className={`w-9 h-9 rounded-lg border-[1.5px] text-[13px] font-medium transition-all ${
                          sleep === n
                            ? 'bg-[var(--sage)] border-[var(--sage)] text-white'
                            : 'border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--sage-light)]'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood Tags */}
                <div className="mb-5">
                  <div className="text-[14px] font-medium text-[var(--ink)] mb-2.5">How are you feeling today? (pick any that apply)</div>
                  <div className="flex flex-wrap gap-2">
                    {moodOptions.map(mood => (
                      <button
                        key={mood}
                        onClick={() => toggleMood(mood)}
                        className={`px-3.5 py-2 border-[1.5px] rounded-[20px] text-[13px] transition-all ${
                          moods.includes(mood)
                            ? 'bg-[var(--sage-pale)] border-[var(--sage)] text-[var(--sage-deep)]'
                            : 'border-[var(--border)] text-[var(--ink-soft)] hover:border-[var(--sage-light)]'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-5">
                  <div className="text-[14px] font-medium text-[var(--ink)] mb-1">
                    Anything you'd like your therapist to know before your next session?
                  </div>
                  <div className="text-[12px] text-[var(--ink-muted)] mb-2.5">
                    Optional — you can be as brief or as detailed as you like
                  </div>
                  <textarea
                    defaultValue="Used the journaling exercise after our last session and it actually helped a lot. I noticed I was able to name what I was feeling instead of just feeling it. I have some questions about the workplace rights resources you mentioned too."
                    className="w-full px-3 py-3 border border-[var(--bmed)] rounded-lg text-[14px] text-[var(--ink)] leading-relaxed resize-vertical min-h-[90px] outline-none focus:border-[var(--sage)]"
                  />
                </div>

                <button onClick={submitCheckin} className="submit-btn">
                  Send to Dr. Osei
                </button>
              </>
            ) : (
              <div className="text-center py-5">
                <div className="w-[52px] h-[52px] bg-[var(--sage-pale)] rounded-full flex items-center justify-center mx-auto mb-3.5">
                  <Check className="w-[22px] h-[22px] text-[var(--sage)]" strokeWidth={2} />
                </div>
                <div className="font-[var(--font-display)] text-xl text-[var(--ink)] mb-1.5">Sent to Dr. Osei</div>
                <div className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                  Your therapist will review this before your Monday session. Thank you for checking in — it really helps them prepare for you.
                </div>
              </div>
            )}
          </>
        )}

        {/* INVOICES TAB */}
        {activeTab === 'invoices' && (
          <>
            <div className="text-[13px] text-[var(--ink-muted)] mb-4 leading-relaxed">
              Download official receipts for insurance reimbursement. Each receipt includes your therapist's College registration number and can be submitted directly to your insurer.
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden mb-4">
              <div className="flex items-center justify-between px-4.5 py-3.5 border-b border-[var(--border)]">
                <div className="text-[14px] font-medium text-[var(--ink)]">Receipts — 2026</div>
                <button className="text-[12px] px-3 py-1.5 border border-[var(--bmed)] rounded-lg bg-white text-[var(--ink-soft)] hover:bg-[var(--sage-pale)]">
                  Download all 2026
                </button>
              </div>
              <div className="px-4">
                {[
                  { num: 'INV-0031', session: 14, date: 'March 10, 2026', amount: '$140.00' },
                  { num: 'INV-0028', session: 13, date: 'March 3, 2026', amount: '$140.00' },
                  { num: 'INV-0024', session: 12, date: 'Feb 24, 2026', amount: '$140.00' }
                ].map((inv, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-b-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#e8f4f0] flex items-center justify-center text-[var(--sage-deep)]">
                        <FileText className="w-[15px] h-[15px]" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-[var(--ink)]">{inv.num} · Session {inv.session}</div>
                        <div className="text-[12px] text-[var(--ink-muted)]">{inv.date} · {inv.amount}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-medium px-2 py-0.5 bg-[#e8f4f0] text-[var(--sage-deep)] rounded">Paid</span>
                      <button className="px-3 py-1.5 border border-[var(--bmed)] rounded-lg text-[12px] text-[var(--ink-soft)] hover:bg-[var(--sage-pale)]">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--sage-pale)] rounded-lg px-4 py-3.5 text-[13px] text-[var(--sage-deep)] leading-relaxed">
              Receipts include your therapist's College registration number (CRPO-004821) and can be submitted to most Canadian insurers for reimbursement. Keep copies for your tax records — you may be able to claim therapy as a medical expense.
            </div>
          </>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="bg-[var(--sage-pale)] px-4 py-2 flex items-center gap-2 text-[11px] text-[var(--sage-deep)]">
              <svg className="w-[11px] h-[11px]" viewBox="0 0 16 16" fill="none" stroke="var(--sage)" strokeWidth="1.5">
                <rect x="2" y="5" width="12" height="9" rx="1" />
                <path d="M5 5V4a3 3 0 016 0v1" />
              </svg>
              End-to-end encrypted · Stored on Canadian servers · Not SMS
            </div>
            <div className="p-4 flex flex-col gap-2.5 max-h-[340px] overflow-y-auto">
              <div className="bg-[var(--sage)] text-white px-3.5 py-2.5 rounded-xl rounded-bl-sm max-w-[80%] text-[14px] leading-relaxed">
                Hi Amara — just a reminder that we'll be continuing with the Cultural Formulation Interview on Monday. If you get a chance before our session, try the journaling exercise we discussed. See you at 10am.
                <div className="text-[11px] opacity-65 mt-1">Thu Mar 12 · 2:30 PM</div>
              </div>
              <div className="bg-white border border-[var(--border)] text-[var(--ink)] px-3.5 py-2.5 rounded-xl rounded-br-sm max-w-[80%] ml-auto text-[14px] leading-relaxed">
                Hi Dr. Osei, I did the journaling exercise and it was really helpful. I noticed a few things I want to share in today's session. I also wanted to ask — is there a resource you'd recommend for what we talked about regarding workplace rights?
                <div className="text-[11px] opacity-65 mt-1">Today 9:47 AM</div>
              </div>
              <div className="bg-white border border-[var(--border)] text-[var(--ink)] px-3.5 py-2.5 rounded-xl rounded-br-sm max-w-[80%] ml-auto text-[14px] leading-relaxed">
                Also confirming I'll be there at 10 for our session today. Thank you!
                <div className="text-[11px] opacity-65 mt-1">Today 9:48 AM</div>
              </div>
            </div>
            <div className="flex gap-2 px-3.5 py-3.5 border-t border-[var(--border)] items-end">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write a secure message to Dr. Osei..."
                className="flex-1 px-3 py-2.5 border border-[var(--bmed)] rounded-lg text-[14px] outline-none focus:border-[var(--sage)] resize-none min-h-[44px]"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2.5 bg-[var(--sage)] text-white rounded-lg text-[13px] font-medium h-[44px] flex items-center gap-1.5 hover:bg-[var(--sage-deep)]"
              >
                <Send className="w-[13px] h-[13px]" />
                Send
              </button>
            </div>
          </div>
        )}

        {/* SAFETY PLAN TAB */}
        {activeTab === 'safety' && (
          <>
            <div className="bg-[#fde8e8] border border-[#f09595] rounded-lg px-4 py-3.5 text-[14px] text-[#791F1F] font-medium mb-4 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
              If you are in immediate danger, call 911 now.
            </div>

            <div className="text-[13px] text-[var(--ink-muted)] mb-4">
              Your safety plan was created with Dr. Osei on March 10, 2026. Keep this page bookmarked — it's always available when you need it.
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden mb-4">
              <div className="px-4.5 py-3.5 border-b border-[var(--border)] text-[14px] font-medium text-[var(--ink)]">
                My warning signs
              </div>
              <div className="p-4.5">
                {[
                  'Withdrawing from friends and family',
                  'Stopping activities I enjoy',
                  'Racing thoughts at night that won\'t stop',
                  'Feeling like a burden to the people I love'
                ].map((sign, i) => (
                  <div key={i} className="py-3 border-b border-[var(--border)] last:border-b-0">
                    <div className="text-[14px] text-[var(--ink-soft)] leading-relaxed">{sign}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden mb-4">
              <div className="px-4.5 py-3.5 border-b border-[var(--border)] text-[14px] font-medium text-[var(--ink)]">
                Things I can do on my own
              </div>
              <div className="p-4.5">
                {[
                  '5-4-3-2-1 grounding exercise (5 things I see, 4 I hear...)',
                  'Box breathing — breathe in 4, hold 4, out 4, hold 4',
                  'Go for a walk outside, even just 10 minutes',
                  'Write in my journal — just start with "right now I feel..."'
                ].map((strategy, i) => (
                  <div key={i} className="py-3 border-b border-[var(--border)] last:border-b-0">
                    <div className="text-[14px] text-[var(--ink-soft)] leading-relaxed">{strategy}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden mb-4">
              <div className="px-4.5 py-3.5 border-b border-[var(--border)] text-[14px] font-medium text-[var(--ink)]">
                People I can reach out to
              </div>
              <div className="p-4.5">
                <div className="py-3 border-b border-[var(--border)]">
                  <div className="text-[14px] text-[var(--ink-soft)]">
                    <strong>Sister — Abena</strong> · (416) 555-0122
                  </div>
                </div>
                <div className="py-3">
                  <div className="text-[14px] text-[var(--ink-soft)]">
                    <strong>Friend — Yaa</strong> · (647) 555-0189
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="px-4.5 py-3.5 border-b border-[var(--border)] text-[14px] font-medium text-[var(--ink)]">
                Crisis lines — available 24/7
              </div>
              <div className="p-2.5">
                {[
                  { name: 'Crisis Services Canada', phone: '1-833-456-4566', tel: '18334564566' },
                  { name: 'Kids Help Phone', phone: '1-800-668-6868 · Text: 686868', tel: '18006686868' },
                  { name: 'Emergency services', phone: '911', tel: '911' }
                ].map((crisis, i) => (
                  <a
                    key={i}
                    href={`tel:${crisis.tel}`}
                    className="flex items-center gap-2.5 w-full px-3.5 py-3 border border-[var(--bmed)] rounded-lg mb-2 last:mb-0 bg-white hover:bg-[var(--warm)] transition-colors"
                  >
                    <Phone className="w-[18px] h-[18px] text-[var(--red)]" />
                    <div>
                      <div className="text-[14px] font-medium text-[var(--ink)]">{crisis.name}</div>
                      <div className="text-[13px] text-[#185FA5]">{crisis.phone}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
