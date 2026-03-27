"use client";

import { useEffect, useState } from "react";

export default function DashboardClient({ user, partnerB, couple }: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const A = user;
  const B = partnerB || { name: 'Partner B', income: 0, expenses: 0, savings: 0, invest: 0, investType: '', risk: 'safe' };
  const goals = JSON.parse(couple?.sharedGoals || "[]");
  const goalAmount = couple?.goalAmount || 3000000;
  const goalTimeline = couple?.goalTimeline || 5;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // -- CALCULATIONS ported from prototype
  const fmt = (num: number) => new Intl.NumberFormat('en-IN').format(Math.round(num));

  const totalIncome = A.income + B.income;
  const totalSavings = (A.income - A.expenses) + (B.income - B.expenses);
  const savingsRate = totalIncome > 0 ? totalSavings / totalIncome : 0;

  const spendRatioA = A.income > 0 ? A.expenses / A.income : 0;
  const spendRatioB = B.income > 0 ? B.expenses / B.income : 0;
  const spendDiff = Math.abs(spendRatioA - spendRatioB);

  const riskMatch = A.risk === B.risk ? 100 : (A.risk !== 'safe' && B.risk !== 'safe') ? 70 : 50;
  const savingsScore = Math.min(100, Math.round(savingsRate * 250));
  const spendScore = Math.max(0, 100 - Math.round(spendDiff * 200));
  const goalProgress = Math.min(100, Math.round((A.savings + B.savings) / goalAmount * 100));
  const overallScore = Math.round((savingsScore * 0.3 + spendScore * 0.3 + goalProgress * 0.2 + riskMatch * 0.2));

  const grades = overallScore >= 80 ? ['Excellent Harmony 🌟', 'Your financial partnership is strong and well-aligned. Minor optimisations will take you to perfection.'] :
                 overallScore >= 65 ? ['Good Alignment 💛', 'Solid foundation with room to grow. A few strategic changes can significantly improve your financial harmony.'] :
                 overallScore >= 50 ? ['Needs Attention ⚠️', 'Some financial tensions exist. Our AI has identified specific areas where alignment can be improved.'] :
                                      ['Conflict Zone 🔴', 'Significant financial misalignment detected. Time to have an honest conversation — our AI will help guide it.'];

  // -- INCOME SPLIT
  const percA = totalIncome > 0 ? Math.round((A.income / totalIncome) * 100) : 50;
  const percB = 100 - percA;
  const sharedExpenses = Math.round((A.expenses + B.expenses) * 0.4);
  const splitA = Math.round(sharedExpenses * (percA / 100));
  const splitB = sharedExpenses - splitA;

  // -- CONFLICTS
  const conflicts: any[] = [];
  if (spendRatioA > 0.7) conflicts.push({ type: 'warn', icon: '⚠️', title: `${A.name} is over-spending`, text: `${Math.round(spendRatioA*100)}% of income goes to expenses. This limits joint savings.` });
  if (spendRatioB > 0.7) conflicts.push({ type: 'warn', icon: '⚠️', title: `${B.name} is over-spending`, text: `${Math.round(spendRatioB*100)}% of income goes to expenses.` });
  if (spendDiff > 0.2) conflicts.push({ type: 'caution', icon: '📊', title: 'Spending habit mismatch', text: `${A.name} and ${B.name} have a ${Math.round(spendDiff*100)}% difference in spending ratios.` });
  if (A.investType && B.investType && A.investType === B.investType) conflicts.push({ type: 'caution', icon: '🔄', title: 'Investment overlap detected', text: `Both partners are investing in ${A.investType}.` });
  if (A.risk !== B.risk) conflicts.push({ type: 'caution', icon: '⚖️', title: 'Risk appetite mismatch', text: `${A.name} prefers ${A.risk} while ${B.name} prefers ${B.risk}.` });
  if (conflicts.length === 0) conflicts.push({ type: 'good', icon: '✅', title: 'No major conflicts detected', text: 'Financial profiles are well-aligned.' });

  return (
    <div id="dashboard" className="screen active">
      <nav className="dash-nav">
        <div className="nav-brand">Two<span>Wallet</span></div>
        <div className="nav-couple">
          <div className="couple-avatar">
            <div className="avatar av-a">{A.name[0]?.toUpperCase()}</div>
            <div className="avatar av-b">{B.name[0]?.toUpperCase()}</div>
          </div>
          <span>{A.name} & {B.name}</span>
        </div>
        <button className="btn-restart" onClick={() => window.location.href = '/onboarding'}>↺ Restart</button>
      </nav>

      <div className="dash-content">
        <div className="dash-greeting fade-up">
          <h1>Your Financial <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Relationship</em> Report</h1>
          <p>Generated {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} • AI-powered couple analysis</p>
        </div>

        {/* SCORE CARD */}
        <div className="score-card fade-up fade-up-1">
          <div className="score-bg"></div>
          <div className="score-left">
            <div className="score-label">Relationship Financial Score</div>
            <div className="score-title">{grades[0]}</div>
            <div className="score-desc">{grades[1]}</div>
            <div className="score-bars">
               <ScoreBar label="Savings Alignment" val={savingsScore} color="var(--gold)" />
               <ScoreBar label="Spending Balance" val={spendScore} color="var(--blush)" />
               <ScoreBar label="Goal Progress" val={goalProgress} color="var(--sage)" />
               <ScoreBar label="Risk Harmony" val={riskMatch} color="#8B7ED8" />
            </div>
          </div>
          <div className="score-right">
            <div className="score-circle">
              <div className="score-num">{overallScore}</div>
              <div className="score-max">/100</div>
            </div>
            <div className="score-grade">{overallScore >= 80 ? 'EXCELLENT' : overallScore >= 65 ? 'GOOD' : overallScore >= 50 ? 'FAIR' : 'NEEDS WORK'}</div>
          </div>
        </div>

        <div className="dash-grid fade-up fade-up-2">
          {/* INCOME SPLIT */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">Income & Fair Split</div>
              <div className="dash-card-badge badge-info">INCOME-BASED</div>
            </div>
            <div className="income-split">
               <IncomeRow name={A.name} perc={percA} amount={A.income} dotClass="dot-a" barClass="bar-fill-a" />
               <IncomeRow name={B.name} perc={percB} amount={B.income} dotClass="dot-b" barClass="bar-fill-b" />
               <div className="split-note">
                  <strong>Income-based split:</strong> {A.name} covers <strong>{percA}%</strong> of shared expenses (₹{fmt(splitA)}/mo), {B.name} covers <strong>{percB}%</strong> (₹{fmt(splitB)}/mo) — fairer than 50-50.
               </div>
            </div>
          </div>

          {/* CONFLICTS */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">Conflict Detection</div>
              <div className={`dash-card-badge ${conflicts.some(c => c.type === 'warn') ? 'badge-warn' : 'badge-ok'}`}>
                {conflicts.some(c => c.type === 'warn') ? 'REVIEW NEEDED' : 'HEALTHY'}
              </div>
            </div>
            <div className="conflict-list">
               {conflicts.slice(0, 4).map((c, i) => (
                 <div key={i} className={`conflict-item ${c.type}`}>
                    <div className="conflict-icon">{c.icon}</div>
                    <div className="conflict-text">
                       <h4>{c.title}</h4>
                       <p>{c.text}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* GOALS + TAX */}
        <div className="dash-grid fade-up fade-up-4">
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">Shared Goals</div>
              <div className="dash-card-badge badge-info">ON TRACK</div>
            </div>
            <div className="goals-list">
              {goals.map((g: string, i: number) => {
                const targetFraction = (i + 1) / goals.length;
                const target = Math.round(goalAmount * targetFraction);
                const current = Math.round((A.savings + B.savings) * (targetFraction * 0.6));
                const pct = Math.min(100, Math.round((current / target) * 100));
                return (
                  <div key={g} className="goal-row">
                    <div className="goal-row-header">
                      <div className="goal-name">🎯 {g}</div>
                      <div className="goal-progress-text">₹{fmt(current)} / ₹{fmt(target)}</div>
                    </div>
                    <div className="goal-track"><div className="goal-fill" style={{ width: `${pct}%` }}></div></div>
                    <div className="goal-timeline">{pct}% complete · On track</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">Tax Strategy</div>
              <div className="dash-card-badge badge-ok">MAXIMIZE</div>
            </div>
            <div className="tax-grid">
               <TaxBox side="L" user={A} />
               <TaxBox side="R" user={B} />
            </div>
          </div>
        </div>
        
        {/* AI ADVISOR */}
        <div className="dash-card fade-up" style={{ marginTop: '24px' }}>
          <div className="dash-card-header">
            <div className="dash-card-title">💬 Ask Your AI Financial Advisor</div>
            <div className="ai-badge">✦ Live AI</div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
             <input type="text" placeholder="e.g. Should we open a joint account?" style={{ flex: 1 }} />
             <button className="btn-primary" onClick={() => alert("Simulation: AI analysis started for " + A.name)}>Ask →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxBox({ user }: any) {
  const annualInvest = user.invest * 12;
  const remaining80C = Math.max(0, 150000 - annualInvest);
  return (
    <div className={`tax-partner ${user.isPartnerA ? 'tax-partner-a' : 'tax-partner-b'}`} style={{ padding: '16px', borderRadius: '8px' }}>
      <div className="tax-partner-name">● {user.name}</div>
      <div className="tax-row">80C Utilised: ₹{new Intl.NumberFormat('en-IN').format(Math.min(annualInvest, 150000))}</div>
      <div className="tax-row">Remaining: ₹{new Intl.NumberFormat('en-IN').format(remaining80C)}</div>
      <div className="tax-total-label" style={{ fontSize: '11px', color: 'var(--success)', marginTop: '8px' }}>Action: {remaining80C > 0 ? "Invest more in ELSS" : "Optimal"}</div>
    </div>
  );
}

function ScoreBar({ label, val, color }: any) {
    return (
        <div className="score-bar-row">
            <div className="score-bar-label">{label}</div>
            <div className="score-bar-track"><div className="score-bar-fill" style={{ width: `${val}%`, background: color }}></div></div>
            <div className="score-bar-val">{val}%</div>
        </div>
    );
}

function IncomeRow({ name, perc, amount, dotClass, barClass }: any) {
    return (
        <div className="partner-row">
            <div className="partner-label"><div className={dotClass}></div>{name}</div>
            <div className="bar-track"><div className={barClass} style={{ width: `${perc}%` }}></div></div>
            <div className="bar-amount">₹{new Intl.NumberFormat('en-IN').format(amount)}</div>
        </div>
    );
}
