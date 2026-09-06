import "server-only";

import { SITE } from "./site";
import type { Lead } from "./types";

const ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 8000;

const LABELS: Record<Lead["type"], string> = {
  contatto: "Richiesta generale",
  appuntamento: "Prenotazione appuntamento",
  immobile: "Informazioni su un immobile",
};

/** Email notifications are optional; without the keys the inbox is the only channel. */
export function notificationsConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_FROM && process.env.LEAD_NOTIFY_TO
  );
}

function body(lead: Lead) {
  const lines = [
    `Tipo: ${LABELS[lead.type]}`,
    `Nome: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Telefono: ${lead.phone}` : null,
    lead.propertyRef ? `Immobile: rif. ${lead.propertyRef}` : null,
    lead.date ? `Data preferita: ${lead.date}` : null,
    `Ricevuta: ${new Date(lead.createdAt).toLocaleString("it-IT")}`,
    "",
    lead.message,
    "",
    `Apri il pannello: ${SITE.base}/admin/lead`,
  ];
  return lines.filter((line) => line !== null).join("\n");
}

/**
 * Sends the lead to the office mailbox. Returns whether it was delivered so the
 * caller can tell the visitor to phone instead when nothing has been recorded.
 */
export async function notifyNewLead(lead: Lead): Promise<boolean> {
  if (!notificationsConfigured()) return false;
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_NOTIFY_FROM,
        to: process.env.LEAD_NOTIFY_TO!.split(",").map((address) => address.trim()),
        reply_to: lead.email,
        subject: `Nuova richiesta dal sito — ${lead.name}${lead.propertyRef ? ` (rif. ${lead.propertyRef})` : ""}`,
        text: body(lead),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error("Notifica lead non inviata", response.status, await response.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (error) {
    console.error("Notifica lead non inviata", error);
    return false;
  }
}
