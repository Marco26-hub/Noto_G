export function formatPrice(value: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("it-IT").format(value);
}

export const ENERGY_CLASSES = ["A4", "A3", "A2", "A1", "B", "C", "D", "E", "F", "G"] as const;

export function energyColor(cls: string) {
  const map: Record<string, string> = {
    A4: "#00b359",
    A3: "#2eb84c",
    A2: "#5fbf2f",
    A1: "#8dc63f",
    B: "#c3d600",
    C: "#ffe800",
    D: "#fdb913",
    E: "#f58220",
    F: "#e2001a",
    G: "#a80015",
  };
  return map[cls] ?? "#94a3b8";
}

export function statusLabel(status: string) {
  return status === "disponibile" ? "Disponibile" : status === "riservato" ? "Riservato" : "Venduto";
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
