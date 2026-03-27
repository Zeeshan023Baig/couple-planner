"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  return (
    <div id="landing" className="screen active">
      <div className="landing-bg"></div>
      <div className="landing-rings">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>
      <div className="landing-content">
        <div className="logo-mark">
          <div className="logo-rings">
            <div className="logo-ring"></div>
            <div className="logo-ring"></div>
          </div>
          TwoWallet
        </div>

        <h1 className="landing-headline">
          Money.<br />
          <span className="headline-em">Together.</span>
        </h1>

        <p className="landing-sub">
          The AI that doesn&apos;t just manage your money —<br />
          it manages how <em>you and your partner</em> handle money together.
        </p>

        <p className="landing-tagline">Fintech × Human Behaviour × Relationship Intelligence</p>

        <div className="stat-row">
          <div className="stat-item">
            <div className="stat-num">67%</div>
            <div className="stat-label">Couples fight<br />over money</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">₹2.4L</div>
            <div className="stat-label">Avg annual tax<br />left unclaimed</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">3.2×</div>
            <div className="stat-label">Better returns<br />with joint planning</div>
          </div>
        </div>

        <Link href="/auth" className="cta-btn">
          Start Your Financial Journey
          <span className="cta-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
