"use client";

import { useTransition } from "react";
import { marquerCommeLu } from "@/app/dashboard/feedback/actions";

export function BoutonMarquerLu({ feedbackId }: { feedbackId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => marquerCommeLu(feedbackId))}
      disabled={isPending}
      className="rounded-full border border-ink-200 px-4 py-1.5 text-xs font-medium text-ink-600 hover:bg-ink-50 disabled:opacity-50"
    >
      Marquer comme lu
    </button>
  );
}
