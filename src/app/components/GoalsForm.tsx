"use client";

import { useState } from "react";
import { updateCoupleGoalsAction } from "@/lib/onboarding-actions";

export default function GoalsForm({ couple, nextStep, prevStep }: any) {
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<string[]>(JSON.parse(couple?.sharedGoals || "[]"));

  const goalList = [
    { id: 'house', icon: '🏠', label: 'Buy a Home' },
    { id: 'wedding', icon: '💍', label: 'Wedding' },
    { id: 'travel', icon: '✈️', label: 'Travel' },
    { id: 'car', icon: '🚗', label: 'Buy a Car' },
    { id: 'education', icon: '🎓', label: 'Education' },
    { id: 'baby', icon: '👶', label: 'Start a Family' },
    { id: 'emergency', icon: '🛡️', label: 'Emergency Fund' },
    { id: 'retirement', icon: '🌅', label: 'Retirement' },
    { id: 'business', icon: '💼', label: 'Start Business' },
  ];

  function toggleGoal(id: string) {
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = {
      goals,
      goalAmount: formData.get("goalAmount"),
      goalTimeline: formData.get("goalTimeline")
    };
    await updateCoupleGoalsAction(couple.id, data);
    setLoading(false);
    nextStep();
  }

  return (
    <div className="onboard-card">
      <div className="card-header">
        <div className="partner-badge" style={{ background: 'rgba(232,165,152,0.1)', color: '#B0544A', border: '1px solid rgba(232,165,152,0.3)' }}>
          💑 Together
        </div>
        <h2 className="card-title">What are you saving for?</h2>
        <p className="card-subtitle">Select all shared goals — the AI will create a joint roadmap.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-grid">
            <div className="form-group full">
              <label>Shared Goals (select all that apply)</label>
              <div className="goals-grid">
                {goalList.map(g => (
                  <div key={g.id} className={`goal-chip ${goals.includes(g.id) ? 'selected' : ''}`} onClick={() => toggleGoal(g.id)}>
                    <span className="goal-icon">{g.icon}</span>{g.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Combined Target Amount (₹)</label>
              <input name="goalAmount" type="number" defaultValue={couple?.goalAmount || ""} required placeholder="e.g. 5000000" />
            </div>
            <div className="form-group">
              <label>Target Timeline (Years)</label>
              <select name="goalTimeline" defaultValue={couple?.goalTimeline || ""}>
                <option value="">Select timeline</option>
                <option value="1">Within 1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="5">5 years</option>
                <option value="10">10 years</option>
                <option value="15">15+ years</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button type="button" className="btn-secondary" onClick={prevStep}>← Back</button>
          <button type="submit" className="btn-gold" disabled={loading}>
            {loading ? "Analysing..." : "✦ Analyse & Generate Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
