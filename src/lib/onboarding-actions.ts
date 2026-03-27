import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(userId: string, data: any) {
  await prisma.user.update({
    where: { id: userId },
    data: {
        income: parseFloat(data.income) || 0,
        expenses: parseFloat(data.expenses) || 0,
        savings: parseFloat(data.savings) || 0,
        invest: parseFloat(data.invest) || 0,
        investType: data.investType || "",
        risk: data.risk || "moderate"
    }
  });
  revalidatePath("/onboarding-a");
  revalidatePath("/onboarding-b");
  revalidatePath("/dashboard");
}

export async function updateCoupleGoalsAction(coupleId: string, data: any) {
    await prisma.couple.update({
        where: { id: coupleId },
        data: {
            sharedGoals: JSON.stringify(data.goals || []),
            goalAmount: parseFloat(data.goalAmount) || 0,
            goalTimeline: parseInt(data.goalTimeline) || 5
        }
    });
    revalidatePath("/dashboard");
}
