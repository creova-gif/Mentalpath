# MentalPath — Technical Architecture & Build Guide
## CREOVA Solutions · Stack: Next.js 14 + Supabase + Stripe

---

## Recommended Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR for landing page SEO + React for dashboard |
| Database | Supabase (ca-central-1) | Canadian servers, Postgres, built-in auth, Row Level Security |
| Auth | Supabase Auth | JWT tokens, email/password, magic link |
| Payments | Stripe (CAD) | Canadian dollar, card + PAD (pre-authorized debit) |
| Email/SMS | Resend + Twilio | Appointment reminders, invoice delivery |
| File storage | Supabase Storage (ca-central-1) | Consent forms, intake PDFs — Canada-hosted |
| AI notes | Claude API (Anthropic) | On-demand note summarization — no training on data |
| Deployment | Vercel (Canadian region) | Edge CDN, easy Next.js deploy |
| PDF generation | React-PDF or Puppeteer | Invoice + receipt generation |

---

## PHIPA Compliance Architecture

1. **Supabase region**: ALWAYS use `ca-central-1` (Canada) in your Supabase project settings
2. **Encryption at rest**: Supabase provides AES-256 encryption by default on ca-central-1
3. **Encryption in transit**: TLS 1.3 enforced by Supabase + Vercel
4. **Row Level Security (RLS)**: Therapist can ONLY access their own clients — enforced at DB level
5. **AI data handling**: When passing notes to Claude API, send ONLY the note text, never name/DOB/contact. Use a session_id, never client_id in API calls
6. **Note locking**: After 24hrs, notes get `locked: true` — UI prevents editing, DB trigger blocks UPDATE
7. **Audit log**: Every SELECT on sensitive tables writes to `audit_log` table (who, what, when)
8. **Data retention**: Notes retained minimum 10 years per PHIPA s.20 — no delete button for clinical records

---

## Database Schema (PostgreSQL via Supabase)

```sql
-- THERAPISTS (practice owners)
CREATE TABLE therapists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  credentials TEXT, -- "RP, CRPO #123456"
  registration_number TEXT,
  college TEXT, -- CRPO / OCSWSSW / CPO / CPSBC
  province TEXT NOT NULL DEFAULT 'ON',
  practice_name TEXT,
  signature_url TEXT, -- for receipts
  hourly_rate NUMERIC(10,2) DEFAULT 140,
  stripe_account_id TEXT,
  stripe_customer_id TEXT,
  subscription_tier TEXT DEFAULT 'free', -- free | solo | group
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLIENTS
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  pronouns TEXT,
  status TEXT DEFAULT 'active', -- active | waitlist | inactive | discharged
  session_type TEXT DEFAULT 'individual', -- individual | couples | family | group
  rate_per_session NUMERIC(10,2),
  is_sliding_scale BOOLEAN DEFAULT FALSE,
  intake_template TEXT DEFAULT 'standard',
  cultural_context_tags TEXT[], -- ['newcomer', 'racialized_stress', ...]
  referral_source TEXT,
  intake_notes TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  consent_signed_at TIMESTAMPTZ,
  consent_version INTEGER DEFAULT 1,
  portal_access_token TEXT UNIQUE, -- for client portal (no login required)
  portal_token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SESSION NOTES
CREATE TABLE session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE RESTRICT, -- no cascade delete, PHIPA
  session_date DATE NOT NULL,
  session_type TEXT DEFAULT 'individual',
  duration_minutes INTEGER DEFAULT 50,
  note_format TEXT NOT NULL, -- SOAP | DAP | BIRP | progress
  section_1 TEXT, -- Data / Subjective / Behavior / Summary
  section_2 TEXT, -- Assessment / Objective / Intervention / Observations
  section_3 TEXT, -- Plan / Assessment / Response / Plan
  section_4 TEXT, -- Plan (SOAP only)
  ai_summary TEXT, -- AI-generated summary, stored separately
  ai_used BOOLEAN DEFAULT FALSE,
  is_draft BOOLEAN DEFAULT TRUE,
  is_locked BOOLEAN DEFAULT FALSE,
  locked_at TIMESTAMPTZ,
  session_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-lock notes after 24 hours (pg_cron job)
-- SELECT cron.schedule('lock-old-notes', '0 * * * *',
--   'UPDATE session_notes SET is_locked=true, locked_at=NOW()
--    WHERE is_draft=false AND is_locked=false
--    AND created_at < NOW() - INTERVAL ''24 hours''');

-- INVOICES
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL, -- INV-0001
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE RESTRICT,
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  service_description TEXT DEFAULT 'Registered Psychotherapy — Individual sessions',
  sessions_included JSONB, -- [{date, duration, type}]
  session_count INTEGER DEFAULT 1,
  rate_per_session NUMERIC(10,2),
  subtotal NUMERIC(10,2),
  hst_applicable BOOLEAN DEFAULT FALSE,
  hst_amount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending | paid | overdue | cancelled
  payment_method TEXT, -- stripe | etransfer | cash | insurance
  stripe_payment_intent_id TEXT,
  paid_at TIMESTAMPTZ,
  receipt_pdf_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- APPOINTMENTS
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 50,
  session_type TEXT DEFAULT 'individual',
  status TEXT DEFAULT 'scheduled', -- scheduled | completed | cancelled | noshow
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_rule TEXT, -- iCal RRULE string
  reminder_sent_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  note_id UUID REFERENCES session_notes(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INTAKE FORMS
CREATE TABLE intake_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  template_type TEXT NOT NULL,
  form_data JSONB NOT NULL, -- all responses
  completed_at TIMESTAMPTZ,
  e_signature TEXT, -- base64 signature image
  ip_address TEXT, -- for consent audit trail
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIT LOG (PHIPA requirement)
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  therapist_id UUID,
  action TEXT NOT NULL, -- SELECT | INSERT | UPDATE | DELETE
  table_name TEXT NOT NULL,
  record_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "therapists_own_clients" ON clients
  FOR ALL USING (therapist_id = auth.uid());

CREATE POLICY "therapists_own_notes" ON session_notes
  FOR ALL USING (therapist_id = auth.uid());

CREATE POLICY "therapists_own_invoices" ON invoices
  FOR ALL USING (therapist_id = auth.uid());
```

