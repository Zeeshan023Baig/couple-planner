"use client";

import { useState, useEffect } from "react";
import PartnerForm from "../components/PartnerForm";
import GoalsForm from "../components/GoalsForm";
import ThemeToggle from "../components/ThemeToggle";
import { useRouter } from "next/navigation";

export default function OnboardingClient({ user, couple }: any) {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const partnerA = user;
  const partnerB = couple?.users?.find((u: any) => u.id !== user.id) || { name: "Partner B", isPartnerA: false };

  function nextStep() {
    if (step < 4) setStep(step + 1);
    else router.push("/dashboard");
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  if (step === 4) {
    // Show Loading Analysis Screen
    return (
      <LoadingAnalysis onComplete={() => router.push("/dashboard")} />
    );
  }

  return (
    <div id="onboarding" className="screen active">
      <nav className="onboard-nav" style={{ background: 'var(--card)' }}>
        <div className="nav-logo" style={{ color: 'var(--charcoal)' }}>Two<span>Wallet</span></div>
        <div className="progress-bar-wrap">
          <div className="progress-label">Setup Progress</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ThemeToggle />
            <div className="step-counter">Step {step} of 4</div>
        </div>
      </nav>

      <div className="onboard-body">
        {step === 1 && <PartnerForm partner="A" user={partnerA} coupleId={couple.id} nextStep={nextStep} />}
        {step === 2 && <PartnerForm partner="B" user={partnerB} coupleId={couple.id} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <GoalsForm couple={couple} nextStep={nextStep} prevStep={prevStep} />}
      </div>
    </div>
  );
}

function LoadingAnalysis({ onComplete }: any) {
  const [status, setStatus] = useState("Comparing income profiles...");
  const [checks, setChecks] = useState([false, false, false, false, false]);

  useEffect(() => {
    const steps = [
      "Comparing income profiles...",
      "Detecting spending patterns...",
      "Checking investment overlap...",
      "Optimising tax strategy...",
      "Computing relationship score..."
    ];
    
    let current = 0;
    const interval = setInterval(() => {
      if (current < 5) {
        setChecks(prev => {
          const next = [...prev];
          next[current] = true;
          return next;
        });
        setStatus(steps[current]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div id="loading" className="screen active">
      <div className="ai-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <h2 className="loading-title">Analysing your finances</h2>
      <div className="loading-status">{status}</div>
      <div className="loading-checks">
        <div className={`check-item ${checks[0] ? 'visible' : ''}`}><div className="check-dot"></div>Income gap analysis</div>
        <div className={`check-item ${checks[1] ? 'visible' : ''}`}><div className="check-dot" style={{background:'var(--sage)'}}></div>Spending mismatch detection</div>
        <div className={`check-item ${checks[2] ? 'visible' : ''}`}><div className="check-dot" style={{background:'var(--blush)'}}></div>Investment overlap check</div>
        <div className={`check-item ${checks[3] ? 'visible' : ''}`}><div className="check-dot" style={{background:'#8B7ED8'}}></div>Tax optimisation strategy</div>
        <div className={`check-item ${checks[4] ? 'visible' : ''}`}><div className="check-dot" style={{background:'var(--gold-light)'}}></div>Generating relationship score</div>
      </div>
    </div>
  );
}
