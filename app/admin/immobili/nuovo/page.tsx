import { PropertyForm } from "@/components/admin/PropertyForm";

export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-white">Nuovo immobile</h1>
      <p className="mt-1 text-sm text-slate-500">Compila i dati e carica le foto. L'annuncio apparirà subito sul sito.</p>
      <div className="mt-8">
        <PropertyForm />
      </div>
    </div>
  );
}
