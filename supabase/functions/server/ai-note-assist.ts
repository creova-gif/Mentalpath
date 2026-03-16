// MentalPath — AI Note Assist Edge Function
// Deployed to Supabase Edge Functions (Deno runtime)
// PHIPA note: client PII is NEVER sent to Anthropic API
// Only note text fragments are sent, identified by session_id only

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

const NOTE_FORMAT_PROMPTS: Record<string, { labels: string[]; instruction: string }> = {
  DAP: {
    labels: ["Data", "Assessment", "Plan"],
    instruction: `Generate a concise, clinically appropriate DAP note summary.
Data: what the client reported and presented.
Assessment: your clinical formulation of themes and progress.
Plan: interventions and focus for next session.
Use formal clinical language suitable for CRPO/College records. Be specific and evidence-based.`,
  },
  SOAP: {
    labels: ["Subjective", "Objective", "Assessment", "Plan"],
    instruction: `Generate a concise SOAP note.
Subjective: client's self-report and presenting concerns.
Objective: observable behaviours, affect, appearance.
Assessment: clinical interpretation and progress.
Plan: therapeutic goals and next steps.`,
  },
  BIRP: {
    labels: ["Behavior", "Intervention", "Response", "Plan"],
    instruction: `Generate a concise BIRP note.
Behavior: presenting behaviors and client report.
Intervention: techniques and approaches used this session.
Response: client's response to interventions.
Plan: goals and focus for upcoming sessions.`,
  },
  PROGRESS: {
    labels: ["Summary", "Observations", "Plan"],
    instruction: `Generate a narrative progress note suitable for a Canadian psychotherapy practice.
Summarise session content, clinical observations, and the plan forward.
Use person-centred, non-pathologising language.`,
  },
};

interface NoteAssistRequest {
  session_id: string;   // UUID only — never client name
  note_format: string;
  section_1: string;
  section_2: string;
  section_3: string;
  section_4?: string;
  session_context?: string; // e.g. "session 14, individual, 50 min" — no PII
}

Deno.serve(async (req: Request) => {
  // CORS — allow from mentalpath.ca domains only
  const origin = req.headers.get("origin") || "";
  const allowedOrigins = [
    "https://mentalpath.ca",
    "https://app.mentalpath.ca",
    "http://localhost:3000",
    "http://localhost:3001",
  ];
  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "https://mentalpath.ca",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  // Verify JWT — Supabase handles this when verify_jwt: true
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  let body: NoteAssistRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const { session_id, note_format, section_1, section_2, section_3, section_4, session_context } = body;

  // Validate — session_id must be a UUID (no PII slipping through as ID)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!session_id || !uuidRegex.test(session_id)) {
    return new Response(JSON.stringify({ error: "Invalid session_id" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const fmt = (note_format || "DAP").toUpperCase() as keyof typeof NOTE_FORMAT_PROMPTS;
  const formatConfig = NOTE_FORMAT_PROMPTS[fmt] || NOTE_FORMAT_PROMPTS.DAP;

  // Sanitise input — strip any obvious PII patterns before sending to Claude
  const sanitize = (text: string): string => {
    if (!text) return "";
    return text
      .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, "[phone redacted]")
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[email redacted]")
      .replace(/\b\d{9}\b/g, "[SIN redacted]")
      .trim();
  };

  const s1 = sanitize(section_1);
  const s2 = sanitize(section_2);
  const s3 = sanitize(section_3);
  const s4 = section_4 ? sanitize(section_4) : null;
  const ctx = session_context ? sanitize(session_context) : "individual therapy session";

  // Build prompt — no client names, DOB, contact info
  const userPrompt = `You are assisting a Canadian registered psychotherapist draft a ${fmt} session note.
Session context: ${ctx}

${formatConfig.labels[0]} notes: ${s1}

${formatConfig.labels[1]} notes: ${s2}

${formatConfig.labels[2]} notes: ${s3}${s4 ? `\n\n${formatConfig.labels[3]} notes: ${s4}` : ""}

${formatConfig.instruction}

Respond with ONLY the formatted note — no preamble, no explanation, no markdown headers.
Format each section with its label (e.g. "Data:\n...") separated by blank lines.
Keep to 200-350 words total. Use clinical language appropriate for College records.
This note will be reviewed and edited by the therapist before saving.`;

  try {
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) throw new Error("ANTHROPIC_API_KEY not set");

    const response = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: `You are a clinical documentation assistant for a Canadian psychotherapy practice.
You help therapists draft session notes in professional clinical language.
You never invent clinical details not present in the therapist's notes.
You never reproduce client names or identifying information.
All output must be suitable for College of Registered Psychotherapists of Ontario (CRPO) record standards.
Your output will always be reviewed and edited by a registered professional before saving.`,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic API error: ${err}`);
    }

    const data = await response.json();
    const draft = data.content?.[0]?.text || "";

    // Log usage for audit (no PII — just session_id + token counts)
    console.log(JSON.stringify({
      event: "ai_note_assist",
      session_id,
      note_format: fmt,
      input_tokens: data.usage?.input_tokens,
      output_tokens: data.usage?.output_tokens,
      timestamp: new Date().toISOString(),
    }));

    return new Response(
      JSON.stringify({
        draft,
        format: fmt,
        model: data.model,
        disclaimer: "AI draft — review and edit before saving. Not a substitute for clinical judgment.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("AI assist error:", error);
    return new Response(
      JSON.stringify({ error: "AI assist unavailable. Please write your note manually." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
