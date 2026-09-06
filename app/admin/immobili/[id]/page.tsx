import { notFound } from "next/navigation";
import { getProperty } from "@/lib/db";
import { PropertyForm } from "@/components/admin/PropertyForm";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage(props: PageProps<"/admin/immobili/[id]">) {
  const { id } = await props.params;
  const p = await getProperty(id);
  if (!p) notFound();
  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-white">Modifica: {p.title}</h1>
      <p className="mt-1 text-sm text-slate-500">Rif. {p.reference}</p>
      <div className="mt-8">
        <PropertyForm initial={p} />
      </div>
    </div>
  );
}
