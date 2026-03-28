"use client";

import { useState } from "react";
import { updateProfileAction } from "@/lib/onboarding-actions";

export default function PartnerForm({ partner, user, coupleId, nextStep, prevStep }: any) {
  const [loading, setLoading] = useState(false);
  const [risk, setRisk] = useState(user?.risk || "");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.risk = risk;
    await updateProfileAction(user?.id, coupleId, partner === 'A', data);
    setLoading(false);
    nextStep();
  }

  return (
    <div className="onboard-card">
      <div className="card-header">
        <div className={`partner-badge ${partner === 'A' ? 'badge-a' : 'badge-b'}`}>
          ● Partner {partner} {user?.name ? `- ${user.name}` : ""}
        </div>
        <h2 className="card-title">{partner === 'A' ? "Let's start with you" : "Now, your partner"}</h2>
        <p className="card-subtitle">Tell us about your financial profile — everything stays private and secure.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Monthly Income (₹)</label>
              <input name="income" type="number" defaultValue={user?.income || ""} required placeholder="e.g. 85000" />
            </div>
            <div className="form-group">
              <label>Monthly Expenses (₹)</label>
              <input name="expenses" type="number" defaultValue={user?.expenses || ""} required placeholder="e.g. 45000" />
            </div>
            <div className="form-group">
              <label>Current Savings (₹)</label>
              <input name="savings" type="number" defaultValue={user?.savings || ""} required placeholder="e.g. 200000" />
            </div>
            <div className="form-group">
              <label>Existing Investments (₹/month)</label>
              <input name="invest" type="number" defaultValue={user?.invest || ""} required placeholder="e.g. 15000" />
            </div>
            <div className="form-group full">
              <label>Risk Appetite</label>
              <div className="risk-grid">
                <div className={`risk-card ${risk === 'safe' ? 'selected' : ''}`} onClick={() => setRisk('safe')}>
                  <div className="risk-icon">🛡️</div>
                  <div className="risk-label">Safe</div>
                  <div className="risk-desc">FDs, Bonds, PPF</div>
                </div>
                <div className={`risk-card ${risk === 'moderate' ? 'selected' : ''}`} onClick={() => setRisk('moderate')}>
                  <div className="risk-icon">⚖️</div>
                  <div className="risk-label">Moderate</div>
                  <div className="risk-desc">Balanced funds, hybrid</div>
                </div>
                <div className={`risk-card ${risk === 'risky' ? 'selected' : ''}`} onClick={() => setRisk('risky')}>
                  <div className="risk-icon">🚀</div>
                  <div className="risk-label">Aggressive</div>
                  <div className="risk-desc">Equity, small-cap, crypto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          {prevStep && <button type="button" className="btn-secondary" onClick={prevStep}>← Back</button>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : partner === 'A' ? "Partner B Profile →" : "Set Shared Goals →"}
          </button>
        </div>
      </form>
    </div>
  );
}
