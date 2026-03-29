import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, user, partner, score } = await req.json();

    // Mock AI logic that provides high-quality, relevant financial advice based on the couple's data
    let response = "";

    if (message.toLowerCase().includes("joint") || message.toLowerCase().includes("account")) {
      response = `Based on your Financial Harmony Score of ${score}/100, opening a joint account could be a great step. Since ${user.name} and ${partner.name} have ${score > 70 ? 'good' : 'some'} alignment, we recommend a "Mine, Yours, Ours" model. Keep personal accounts for discretionary spending and use the joint account for the ₹${Math.round((user.expenses + partner.expenses) * 0.4)} in shared monthly expenses we identified.`;
    } else if (message.toLowerCase().includes("save") || message.toLowerCase().includes("invest")) {
      response = `Your current joint savings rate is ${Math.round((user.savings + partner.savings) / (user.income + partner.income) * 100)}%. To reach your shared goals faster, consider moving ${user.name}'s preference for ${user.risk} risk and ${partner.name}'s preference for ${partner.risk} risk towards a balanced index fund. This could bridge the "Risk Harmony" gap we detected.`;
    } else {
      response = `Hello! I've analysed the financial data for ${user.name} and ${partner.name}. With an overall harmony score of ${score}, you're in a ${score > 70 ? 'strong' : 'developing'} position. Focus on aligning your ${user.risk !== partner.risk ? 'risk appetites' : 'spending habits'} to unlock more joint investment potential. For your specific question: "${message}", I suggest reviewing your fair-split ratio (currently ${Math.round(user.income/(user.income+partner.income)*100)}:${Math.round(partner.income/(user.income+partner.income)*100)}) before making large joint commitments.`;
    }

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
