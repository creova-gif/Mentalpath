import { useState } from 'react';
import { Search, Sparkles, Plus, X } from 'lucide-react';

const templates = [
  {
    id: 1,
    category: 'newcomer',
    name: 'Newcomer Immigration Stress Intake',
    description: 'Culturally-adapted for recent immigrants navigating settlement, acculturation stress, and displacement.',
    language: 'EN, FR, AR, ZH',
    categoryLabel: 'Newcomer',
    categoryColor: 'bg-[#E1F5EE] text-[#085041]',
    dotColor: 'bg-[#1D9E75]',
  },
  {
    id: 2,
    category: 'racism',
    name: 'Racialized Stress & Discrimination',
    description: 'Addresses microaggressions, systemic racism, workplace discrimination, and racial trauma.',
    language: 'EN, FR',
    categoryLabel: 'Racism',
    categoryColor: 'bg-[#FAECE7] text-[#712B13]',
    dotColor: 'bg-[#D85A30]',
  },
  {
    id: 3,
    category: 'refugee',
    name: 'Refugee & Asylum Seeker Trauma',
    description: 'Trauma-informed intake for refugees, asylum seekers, and those fleeing conflict or persecution.',
    language: 'EN, FR, AR, PS',
    categoryLabel: 'Refugee',
    categoryColor: 'bg-[#E6F1FB] text-[#0C447C]',
    dotColor: 'bg-[#378ADD]',
  },
  {
    id: 4,
    category: 'lgbtq',
    name: 'LGBTQ+ Affirming Intake',
    description: 'Gender-affirming, non-pathologizing intake covering identity, pronouns, chosen family, and community.',
    language: 'EN, FR',
    categoryLabel: 'LGBTQ+',
    categoryColor: 'bg-[#EEEDFE] text-[#3C3489]',
    dotColor: 'bg-[#7F77DD]',
  },
  {
    id: 5,
    category: 'youth',
    name: 'Youth & Emerging Adults (16-29)',
    description: 'Age-appropriate questions about school/work stress, identity formation, social media, family dynamics.',
    language: 'EN, FR',
    categoryLabel: 'Youth',
    categoryColor: 'bg-[#FAEEDA] text-[#633806]',
    dotColor: 'bg-[#BA7517]',
  },
  {
    id: 6,
    category: 'couples',
    name: 'Couples Therapy Intake',
    description: 'Joint and individual intake questions covering relationship dynamics, communication, and goals.',
    language: 'EN, FR',
    categoryLabel: 'Couples',
    categoryColor: 'bg-[#FBEAF0] text-[#72243E]',
    dotColor: 'bg-[#D4537E]',
  },
];

const categories = [
  { id: 'all', name: 'All templates', count: 6 },
  { id: 'newcomer', name: 'Newcomer stress', count: 1, dotColor: 'bg-[#1D9E75]' },
  { id: 'racism', name: 'Racial trauma', count: 1, dotColor: 'bg-[#D85A30]' },
  { id: 'refugee', name: 'Refugee care', count: 1, dotColor: 'bg-[#378ADD]' },
  { id: 'lgbtq', name: 'LGBTQ+ affirming', count: 1, dotColor: 'bg-[#7F77DD]' },
  { id: 'youth', name: 'Youth / emerging adults', count: 1, dotColor: 'bg-[#BA7517]' },
  { id: 'plan', name: 'Treatment plans', count: 0, dotColor: 'bg-[#D4537E]' },
];

interface Goal {
  id: number;
  label: string;
  description: string;
}

