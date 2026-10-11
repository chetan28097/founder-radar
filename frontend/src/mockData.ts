import type { CandidateResult } from './types';

export const MOCK_CANDIDATES: CandidateResult[] = [
  {
    person_id: "crust-10921",
    name: "Elena Rostova",
    profile_url: "https://linkedin.com",
    previous_company: "Stripe",
    previous_role: "Staff Engineer (Payment Infra)",
    transition_date: "2026-05",
    transition_status: "Verified Transition",
    current_title: "Co-Founder & CEO",
    startup_name: "Krypton Labs (Stealth)",
    sector_hypothesis: "AI Agent Settlement Rails",
    sector_evidence: [
      "Authored open-source benchmark for autonomous agent transactions",
      "Departed Stripe Core Banking team 4 months ago",
      "Angel funding registered under stealth entity Delaware filing"
    ],
    fit_score: 94,
    score_explanation: [
      "+40: 6+ yrs tenure at target company",
      "+30: Clear founder transition within 6 months",
      "+24: Deep domain expertise in AI + Fintech crossover"
    ],
    confidence: "high",
    outreach_draft: "Hi Elena,\n\nSaw your transition from the Stripe banking team to building Krypton Labs. Given your work on agent settlement rails, would love to compare notes on latency hurdles in real-time execution."
  }
];