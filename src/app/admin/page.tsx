import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/admin-dashboard";
import { getSessionCookieName, verifySessionToken } from "@/lib/admin-auth";
import { getCmsData } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;

  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const data = await getCmsData();

  return (
    <AdminDashboard
      initialProfile={data.profile}
      initialSettings={data.settings}
      initialWorks={data.works}
    />
  );
}