export function CulturalTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, label: 'Goal 1', description: '' },
  ]);

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const addGoal = () => {
    setGoals([...goals, { id: Date.now(), label: `Goal ${goals.length + 1}`, description: '' }]);
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="grid grid-cols-[260px_1fr] min-h-[calc(100vh-100px)]">
      {/* Sidebar */}
      <div className="bg-white border-r border-[var(--border)] py-5">
        <div className="px-4 py-1.5 text-[11px] font-medium tracking-[0.7px] uppercase text-[var(--ink-muted)] mb-3">
          Intake Templates
        </div>

        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              if (cat.id === 'plan') {
                setShowTreatmentPlan(true);
              } else {
                setShowTreatmentPlan(false);
              }
            }}
            className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm border-l-2 transition-all ${
              selectedCategory === cat.id
                ? 'bg-[var(--sage-pale)] text-[var(--sage-deep)] border-l-[var(--sage)]'
                : 'text-[var(--ink-soft)] border-l-transparent hover:bg-[var(--warm)] hover:text-[var(--ink)]'
            }`}
          >
            {cat.dotColor && <div className={`w-2 h-2 rounded-full ${cat.dotColor}`} />}
            <span className="flex-1">{cat.name}</span>
            {cat.count > 0 && <span className="text-xs text-[var(--ink-muted)]">{cat.count}</span>}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-8 overflow-y-auto">
        {!showTreatmentPlan ? (
          <>
            {/* Templates Header */}
            <div className="mb-6">
              <h1 className="font-[var(--font-display)] text-2xl text-[var(--ink)] mb-1">
                Cultural templates
              </h1>
              <p className="text-[13px] text-[var(--ink-muted)]">
                Culturally-informed intake forms, note templates, and assessment tools
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-white border border-[var(--border)] rounded-lg px-3.5 py-2 mb-5 max-w-[360px]">
              <Search className="w-[15px] h-[15px] text-[var(--ink-muted)]" />
              <input
                type="text"
                placeholder="Search templates..."
                className="border-none bg-transparent text-sm text-[var(--ink)] outline-none flex-1 placeholder:text-[var(--ink-muted)]"
              />
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`bg-white border rounded-xl p-4.5 cursor-pointer transition-all hover:border-[var(--sage-light)] hover:shadow-[0_4px_16px_rgba(74,124,111,0.1)] ${
                    selectedTemplate?.id === template.id ? 'border-[var(--sage)] border-2' : 'border-[var(--border)]'
                  }`}
                >
                  <span className={`inline-block text-[10px] font-medium uppercase tracking-[0.6px] px-2 py-0.5 rounded mb-2.5 ${template.categoryColor}`}>
                    {template.categoryLabel}
                  </span>
                  <div className="text-sm font-medium text-[var(--ink)] mb-1.5">{template.name}</div>
                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed mb-3">
                    {template.description}
                  </p>
                  <div className="flex justify-between items-center pt-2.5 border-t border-[var(--border)]">
                    <div className="text-[11px] text-[var(--ink-muted)] flex items-center gap-1">
                      🌐 {template.language}
                    </div>
                    <button className="text-xs text-[var(--sage)] font-medium bg-transparent border-none cursor-pointer px-2 py-1 rounded transition-colors hover:bg-[var(--sage-pale)]">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Template Preview */}
            {selectedTemplate && (
              <div className="bg-white border border-[var(--border)] rounded-xl p-6 mt-6">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="font-[var(--font-display)] text-lg text-[var(--ink)] mb-1">
                      {selectedTemplate.name}
                    </h3>
                    <p className="text-[13px] text-[var(--ink-muted)]">
                      Preview template — customize before using with a client
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sample Form Fields */}
                <div className="space-y-6">
                  <div>
                    <div className="text-[11px] font-medium tracking-[0.7px] uppercase text-[var(--sage)] mb-3 pb-2 border-b border-[var(--sage-pale)]">
                      Background Information
                    </div>
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
                          How long have you been in Canada?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2 years, 6 months"
                          className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-white text-[13px] outline-none transition-colors focus:border-[var(--sage)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
                          What brings you to therapy at this time?
                        </label>
                        <textarea
                          placeholder="Share as much or as little as you're comfortable with..."
                          className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-white text-[13px] outline-none transition-colors focus:border-[var(--sage)] resize-y min-h-[80px] leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-medium tracking-[0.7px] uppercase text-[var(--sage)] mb-3 pb-2 border-b border-[var(--sage-pale)]">
                      Cultural Context
                    </div>
                    <div className="space-y-3">
                      {['Homesickness / missing family', 'Language barriers', 'Workplace discrimination', 'Cultural adjustment stress', 'Immigration status anxiety'].map((item, idx) => (
                        <label key={idx} className="flex items-start gap-2 py-1.75 text-[13px] text-[var(--ink-soft)] cursor-pointer">
                          <input type="checkbox" className="w-3.5 h-3.5 accent-[var(--sage)] flex-shrink-0 mt-0.5" />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border)]">
                  <button className="px-5 py-2.5 rounded-lg bg-[var(--sage)] text-white text-sm font-medium border-none cursor-pointer transition-colors hover:bg-[var(--sage-deep)]">
                    Use this template
                  </button>
                  <button className="px-5 py-2.5 rounded-lg bg-transparent text-[var(--ink-soft)] text-sm border border-[var(--border)] cursor-pointer transition-colors hover:bg-[var(--warm)]">
                    Customize
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Treatment Plan Builder */
          <div>
            <div className="mb-6">
              <h1 className="font-[var(--font-display)] text-2xl text-[var(--ink)] mb-1">
                Treatment plan builder
              </h1>
              <p className="text-[13px] text-[var(--ink-muted)]">
                Create collaborative treatment plans with measurable goals and interventions
              </p>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl p-6 mb-5">
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-[var(--ink-soft)] mb-1.5">
                  Client
                </label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-white text-sm outline-none transition-colors focus:border-[var(--sage)]">
                  <option>Select a client</option>
                  <option>Amara Mensah</option>
                  <option>Jamal Lee</option>
                  <option>Sadia Mohamoud</option>
                  <option>Priya & Chetan Choudhary</option>
                </select>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-[13px] font-medium text-[var(--ink-soft)]">
                    Treatment goals
                  </label>
                  <button
                    onClick={addGoal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-[1.5px] border-[rgba(74,124,111,0.3)] bg-[var(--sage-pale)] text-[var(--sage-deep)] text-[13px] font-medium cursor-pointer transition-all hover:bg-[var(--sage)] hover:text-white"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI suggest goals
                  </button>
                </div>

                <div className="space-y-2.5">
                  {goals.map((goal) => (
                    <div key={goal.id} className="bg-[var(--warm)] rounded-[10px] p-4 relative">
                      <div className="flex justify-between items-center mb-2.5">
                        <div className="text-xs font-medium text-[var(--sage-deep)] uppercase tracking-[0.5px]">
                          {goal.label}
                        </div>
                        <button
                          onClick={() => removeGoal(goal.id)}
                          className="text-[var(--ink-muted)] hover:text-[var(--ink)] bg-transparent border-none cursor-pointer text-lg leading-none p-1 rounded transition-colors hover:bg-[#ede9e0]"
                        >
                          ×
                        </button>
                      </div>
                      <textarea
                        value={goal.description}
                        onChange={(e) => {
                          const updated = goals.map(g =>
                            g.id === goal.id ? { ...g, description: e.target.value } : g
                          );
                          setGoals(updated);
                        }}
                        placeholder="Describe the treatment goal..."
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-white text-[13px] outline-none transition-colors focus:border-[var(--sage)] resize-y min-h-[60px] leading-relaxed"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={addGoal}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border-[1.5px] border-dashed border-[var(--sage-light)] rounded-lg bg-transparent text-[var(--sage)] text-[13px] font-medium cursor-pointer transition-all hover:bg-[var(--sage-pale)] hover:border-solid mt-3"
                >
                  <Plus className="w-4 h-4" />
                  Add another goal
                </button>
              </div>

              <div className="flex gap-3 pt-6 border-t border-[var(--border)]">
                <button className="px-5 py-2.5 rounded-lg bg-[var(--sage)] text-white text-sm font-medium border-none cursor-pointer transition-colors hover:bg-[var(--sage-deep)]">
                  Save treatment plan
                </button>
                <button
                  onClick={() => setShowTreatmentPlan(false)}
                  className="px-5 py-2.5 rounded-lg bg-transparent text-[var(--ink-soft)] text-sm border border-[var(--border)] cursor-pointer transition-colors hover:bg-[var(--warm)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
