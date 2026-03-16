# MentalPath — Deployment Guide

This guide covers deploying MentalPath with all features including AI note assist, Stripe billing, and the client portal.

## Architecture Overview

MentalPath uses a three-tier architecture:

```
Frontend (React + React Router)
    ↓
Supabase Edge Functions (Hono server + AI/Stripe handlers)
    ↓
Supabase Postgres Database (Canadian servers)
```

## 1. Environment Setup

### Required Services

1. **Supabase** (ca-central-1 region — PHIPA compliant)
2. **Stripe** (Canadian dollar billing)
3. **Anthropic** (Claude API for AI note assist)
4. **Resend** (Optional: Email notifications)
5. **Twilio** (Optional: SMS reminders)

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Supabase (get from dashboard → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://hkhwgbkijepsxtixdmrs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe (dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_SOLO_PRICE_ID=price_...  # $49 CAD/month
STRIPE_GROUP_PRICE_ID=price_... # $79 CAD/month

# Anthropic (console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-...

# Optional: Email & SMS
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@mentalpath.ca
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
```

## 2. Supabase Setup

### Database Tables

The app uses the pre-configured `kv_store_4d1a502d` table. No migrations needed for prototyping.

For production, you may want to create dedicated tables:

```sql
-- Therapists table
CREATE TABLE therapists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT,
  trial_ends_at TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active',
  cultural_context TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  duration_minutes INTEGER DEFAULT 50,
  session_type TEXT DEFAULT 'individual',
  note_format TEXT,
  note_data JSONB,
  note_locked BOOLEAN DEFAULT FALSE,
  note_locked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  amount_cad DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'draft',
  paid_at TIMESTAMPTZ,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Edge Functions Deployment

Deploy the two edge functions to Supabase:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
npx supabase login

# Deploy AI Note Assist function
npx supabase functions deploy ai-note-assist \
  --project-ref hkhwgbkijepsxtixdmrs \
  --no-verify-jwt=false

# Deploy Stripe Webhook function
npx supabase functions deploy stripe-webhook \
  --project-ref hkhwgbkijepsxtixdmrs \
  --no-verify-jwt=false
```

### Set Edge Function Secrets

```bash
npx supabase secrets set --project-ref hkhwgbkijepsxtixdmrs \
  ANTHROPIC_API_KEY=sk-ant-... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  STRIPE_SOLO_PRICE_ID=price_... \
  STRIPE_GROUP_PRICE_ID=price_...
```

## 3. Stripe Setup

### Create Products

1. Go to https://dashboard.stripe.com/test/products
2. Click "Add product"

**Solo Practitioner Plan:**
- Name: MentalPath Solo
- Price: $49.00 CAD
- Billing: Recurring monthly
- Copy the price ID → `STRIPE_SOLO_PRICE_ID`

**Group Practice Plan:**
- Name: MentalPath Group
- Price: $79.00 CAD per seat
- Billing: Recurring monthly
- Copy the price ID → `STRIPE_GROUP_PRICE_ID`

### Set Up Webhook (Local Development)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook signing secret (whsec_...) to STRIPE_WEBHOOK_SECRET
```

### Set Up Webhook (Production)

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://hkhwgbkijepsxtixdmrs.supabase.co/functions/v1/stripe-webhook`
4. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `checkout.session.completed`
5. Copy the signing secret to your Supabase secrets

## 4. Anthropic API Setup

1. Go to https://console.anthropic.com/settings/keys
2. Create a new API key
3. Copy to `ANTHROPIC_API_KEY` environment variable
4. Add to Supabase secrets (see above)

## 5. Testing

### Test AI Note Assist

```bash
curl -X POST https://hkhwgbkijepsxtixdmrs.supabase.co/functions/v1/ai-note-assist \
  -H "Authorization: Bearer YOUR_USER_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "00000000-0000-0000-0000-000000000020",
    "note_format": "DAP",
    "section_1": "Client reported increased anxiety this week",
    "section_2": "Client appears engaged and motivated",
    "section_3": "Continue with CBT techniques, focus on breathing exercises"
  }'
```

### Test Stripe Webhook

```bash
stripe trigger customer.subscription.created
```

## 6. Application Routes

The application has three main sections:

### Public Routes
- `/` — Marketing landing page
- `/portal` — Client intake portal (PHIPA-compliant booking form)

### Dashboard Routes (requires auth)
- `/dashboard` — Overview with today's sessions, revenue charts
- `/dashboard/clients` — Client management with cultural context tags
- `/dashboard/notes` — Session notes with AI assist
- `/dashboard/billing` — Invoice management and T2125 export
- `/dashboard/calendar` — Appointment scheduling
- `/dashboard/messages` — Secure client messaging
- `/dashboard/settings` — Practice settings
- `/dashboard/compliance` — PHIPA compliance dashboard

## 7. PHIPA Compliance Checklist

✅ Data stored in Canadian region (ca-central-1)
✅ Encryption at rest (Supabase default)
✅ Encryption in transit (HTTPS)
✅ No client PII sent to third-party AI services
✅ Session notes auto-lock after 24 hours
✅ Audit logging for AI assist usage
✅ Client consent forms built into intake
✅ Access controls via Supabase RLS (to be configured)

### Recommended RLS Policies

```sql
-- Therapists can only see their own data
CREATE POLICY therapist_isolation ON clients
  FOR ALL USING (therapist_id = auth.uid());

CREATE POLICY therapist_isolation ON sessions
  FOR ALL USING (therapist_id = auth.uid());

CREATE POLICY therapist_isolation ON invoices
  FOR ALL USING (therapist_id = auth.uid());
```

## 8. Production Deployment

### Option A: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# → Settings → Environment Variables
```

### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Set environment variables in Netlify dashboard
# → Site settings → Environment variables
```

## 9. Monitoring & Logs

### Supabase Edge Function Logs

```bash
npx supabase functions logs ai-note-assist --project-ref hkhwgbkijepsxtixdmrs
npx supabase functions logs stripe-webhook --project-ref hkhwgbkijepsxtixdmrs
```

### Stripe Event Logs

View in Stripe Dashboard → Developers → Events

### Anthropic Usage

View in Anthropic Console → Usage

## 10. Troubleshooting

### AI Assist Not Working

1. Check Anthropic API key is set in Supabase secrets
2. Verify edge function is deployed: `npx supabase functions list`
3. Check logs: `npx supabase functions logs ai-note-assist`
4. Ensure CORS headers are allowing your domain

### Stripe Webhooks Failing

1. Verify webhook secret matches in Supabase secrets
2. Check stripe event logs for errors
3. Ensure webhook URL is correct: `/functions/v1/stripe-webhook`
4. Test with `stripe trigger` command

### Client Portal Not Loading

1. Check route is defined in `/src/app/routes.tsx`
2. Verify component is imported correctly
3. Clear browser cache
4. Check browser console for errors

## 11. Next Steps

### Features to Add

- [ ] Email notifications via Resend
- [ ] SMS reminders via Twilio
- [ ] PDF export for invoices and T2125
- [ ] Video session integration (Whereby or Daily.co)
- [ ] Client self-booking calendar
- [ ] Outcome tracking dashboards
- [ ] Multi-language support (French for Quebec)

### Security Hardening

- [ ] Configure Supabase RLS policies
- [ ] Add rate limiting to edge functions
- [ ] Implement session timeout
- [ ] Add 2FA for therapist accounts
- [ ] Regular security audits

## Support

For issues or questions:
- Email: support@mentalpath.ca
- Documentation: https://docs.mentalpath.ca
- Community: https://community.mentalpath.ca

---

**Built with ❤️ for Canadian mental health practitioners**
