"use client";

import { loginAction } from "@/lib/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="cta-btn" style={{ width: '100%', marginTop: '24px' }}>
      {pending ? "Setting up..." : "Enter TwoWallet →"}
    </button>
  );
}

export default function AuthPage() {
  return (
    <div id="landing" className="screen active" style={{ justifyContent: 'center' }}>
      <div className="landing-bg"></div>
      <div className="landing-content" style={{ maxWidth: '400px', background: 'rgba(15,15,16,0.8)', padding: '40px', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,151,58,0.2)' }}>
        <div className="logo-mark" style={{ marginBottom: '24px' }}>
          <div className="logo-rings">
            <div className="logo-ring"></div>
            <div className="logo-ring"></div>
          </div>
          TwoWallet
        </div>
        
        <h2 className="card-title" style={{ color: 'var(--cream)', marginBottom: '8px' }}>Welcome</h2>
        <p className="card-subtitle" style={{ color: 'rgba(247,243,238,0.6)', marginBottom: '32px' }}>Enter your name and a simple passcode to continue.</p>
        
        <form action={loginAction}>
          <div className="form-group" style={{ textAlign: 'left', marginBottom: '16px' }}>
            <label style={{ color: 'rgba(247,243,238,0.4)', fontSize: '11px' }}>Your Name</label>
            <input 
              name="name" 
              type="text" 
              placeholder="e.g. Priya" 
              required 
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '100%' }}
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label style={{ color: 'rgba(247,243,238,0.4)', fontSize: '11px' }}>Passcode</label>
            <input 
              name="passcode" 
              type="password" 
              placeholder="••••" 
              required 
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '100%' }}
            />
          </div>
          
          <div className="form-group" style={{ textAlign: 'left', marginBottom: '16px' }}>
            <label style={{ color: 'rgba(247,243,238,0.4)', fontSize: '11px' }}>Invite Code (Optional - to join partner)</label>
            <input 
              name="inviteCode" 
              type="text" 
              placeholder="e.g. clm123..." 
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '100%' }}
            />
          </div>
          
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
