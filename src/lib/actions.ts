"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const name = formData.get("name") as string;
  const passcode = formData.get("passcode") as string;
  const inviteCode = formData.get("inviteCode") as string;

  let user = await prisma.user.findFirst({
    where: { name, passcode },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { name, passcode, isPartnerA: !inviteCode },
    });
  }

  // Simple cookie-based auth for demo
  (await cookies()).set("userId", user.id);
  
  if (!user.coupleId) {
    if (inviteCode) {
        // Verify code exists first
        const existingCouple = await prisma.couple.findUnique({ where: { id: inviteCode } });
        if (existingCouple) {
            // Link to existing couple
            await prisma.user.update({
                where: { id: user.id },
                data: { coupleId: inviteCode, isPartnerA: false }
            });
        } else {
            // Fallback for demo: create new if invalid
            const couple = await prisma.couple.create({ data: {} });
            await prisma.user.update({
                where: { id: user.id },
                data: { coupleId: couple.id, isPartnerA: true }
            });
        }
    } else {
        // Create new couple
        const couple = await prisma.couple.create({ data: {} });
        await prisma.user.update({
            where: { id: user.id },
            data: { coupleId: couple.id, isPartnerA: true }
        });
    }
  }

  redirect("/onboarding");
}

export async function getSession() {
  const userId = (await cookies()).get("userId")?.value;
  if (!userId) return null;
  return prisma.user.findUnique({
    where: { id: userId },
    include: { couple: { include: { users: true } } }
  });
}
