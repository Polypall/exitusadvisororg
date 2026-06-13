import "./lib/error-capture";
import "./start";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type Env = {
  ANTHROPIC_API_KEY?: string;
  STRIPE_SECRET_KEY?: string;
};

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

const SYSTEM_PROMPT = `You are Emap, the warm and encouraging AI relocation guide for Exitus Advisor (exitusadvisor.org). You help people who want to leave Western countries (US, UK, Canada, Western Europe, Australia, New Zealand) figure out which countries OUTSIDE the West might fit them — based on who they are, not a fixed menu.

YOUR PERSONALITY
- Friendly, welcoming, optimistic — like a well-traveled friend who's genuinely excited to help.
- Match the Exitus brand: a travel-and-fresh-start tone, purple-and-gold warmth.
- Keep replies fairly short and easy to read. Avoid overwhelming people with walls of text.
- Talk like a person, not a database. Vary your phrasing, keep it brief, and go easy on bold text and bullet points.

HOW THE CONVERSATION WORKS
1. Greet them warmly and ask what's pushing them to consider leaving the West, and what they're hoping to find in a new home.
2. Gather their situation a FEW questions at a time — never all at once. It should feel like a chat, not a form. Over the conversation, try to learn: age range; family situation (single, married, kids?); religion or beliefs, IF they want it factored in; budget or monthly income; how they earn (remote job / in-person job / retired / savings / business); languages they speak; short-term or long-term stay; and what matters most to them.
3. Once you know enough, suggest 2-4 countries that fit. For each one: say WHY it fits THEIR answers; give a rough monthly cost-of-living estimate (always call it an estimate and suggest checking Numbeo); name the visa pathway; note any safety or fit considerations.
4. Invite them to dig deeper into any one, and keep refining.

BANKING ADVICE
When users ask about banking abroad: Open a Schwab checking account and a Wise account BEFORE leaving the US. Schwab reimburses all international ATM fees. Wise lets you hold and spend in multiple currencies at low cost. SoFi is another option. A VPN can help if banking apps block foreign IP addresses.

COUNTRIES TO PRIORITIZE
Latin America: Mexico, Colombia, Costa Rica, Panama, Uruguay, Argentina, Ecuador, Brazil, Paraguay
Southeast Asia: Thailand, Vietnam, Malaysia, Philippines, Indonesia (Bali), Cambodia
Africa: Ghana, Kenya, South Africa, Mauritius, Morocco, Rwanda, Cape Verde
MENA / Eurasia: UAE, Georgia
Other: Turkey, Albania

SAFETY & FIT
- If someone's identity, religion, race, or background could affect their safety, raise it honestly but carefully, and point them to Travel.State.Gov.
- Flag any country with active conflict, political instability, or serious health/famine risk with a clear warning — and don't recommend it for relocation.
- ALWAYS warn about: Haiti, Sudan, South Sudan, Yemen, Myanmar, Venezuela, DRC, Libya, Somalia.

TRUSTED RESOURCES: Wise, Schwab, Numbeo, Travel.State.Gov, SafetyWing.

CRITICAL RULES
- You are NOT a lawyer, financial advisor, or immigration consultant.
- Stay on the topic of relocation only.
- Do NOT ask people to share sensitive personal info.
- End EVERY response with exactly one short disclaimer: "Heads-up: this is general info to get you started, not legal or immigration advice — confirm the details with official government sources before you act."`;

async function handleChat(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) return jsonResponse({ error: "API not configured" }, 500);

  let body: { message: string; history?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  const { message, history = [] } = body;
  if (!message || typeof message !== "string") {
    return jsonResponse({ error: "Missing message" }, 400);
  }

  const messages = [
    ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    { role: "user" as const, content: message },
  ];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  const data = await response.json() as { content?: { type: string; text: string }[] };
  const reply = data.content?.[0]?.type === "text" ? data.content[0].text : "";

  return jsonResponse({ reply });
}

async function handleCreateCheckout(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const secretKey = env.STRIPE_SECRET_KEY;
  if (!secretKey) return jsonResponse({ error: "Stripe not configured" }, 500);

  const origin = request.headers.get("origin") ?? "https://exitusadvisororg.xa-entrepreneurship.workers.dev";

  const params = new URLSearchParams({
    "mode": "subscription",
    "payment_method_types[0]": "card",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][recurring][interval]": "month",
    "line_items[0][price_data][product_data][name]": "Exitus Settler",
    "line_items[0][price_data][product_data][description]": "Unlimited Emap chats, monthly strategy call, document checklist, Tax & FBAR guide",
    "line_items[0][price_data][unit_amount]": "2900",
    "line_items[0][quantity]": "1",
    "success_url": `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    "cancel_url": `${origin}/#pricing`,
    "customer_creation": "always",
  });

  const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const session = await stripeResponse.json() as { url?: string; error?: { message: string } };

  if (session.error) return jsonResponse({ error: session.error.message }, 400);
  return jsonResponse({ url: session.url });
}

async function handleVerifySession(request: Request, env: Env): Promise<Response> {
  if (request.method !== "GET") return jsonResponse({ error: "Method not allowed" }, 405);

  const secretKey = env.STRIPE_SECRET_KEY;
  if (!secretKey) return jsonResponse({ error: "Stripe not configured" }, 500);

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return jsonResponse({ error: "Missing session_id" }, 400);

  const stripeResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { "Authorization": `Bearer ${secretKey}` },
  });

  const session = await stripeResponse.json() as {
    payment_status?: string;
    customer?: string;
    customer_details?: { email?: string };
  };

  if (session.payment_status !== "paid") return jsonResponse({ paid: false });

  return jsonResponse({
    paid: true,
    email: session.customer_details?.email ?? "",
    customer_id: session.customer,
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    // API routes handled here — secrets stay server-side
    try {
      if (url.pathname === "/api/chat") return await handleChat(request, env);
      if (url.pathname === "/api/create-checkout-session") return await handleCreateCheckout(request, env);
      if (url.pathname === "/api/verify-session") return await handleVerifySession(request, env);
    } catch (error) {
      console.error(error);
      return jsonResponse({ error: "Internal server error" }, 500);
    }

    // Everything else goes to TanStack Start (your app pages)
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
