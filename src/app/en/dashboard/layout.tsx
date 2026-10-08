import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function DashboardLayoutEn({ children }: { children: React.ReactNode }) {
  return <DashboardShell locale="en">{children}</DashboardShell>;
}