---

## Next.js Project Structure

```
mentalpath/
├── app/
│   ├── (marketing)/          # Landing page routes
│   │   ├── page.tsx          # Homepage
│   │   ├── pricing/page.tsx
│   │   └── compliance/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── onboarding/page.tsx
│   ├── dashboard/            # Protected — therapist app
│   │   ├── layout.tsx        # Sidebar + topbar shell
│   │   ├── page.tsx          # Overview
│   │   ├── clients/
│   │   │   ├── page.tsx      # Client list
│   │   │   └── [id]/page.tsx # Client detail
│   │   ├── notes/
│   │   │   ├── page.tsx      # Notes list
│   │   │   └── new/page.tsx  # Note editor
│   │   ├── billing/
│   │   │   ├── page.tsx      # Invoice list
│   │   │   └── new/page.tsx  # New invoice
│   │   └── calendar/page.tsx
│   ├── portal/               # Client-facing portal (no login)
│   │   └── [token]/page.tsx  # Booking, forms, invoices
│   └── api/
│       ├── webhooks/stripe/route.ts
│       ├── notes/ai-assist/route.ts
│       ├── invoices/pdf/route.ts
│       └── reminders/send/route.ts
├── components/
│   ├── ui/                   # Buttons, inputs, modals
│   ├── clients/              # ClientTable, ClientCard, NewClientModal
│   ├── notes/                # NoteEditor, NoteViewer, TemplateSelector
│   ├── billing/              # InvoiceTable, InvoiceModal, ReceiptView
│   └── layout/               # Sidebar, Topbar, PageShell
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser client
│   │   └── server.ts         # Server client (RSC)
│   ├── stripe.ts
│   ├── claude.ts             # AI note assist
│   └── pdf.ts                # Invoice PDF generation
└── types/
    └── database.ts           # Generated Supabase types
```

---

## Week-by-Week Build Plan

