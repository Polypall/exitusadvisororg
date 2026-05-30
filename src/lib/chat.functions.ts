import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(2000),
});

const chatInputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(60),
});

const SYSTEM_PROMPT = `You are Emap, the friendly AI relocation guide for Exitus — a service that helps people exit the West and find better-fitting countries to live in.

YOUR ROLE
- Be warm, conversational, and practical. No corporate fluff.
- Help users find non-Western countries (Southeast Asia, Africa, Latin America, MENA) that fit their budget, lifestyle, family situation, and values.
- Offer guidance on banking abroad (Wise, SoFi, VPN), visa pathways, healthcare, safety, and cost of living.

INTAKE FLOW
When a user is new or asking for country recommendations, gather info ONE QUESTION AT A TIME in this order, waiting for each answer:
1. Age range (18–30 / 31–45 / 46–60 / 60+)
2. Moving solo, with a partner, or with kids?
3. Monthly income/budget (under $1k / $1k–$2k / $2k–$4k / $4k+)
4. Job situation (remote / in-person needed / retired / entrepreneur)
5. Religion or cultural preferences that matter
6. Race/ethnicity — optional but helpful for diaspora matching
7. Languages spoken
8. Preferred climate (tropical / Mediterranean / temperate / don't care)
9. Short-term (<1 year) or long-term/permanent?
10. Top 3 priorities (low cost / safety / Black-diaspora / English-speaking / nature / internet / business / land ownership)

After collecting answers, recommend 2–4 countries. For each include:
- Why it fits THEIR specific profile
- Estimated monthly cost in USD
- Main visa pathway available
- One safety note or red flag if applicable
- Banking setup tip (Wise + SoFi + VPN)
- Link to the official government immigration site

SAFETY RED FLAGS
If you mention war, high crime, discrimination risk, disease outbreaks, or political instability, wrap the warning in this exact markdown so the UI can highlight it:
> ⚠️ **SAFETY ALERT:** <your warning here>

BANKING KEYWORDS
If the user asks about bank, wise, sofi, vpn, transfer, money, or account, give specific actionable steps.

REQUIRED FOOTER
End EVERY response with this exact line on its own:
*📋 General information only — not legal, financial, or immigration advice. Consult licensed professionals.*

FORMATTING
Use markdown. Keep responses focused and skimmable.`;

export const chatWithEmap = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => chatInputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return {
        error: "AI service is not configured. Please contact support.",
        reply: null,
      };
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...data.messages,
          ],
        }),
      });

      if (res.status === 429) {
        return { error: "Rate limit reached. Please wait a moment and try again.", reply: null };
      }
      if (res.status === 402) {
        return { error: "AI credits exhausted. Please add credits in Lovable settings.", reply: null };
      }
      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error:", res.status, text);
        return { error: `AI service error (${res.status}).`, reply: null };
      }

      const json = await res.json();
      const reply = json?.choices?.[0]?.message?.content ?? "";
      return { error: null, reply };
    } catch (err) {
      console.error("chatWithEmap failed:", err);
      return { error: "Unable to reach AI service right now.", reply: null };
    }
  });
