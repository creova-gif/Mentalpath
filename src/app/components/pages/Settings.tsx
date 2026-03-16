import { useState } from 'react';
import { User, Briefcase, Calendar, DollarSign, Globe, Bell, Lock, Trash2, Save, Check } from 'lucide-react';

type SettingsTab = 'profile' | 'practice' | 'scheduling' | 'billing' | 'regions' | 'notifications' | 'security' | 'danger';

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [saved, setSaved] = useState(false);
  
  const [bookingSlug, setBookingSlug] = useState('dr-osei');
  const [workingDays, setWorkingDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [sessionRate, setSessionRate] = useState('140');
  const [currency, setCurrency] = useState('CAD');
  const [timezone, setTimezone] = useState('America/Toronto');
  
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleDay = (day: string) => {
    setWorkingDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex flex-col">
      {/* Top Bar */}
      <div className="h-[52px] bg-white border-b border-[var(--border)] flex items-center justify-between px-7 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <h1 className="font-[var(--font-display)] text-lg text-[var(--ink)]">Practice Settings</h1>
        </div>
        <div className="flex items-center gap-2.5">
          {saved && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--green)]">
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              Saved successfully
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4.5 py-2 bg-[var(--sage)] text-white border-none rounded-lg text-[13px] font-medium cursor-pointer transition-colors hover:bg-[var(--sage-deep)]"
          >
            <Save className="w-3.5 h-3.5" />
            Save changes
          </button>
        </div>
      </div>

      <div className="flex gap-6 p-7">
        {/* Sidebar Nav */}
        <div className="w-[200px] flex-shrink-0">
          <div className="sticky top-[76px] space-y-1">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'practice', label: 'Practice Info', icon: Briefcase },
              { id: 'scheduling', label: 'Scheduling', icon: Calendar },
              { id: 'billing', label: 'Billing', icon: DollarSign },
              { id: 'regions', label: 'Region / Language', icon: Globe },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'danger', label: 'Danger Zone', icon: Trash2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 text-[13px] text-left rounded-lg border-none transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--sage)] text-white'
                    : 'bg-transparent text-[var(--ink-soft)] hover:bg-[var(--warm)]'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4.5">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <>
              <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="px-5.5 py-4 border-b border-[var(--border)] flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-lg bg-[var(--sage-pale)] text-[var(--sage)] flex items-center justify-center">
                    <User className="w-[17px] h-[17px]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--ink)]">Your Profile</div>
                    <div className="text-xs text-[var(--ink-muted)] mt-0.5">This information appears on invoices and receipts</div>
                  </div>
                </div>

                <div className="p-5.5">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-[60px] h-[60px] rounded-full bg-[var(--sage)] flex items-center justify-center font-[var(--font-display)] text-xl text-white flex-shrink-0">
                      AO
                    </div>
                    <div>
                      <div className="text-[13px] text-[var(--ink-muted)] leading-relaxed mb-1.5">
                        Upload a profile photo (optional)
                      </div>
                      <button className="inline-block px-3.5 py-1.5 border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--ink-soft)] cursor-pointer transition-colors hover:bg-[var(--warm)]">
                        Upload photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">First name</label>
                      <input
                        type="text"
                        defaultValue="Abena"
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Last name</label>
                      <input
                        type="text"
                        defaultValue="Osei-Mensah"
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                      />
                    </div>
                  </div>

                  <div className="mb-3.5">
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Email address</label>
                    <input
                      type="email"
                      defaultValue="abena.osei@example.ca"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Phone number</label>
                      <input
                        type="tel"
                        defaultValue="+1 (416) 555-0123"
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Preferred pronouns</label>
                      <input
                        type="text"
                        defaultValue="she/her"
                        placeholder="e.g. she/her, they/them"
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Practice Info Tab */}
          {activeTab === 'practice' && (
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="px-5.5 py-4 border-b border-[var(--border)] flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-lg bg-[var(--sage-pale)] text-[var(--sage)] flex items-center justify-center">
                  <Briefcase className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--ink)]">Practice Information</div>
                  <div className="text-xs text-[var(--ink-muted)] mt-0.5">Professional credentials and registration</div>
                </div>
              </div>

              <div className="p-5.5 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Practice / clinic name</label>
                  <input
                    type="text"
                    defaultValue="Osei Psychotherapy & Wellness"
                    placeholder="Leave blank to use your full name"
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Credentials</label>
                    <input
                      type="text"
                      defaultValue="RP, PhD"
                      placeholder="e.g. RP, MSW, PhD"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Registration number</label>
                    <input
                      type="text"
                      defaultValue="CRPO-004821"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Regulatory college / state board</label>
                  <select
                    defaultValue="CRPO"
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                  >
                    <optgroup label="Canadian Colleges">
                      <option value="CRPO">CRPO (Ontario)</option>
                      <option value="OCSWSSW">OCSWSSW (Ontario)</option>
                      <option value="CPO">CPO (Ontario)</option>
                      <option value="CPSBC">CPSBC (British Columbia)</option>
                      <option value="CCPA">CCPA (National)</option>
                      <option value="OPQ">OPQ (Quebec)</option>
                    </optgroup>
                    <optgroup label="US State Boards">
                      <option value="CA-BBS">California BBS</option>
                      <option value="NY-OP">New York OP</option>
                      <option value="TX-BHEC">Texas BHEC</option>
                      <option value="FL-DOH">Florida DOH</option>
                    </optgroup>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Province / State</label>
                    <select
                      defaultValue="ON"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                    >
                      <optgroup label="Canadian Provinces">
                        <option value="ON">Ontario</option>
                        <option value="BC">British Columbia</option>
                        <option value="AB">Alberta</option>
                        <option value="QC">Quebec</option>
                        <option value="MB">Manitoba</option>
                        <option value="SK">Saskatchewan</option>
                      </optgroup>
                      <optgroup label="US States">
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">NPI Number (US only)</label>
                    <input
                      type="text"
                      placeholder="1234567890"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)] focus:shadow-[0_0_0_3px_rgba(74,124,111,0.09)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scheduling Tab */}
          {activeTab === 'scheduling' && (
            <div className="space-y-4.5">
              <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="px-5.5 py-4 border-b border-[var(--border)] flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-lg bg-[var(--sage-pale)] text-[var(--sage)] flex items-center justify-center">
                    <Calendar className="w-[17px] h-[17px]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--ink)]">Online Booking</div>
                    <div className="text-xs text-[var(--ink-muted)] mt-0.5">Share your booking link with clients</div>
                  </div>
                </div>

                <div className="p-5.5 space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Your booking URL</label>
                    <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden max-w-[480px]">
                      <div className="px-3 py-2.5 bg-[var(--warm)] border-r border-[var(--border)] text-xs text-[var(--ink-muted)] whitespace-nowrap">
                        mentalpath.ca/book/
                      </div>
                      <input
                        type="text"
                        value={bookingSlug}
                        onChange={(e) => setBookingSlug(e.target.value)}
                        className="flex-1 px-3 py-2.5 border-none bg-transparent text-[13px] text-[var(--ink)] outline-none"
                      />
                      <button className="px-3.5 py-2.5 border-l border-[var(--border)] bg-transparent text-[var(--sage)] text-xs font-medium cursor-pointer transition-colors hover:bg-[var(--sage-pale)]">
                        Copy link
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-2">Working days</label>
                    <div className="flex gap-1.5">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          className={`w-9 h-9 rounded-lg border-[1.5px] text-xs font-medium cursor-pointer transition-all ${
                            workingDays.includes(day)
                              ? 'bg-[var(--sage)] border-[var(--sage)] text-white'
                              : 'bg-white border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--sage-light)]'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Start time</label>
                      <select className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]">
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">End time</label>
                      <select className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]">
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="px-5.5 py-4 border-b border-[var(--border)] flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-lg bg-[var(--sage-pale)] text-[var(--sage)] flex items-center justify-center">
                  <DollarSign className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--ink)]">Billing & Payments</div>
                  <div className="text-xs text-[var(--ink-muted)] mt-0.5">Default rates and payment settings</div>
                </div>
              </div>

              <div className="p-5.5 space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Default session rate</label>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[var(--ink-muted)]">{currency === 'CAD' ? 'C$' : '$'}</span>
                      <input
                        type="number"
                        value={sessionRate}
                        onChange={(e) => setSessionRate(e.target.value)}
                        className="flex-1 px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]"
                    >
                      <option value="CAD">CAD (C$) - Canadian Dollar</option>
                      <option value="USD">USD ($) - US Dollar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[13px] text-[var(--ink-soft)] cursor-pointer py-0.5">
                    <input type="checkbox" className="w-4 h-4 accent-[var(--sage)] cursor-pointer" />
                    HST/GST registered (Canadian practitioners)
                  </label>
                  <div className="text-xs text-[var(--ink-muted)] ml-6 mt-1">
                    If registered, HST/GST will be added to invoices
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[13px] text-[var(--ink-soft)] cursor-pointer py-0.5">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--sage)] cursor-pointer" />
                    Accept online payments (Stripe)
                  </label>
                  <div className="text-xs text-[var(--ink-muted)] ml-6 mt-1">
                    Clients can pay invoices via credit card
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Region/Language Tab */}
          {activeTab === 'regions' && (
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="px-5.5 py-4 border-b border-[var(--border)] flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-lg bg-[var(--sage-pale)] text-[var(--sage)] flex items-center justify-center">
                  <Globe className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--ink)]">Region & Language</div>
                  <div className="text-xs text-[var(--ink-muted)] mt-0.5">Timezone and language preferences</div>
                </div>
              </div>

              <div className="p-5.5 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]"
                  >
                    <optgroup label="Canadian Timezones">
                      <option value="America/Toronto">Eastern Time (Toronto)</option>
                      <option value="America/Winnipeg">Central Time (Winnipeg)</option>
                      <option value="America/Edmonton">Mountain Time (Edmonton)</option>
                      <option value="America/Vancouver">Pacific Time (Vancouver)</option>
                    </optgroup>
                    <optgroup label="US Timezones">
                      <option value="America/New_York">Eastern Time (New York)</option>
                      <option value="America/Chicago">Central Time (Chicago)</option>
                      <option value="America/Denver">Mountain Time (Denver)</option>
                      <option value="America/Los_Angeles">Pacific Time (Los Angeles)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Date format</label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]">
                    <option>YYYY-MM-DD (2026-03-16)</option>
                    <option>MM/DD/YYYY (03/16/2026)</option>
                    <option>DD/MM/YYYY (16/03/2026)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5">Interface language</label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]">
                    <option>English</option>
                    <option>Français (French)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="px-5.5 py-4 border-b border-[var(--border)] flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-lg bg-[var(--sage-pale)] text-[var(--sage)] flex items-center justify-center">
                  <Bell className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--ink)]">Email Notifications</div>
                  <div className="text-xs text-[var(--ink-muted)] mt-0.5">Choose which emails you receive</div>
                </div>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {[
                  { label: 'New client bookings', hint: 'When a client books an appointment' },
                  { label: 'Session reminders', hint: '24 hours before each session' },
                  { label: 'Payment received', hint: 'When an invoice is paid' },
                  { label: 'Weekly summary', hint: 'Overview of your week every Monday' },
                  { label: 'College renewal reminders', hint: '60 days before renewal deadlines' },
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-6 px-5.5 py-3.5">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--ink)] mb-0.5">{notif.label}</div>
                      <div className="text-xs text-[var(--ink-muted)] leading-normal">{notif.hint}</div>
                    </div>
                    <div className="relative w-10 h-[22px] flex-shrink-0">
                      <input type="checkbox" defaultChecked className="peer sr-only" id={`notif-${idx}`} />
                      <label
                        htmlFor={`notif-${idx}`}
                        className="absolute inset-0 rounded-full bg-[rgba(0,0,0,0.15)] cursor-pointer transition-colors peer-checked:bg-[var(--sage)]"
                      />
                      <div className="absolute w-4 h-4 bg-white rounded-full top-[3px] left-[3px] transition-transform peer-checked:translate-x-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.15)] pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="px-5.5 py-4 border-b border-[var(--border)] flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-lg bg-[var(--sage-pale)] text-[var(--sage)] flex items-center justify-center">
                  <Lock className="w-[17px] h-[17px]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--ink)]">Security</div>
                  <div className="text-xs text-[var(--ink-muted)] mt-0.5">Password and session management</div>
                </div>
              </div>

              <div className="p-5.5 space-y-4">
                <div>
                  <div className="text-sm font-medium text-[var(--ink)] mb-3">Change password</div>
                  <div className="space-y-2.5">
                    <input
                      type="password"
                      placeholder="Current password"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]"
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-[13px] outline-none focus:border-[var(--sage)]"
                    />
                  </div>
                  <button className="mt-3 px-4 py-2 rounded-lg bg-[var(--sage)] text-white text-[13px] font-medium border-none cursor-pointer transition-colors hover:bg-[var(--sage-deep)]">
                    Update password
                  </button>
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <label className="flex items-center gap-2 text-[13px] text-[var(--ink-soft)] cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--sage)] cursor-pointer" />
                    Auto-lock after 15 minutes of inactivity
                  </label>
                  <div className="text-xs text-[var(--ink-muted)] ml-6 mt-1">
                    Required for PHIPA/HIPAA compliance
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone Tab */}
          {activeTab === 'danger' && (
            <div className="bg-white border border-[#f09595] rounded-xl p-5.5">
              <div className="text-sm font-medium text-[var(--red)] mb-1.5">Delete account</div>
              <div className="text-[13px] text-[var(--ink-muted)] mb-3.5 leading-relaxed max-w-[500px]">
                Once you delete your account, there is no going back. This will permanently delete your client records, session notes, and all associated data. This action cannot be undone.
              </div>
              <div className="flex gap-2.5">
                <button className="px-4 py-2 rounded-lg border border-[#f09595] bg-white text-[var(--red)] text-[13px] font-medium cursor-pointer transition-colors hover:bg-[#fde8e8]">
                  Delete my account
                </button>
                <button className="px-4 py-2 rounded-lg bg-transparent text-[var(--ink-soft)] text-[13px] border border-[var(--border)] cursor-pointer transition-colors hover:bg-[var(--warm)]">
                  Export my data first
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