### Week 1–2: Foundation
- [ ] Create Supabase project — SELECT ca-central-1 region
- [ ] Run full schema SQL (above)
- [ ] Next.js 14 project init, configure Supabase client
- [ ] Supabase Auth — email/password + magic link
- [ ] Onboarding flow — therapist profile setup (name, credentials, college, registration #)
- [ ] Route protection middleware (redirect unauthenticated to /login)
- [ ] Basic dashboard shell — sidebar, topbar, page routing

### Week 2–3: Client Management
- [ ] Client list page with search + filter
- [ ] New client modal — full form with intake template selection
- [ ] Client detail panel — sliding panel from right
- [ ] Client portal token generation
- [ ] 7 intake form templates (culturally-adapted) — stored as JSONB in intake_forms
- [ ] Consent form with e-signature capture (canvas-based)

### Week 3–4: Session Notes
- [ ] Note editor — DAP, SOAP, BIRP, Progress templates
- [ ] Note section components (labeled textareas)
- [ ] Save draft vs Save & lock logic
- [ ] Auto-lock via Supabase pg_cron (24hr)
- [ ] Note history per client
- [ ] AI assist endpoint — strips PII, calls Claude API, returns draft
- [ ] Audit log writes on every note access

### Week 4–5: Billing
- [ ] Stripe account + Connect setup (therapist gets paid directly)
- [ ] Invoice creation form
- [ ] Invoice numbering sequence (INV-XXXX per therapist)
- [ ] PDF generation — react-pdf with official receipt format
- [ ] Email invoice to client via Resend
- [ ] Stripe payment link embed on invoice
- [ ] Status webhook: Stripe → mark invoice paid
- [ ] Tax export — aggregate income summary per year

### Week 5–6: Beta launch
- [ ] Appointment scheduling (basic — manual entry first)
- [ ] Email reminders via Resend (24hr before session)
- [ ] SMS reminders via Twilio (2hr before session)
- [ ] Stripe subscription billing ($49/mo solo tier)
- [ ] Onboard beta therapist (your existing client)
- [ ] Collect feedback, prioritize Phase 2

---

## AI Note Assist — Implementation

```typescript
// app/api/notes/ai-assist/route.ts
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  const { noteFormat, section1, section2, section3, sessionContext } = await req.json();
  // NEVER include client name, DOB, contact info in API call
  
  const client = new Anthropic();
  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 600,
    system: `You are assisting a Canadian registered psychotherapist to draft a clinical session note.
Format: ${noteFormat}. Respond with the suggested draft only.
Do not include any identifying information.
Use clinical language appropriate for College records.
Note: This is for professional documentation, not diagnosis.`,
    messages: [{
      role: 'user',
      content: `Draft a ${noteFormat} summary based on these therapist notes:
Section 1 (${section1Label}): ${section1}
Section 2 (${section2Label}): ${section2}
Section 3 (${section3Label}): ${section3}
Context: ${sessionContext}

Provide a concise professional summary the therapist can review and edit.`
    }]
  });
  
  return Response.json({ draft: response.content[0].text });
}
```

---

## Stripe Setup (Canadian)

```typescript
// lib/stripe.ts
import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20',
});

// Create subscription for therapist
export async function createSubscription(therapistId: string, email: string) {
  const customer = await stripe.customers.create({ email, metadata: { therapistId } });
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.STRIPE_SOLO_PRICE_ID }], // $49 CAD/mo
    currency: 'cad',
    trial_period_days: 30,
  });
  return { customerId: customer.id, subscriptionId: subscription.id };
}
```

---

## Environment Variables

```env
# Supabase (MUST be ca-central-1)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_SOLO_PRICE_ID=price_...
STRIPE_GROUP_PRICE_ID=price_...

# Claude AI
ANTHROPIC_API_KEY=sk-ant-...

# Resend (email)
RESEND_API_KEY=re_...

# Twilio (SMS reminders)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# App
NEXT_PUBLIC_APP_URL=https://app.mentalpath.ca
```

---

## Phase 2 Roadmap (post-beta)

| Feature | Priority | Complexity |
|---|---|---|
| Built-in telehealth (WebRTC) | High | High |
| Multi-clinician / group practice | High | Med |
| Google Calendar two-way sync | High | Med |
| Client self-booking via portal | High | Med |
| AI-generated treatment plan drafts | Med | Med |
| Insurance direct billing (EHB) | Med | Very High |
| French language interface | Med | Low |
| Mobile app (React Native / Expo) | High | High |
| PHIPA breach notification workflow | High | Med |

---

## Go-Live Checklist (PHIPA)

- [ ] Supabase project confirmed on ca-central-1 (check dashboard)
- [ ] RLS policies active on all tables (test with different user IDs)
- [ ] Audit log writing on every note/client access
- [ ] Privacy policy published at mentalpath.ca/privacy (includes PHIPA statement)
- [ ] Data processing agreement (DPA) with Supabase signed
- [ ] DPA with Vercel signed (confirm Canadian data residency option)
- [ ] DPA with Anthropic signed (confirm no training on API data)
- [ ] Therapist consent to terms captures their acknowledgment of their own PHIPA obligations
- [ ] Penetration test or security review before launch (can use free Supabase security advisor)
- [ ] Backup policy documented (Supabase handles this, confirm in settings)
