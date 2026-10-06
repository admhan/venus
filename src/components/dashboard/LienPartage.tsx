"use client";

import { useState } from "react";

export function LienPartage({ lien }: { lien: string }) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    await navigator.clipboard.writeText(lien);
    setCopie(true);
    setTimeout(() => setCopie(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
      <code className="flex-1 truncate text-sm text-zinc-700">{lien}</code>
      <button
        onClick={copier}
        className="rounded-full bg-nuit px-4 py-1.5 text-xs font-semibold text-white"
      >
        {copie ? "Copié !" : "Copier"}
      </button>
    </div>
  );
}
