"use client";

import { useTransition } from "react";
import { marquerCommeLu } from "@/app/dashboard/feedback/actions";
import { getDict, type Locale } from "@/lib/i18n";

export function BoutonMarquerLu({ feedbackId, locale }: { feedbackId: string; locale: Locale }) {
  const dict = getDict(locale).dashboardFeedback;
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => marquerCommeLu(feedbackId, locale))}
      disabled={isPending}
      className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-50"
    >
      {dict.markAsRead}
    </button>
  );
}
