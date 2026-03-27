import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import OnboardingClient from "./OnboardingClient";

export default async function OnboardingPage() {
  const user = await getSession();

  if (!user) {
    redirect("/auth");
  }

  // Ensure couple exists
  const couple = user.couple;

  return (
    <OnboardingClient user={user} couple={couple} />
  );
}
