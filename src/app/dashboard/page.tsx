import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  const user = session;
  const couple = session.couple;
  const partnerB = couple?.users.find((u: any) => u.id !== user.id);

  return (
    <DashboardClient 
      user={user} 
      partnerB={partnerB} 
      couple={couple} 
    />
  );
}
