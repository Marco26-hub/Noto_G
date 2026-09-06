import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteLead } from "@/lib/db";

export async function DELETE(_req: Request, ctx: RouteContext<"/api/lead/[id]">) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  await deleteLead(id);
  return NextResponse.json({ ok: true });
}
