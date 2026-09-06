import "server-only";

import { revalidatePath } from "next/cache";

/**
 * Public pages read the listings directly, so an admin write has to invalidate
 * them explicitly; without this they would serve stale data until the next
 * scheduled revalidation.
 */
export function revalidateListings(id?: string) {
  revalidatePath("/");
  revalidatePath("/vendita");
  revalidatePath("/sitemap.xml");
  if (id) revalidatePath(`/vendita/${id}`);
}
