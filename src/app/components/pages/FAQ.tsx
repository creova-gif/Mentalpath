import { useState } from 'react';
import { ChevronDown, Search, ShieldCheck, FileText, CreditCard, HelpCircle, Lock, MapPin } from 'lucide-react';

const faqCategories = [
  {
    id: 'phipa',
    title: 'PHIPA Compliance & Data Security',
    icon: ShieldCheck,
    faqs: [
      {
        q: 'Is MentalPath truly PHIPA-compliant?',
        a: 'Yes. MentalPath is designed specifically for Canadian mental health practitioners and meets all PHIPA requirements. All client data is encrypted at rest and in transit using AES-256 encryption. Our servers are located exclusively in Canada (Toronto region), ensuring data sovereignty. We never store data on US servers, which is a critical distinction from other therapy platforms.',
      },
      {
        q: 'Where is my client data stored?',
        a: 'All data is stored on Canadian servers in the Toronto region. We use Supabase infrastructure with Canadian data residency guaranteed. Your client information never leaves Canada, ensuring full compliance with provincial health information privacy laws including PHIPA (Ontario), PIPA (Alberta, BC), and equivalent legislation across all provinces.',
      },
      {
        q: 'How does MentalPath handle encryption?',
        a: 'We use industry-standard AES-256 encryption for data at rest and TLS 1.3 for data in transit. Session notes, client records, and all personal health information are encrypted before being stored. Access is controlled through multi-factor authentication and role-based permissions.',
      },
      {
        q: 'What about AI note generation and PII?',
        a: 'Our AI assist feature uses Claude AI, but with critical privacy protections. Before any text is sent to the AI, we sanitize all personally identifiable information (PII) including names, phone numbers, emails, and SINs. The AI receives only anonymized clinical context, never client identities. All processing happens server-side with your data remaining in Canada.',
      },
      {
        q: 'Can I export my data?',
        a: 'Absolutely. You have full data portability rights. Export all client records, session notes, and invoices at any time in standard formats (CSV, PDF). There are no lock-in restrictions—your data belongs to you.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & Subscriptions',
    icon: CreditCard,
    faqs: [
      {
        q: 'How does the 7-day free trial work?',
        a: 'Start your 7-day free trial immediately—no credit card required. You get full access to all features: unlimited clients, session notes with AI assist (20 generations during trial), billing tools, and T2125 tax export. If you decide MentalPath is right for you, subscribe before day 7 to keep all your data. If not, simply let the trial expire—no charges, no obligations.',
      },
      {
        q: 'What happens when my trial ends?',
        a: 'At the end of your 7-day trial, you will receive a notification to subscribe. If you choose not to subscribe, your account becomes read-only—you can view and export data for 30 days, but cannot add new clients or notes. After 30 days, the account is deactivated. You can reactivate anytime within 90 days by subscribing.',
      },
      {
        q: 'How much does MentalPath cost?',
        a: 'MentalPath is $49/month CAD or $490/year CAD (save 2 months). This includes unlimited clients, unlimited session notes, AI-assisted documentation, PHIPA-compliant storage, invoicing, and Canadian tax export tools. No hidden fees, no per-client charges.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes, cancel anytime with no penalty. Your subscription remains active until the end of your billing period. You can export all data before canceling. We offer prorated refunds for annual subscriptions if you cancel within the first 30 days.',
      },
      {
        q: 'Do you offer discounts for group practices?',
        a: 'Yes! Practices with 3+ therapists receive 15% off. Contact hello@mentalpath.ca for custom pricing for clinics and group practices.',
      },
    ],
  },
  {
    id: 'features',
    title: 'Features & Functionality',
    icon: FileText,
    faqs: [
      {
        q: 'What note formats does MentalPath support?',
        a: 'MentalPath supports all major clinical documentation formats used in Canadian psychotherapy: DAP (Data-Assessment-Plan), SOAP (Subjective-Objective-Assessment-Plan), BIRP (Behavior-Intervention-Response-Plan), and narrative Progress Notes. The AI assist feature is trained on CRPO documentation standards and generates notes in person-centred, evidence-based language.',
      },
      {
        q: 'How does the AI note assist work?',
        a: 'Enter brief session notes in each section (e.g., "client discussed work stress, practiced grounding"). Click "Get AI suggestions" and our Claude AI assistant will generate professional, clinically appropriate text following CRPO standards. The AI understands common therapeutic modalities (CBT, DBT, ACT, emotion-focused therapy) and uses person-centred language. You review and edit before saving—it is an assist tool, not a replacement for clinical judgment.',
      },
      {
        q: 'Can I track multiple clients and sessions?',
        a: 'Yes, unlimited clients and sessions. Create detailed client profiles with status tracking (active, on hold, discharged), cultural context tags, session history, and billing records. The dashboard shows today\'s schedule, recent activity, and outstanding tasks.',
      },
      {
        q: 'What is the T2125 tax export feature?',
        a: 'MentalPath generates a year-end income summary formatted specifically for CRA Schedule T2125 (Statement of Business or Professional Activities). Download a CSV with monthly revenue breakdown, gross income totals, and detailed invoice records. This simplifies tax filing for self-employed therapists—many users can complete T2125 Part 1 (income) without an accountant.',
      },
      {
        q: 'Does MentalPath integrate with my EHR or billing software?',
        a: 'Currently, MentalPath is a standalone platform designed for solo and small group practices. We are exploring integrations with Canadian billing services like Green Shield Canada and Telus Health in future releases. You can export invoices as PDFs for submission to insurance providers.',
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical & Setup',
    icon: HelpCircle,
    faqs: [
      {
        q: 'What devices can I use MentalPath on?',
        a: 'MentalPath is a web application accessible from any modern browser (Chrome, Firefox, Safari, Edge) on desktop, laptop, tablet, or phone. We recommend desktop/laptop for full productivity, but the interface is fully responsive for mobile note-taking on the go.',
      },
      {
        q: 'Do I need to install anything?',
        a: 'No installation required. Simply visit mentalpath.ca and sign up. Your account is accessible immediately from any device with internet access.',
      },
      {
        q: 'What if I have technical issues?',
        a: 'Email support@mentalpath.ca and we typically respond within 4 business hours. For urgent issues, use the in-app chat (available during business hours Mon-Fri 9am-5pm ET). We also have a knowledge base with step-by-step guides for common tasks.',
      },
      {
        q: 'How do I migrate from another system?',
        a: 'We offer guided migration support. Export your data from your current system (most platforms support CSV export), then contact us at hello@mentalpath.ca. We will provide a migration template and help import your client records and session notes. Migration assistance is free for annual subscribers.',
      },
    ],
  },
  {
    id: 'regulatory',
    title: 'Regulatory & Professional',
    icon: Lock,
    faqs: [
      {
        q: 'Is MentalPath approved by CRPO or other regulatory colleges?',
        a: 'While regulatory colleges do not formally "approve" software, MentalPath is designed to meet CRPO record-keeping standards as outlined in the Professional Practice & Jurisprudence resource. Our documentation formats align with college requirements for clinical notes, client records, and informed consent documentation. Many CRPO, OCSWSSW, and CCPA members currently use MentalPath.',
      },
      {
        q: 'Does MentalPath meet insurance requirements for record-keeping?',
        a: 'Yes. MentalPath supports detailed session documentation, treatment plans, and progress tracking required by professional liability insurers. Timestamped notes create an audit trail for risk management. Always consult your specific policy requirements.',
      },
      {
        q: 'Can MentalPath be used for teletherapy documentation?',
        a: 'Absolutely. Many therapists use MentalPath alongside platforms like Doxy.me or Zoom for teletherapy. Document virtual sessions the same way as in-person sessions, noting the modality. MentalPath complements your video platform—it does not provide video therapy itself.',
      },
      {
        q: 'What about minors and consent requirements?',
        a: 'MentalPath allows you to flag client records as "minor" and track parental/guardian consent. You are responsible for obtaining and documenting appropriate consent per your regulatory college\'s requirements. We provide fields for consent tracking but do not automate consent forms—consult your college guidelines.',
      },
    ],
  },
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('phipa');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[var(--ink)] mb-2">Frequently Asked Questions</h1>
        <p className="text-[var(--ink-muted)] text-sm">
          Everything you need to know about MentalPath for Canadian mental health practitioners
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink-muted)]" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sage)] bg-[var(--surface)]"
        />
      </div>

      {/* FAQ Categories */}
      <div className="space-y-3">
        {filteredCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          const isOpen = openCategory === category.id;
          
          return (
            <div key={category.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-[var(--warm)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[var(--sage)]" />
                  <span className="font-medium text-[var(--ink)]">{category.title}</span>
                  <span className="text-xs text-[var(--ink-muted)] bg-[var(--warm)] px-2 py-1 rounded-full">
                    {category.faqs.length}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[var(--ink-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* FAQs in Category */}
              {isOpen && (
                <div className="border-t border-[var(--border)]">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 1000 + faqIndex;
                    const isFAQOpen = openFAQ === globalIndex;
                    
                    return (
                      <div key={faqIndex} className="border-b border-[var(--border)] last:border-b-0">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full flex items-start justify-between p-4 hover:bg-[var(--warm)] transition-colors text-left"
                        >
                          <span className="flex-1 font-medium text-[var(--ink)] pr-4">{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-[var(--ink-muted)] flex-shrink-0 mt-1 transition-transform ${isFAQOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isFAQOpen && (
                          <div className="px-4 pb-4 text-sm text-[var(--ink-soft)] leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="w-12 h-12 text-[var(--ink-muted)] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[var(--ink)] mb-2">No results found</h3>
          <p className="text-[var(--ink-muted)] text-sm mb-4">
            Try a different search term or browse all categories
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-[var(--sage)] text-white rounded-lg hover:bg-[var(--sage-deep)] transition-colors text-sm"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Contact Support */}
      <div className="mt-8 bg-[var(--sage-pale)] border border-[var(--sage-light)] rounded-xl p-6">
        <h3 className="font-serif text-lg text-[var(--ink)] mb-2">Still have questions?</h3>
        <p className="text-[var(--ink-muted)] text-sm mb-4">
          Our support team is here to help. We typically respond within 4 business hours.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:support@mentalpath.ca"
            className="px-4 py-2 bg-[var(--sage)] text-white rounded-lg hover:bg-[var(--sage-deep)] transition-colors text-sm inline-flex items-center gap-2"
          >
            Email Support
          </a>
          <a
            href="/dashboard/support"
            className="px-4 py-2 border border-[var(--border)] text-[var(--ink)] rounded-lg hover:bg-white transition-colors text-sm"
          >
            Contact Form
          </a>
        </div>
      </div>

      {/* Canadian Pride Footer */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--ink-muted)]">
        <MapPin className="w-4 h-4" />
        <span>Proudly Canadian · Data stays in Canada · PHIPA Compliant</span>
      </div>
    </div>
  );
}
