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
    sector_hypothesis: "AI Agent Settlement Rails (Fintech)",
    sector_evidence: [
      "Authored open-source benchmark for autonomous agent transactions",
      "Departed Stripe Core Banking team 4 months ago",
      "Angel funding registered under stealth entity Delaware filing"
    ],
    fit_score: 94,
    score_explanation: [
      "+40: 6+ yrs tenure at target tier-1 company (Stripe)",
      "+30: Clear founder transition within past 6 months",
      "+24: Deep domain expertise in AI + Fintech crossover"
    ],
    confidence: "high",
    outreach_draft: "Hi Elena,\n\nSaw your transition from the Stripe banking team to building Krypton Labs. Given your work on agent settlement rails, would love to compare notes on latency hurdles in real-time execution."
  },
  {
    person_id: "crust-10922",
    name: "Sarah Lin",
    profile_url: "https://linkedin.com",
    previous_company: "OpenAI",
    previous_role: "Senior Research Engineer (Serving & Systems)",
    transition_date: "2026-07",
    transition_status: "Verified Transition",
    current_title: "Founder & CTO",
    startup_name: "Nexus Tensor (Stealth)",
    sector_hypothesis: "Distributed KV-Cache Inference Engines (AI Infra)",
    sector_evidence: [
      "Co-authored patent on cross-cluster KV-cache paging",
      "Incorporated new Delaware C-Corp focused on inference acceleration",
      "Keynote speaker on GPU memory bottlenecks at SysML 2026"
    ],
    fit_score: 96,
    score_explanation: [
      "+45: Core systems research pedigree at frontier AI lab (OpenAI)",
      "+30: Verified C-Corp incorporation in Q3 2026",
      "+21: Solves top enterprise cost bottleneck (LLM inference compute)"
    ],
    confidence: "high",
    outreach_draft: "Hi Sarah,\n\nIncredible work on GPU cluster memory efficiency during your time at OpenAI. Noticed your recent step out with Nexus Tensor—would love to sync on how you're approaching distributed KV caching for multi-modal agents."
  },
  {
    person_id: "crust-10923",
    name: "Marcus Chen",
    profile_url: "https://linkedin.com",
    previous_company: "Datadog",
    previous_role: "Principal Architect (Distributed Tracing)",
    transition_date: "2026-06",
    transition_status: "Verified Transition",
    current_title: "Co-Founder",
    startup_name: "Synapse Runtime",
    sector_hypothesis: "Autonomous Tracing & Agent Sandboxing (DevTools)",
    sector_evidence: [
      "Created top trending GitHub repository for agent execution sandboxing",
      "8-year tenure leading core telemetry ingestion pipelines at Datadog",
      "Teaming up with former Stripe infrastructure leads"
    ],
    fit_score: 91,
    score_explanation: [
      "+38: 8+ yrs distributed systems engineering at Datadog",
      "+28: High GitHub traction in agent runtime observability",
      "+25: Multi-founder technical syndicate formed within 90 days"
    ],
    confidence: "high",
    outreach_draft: "Hi Marcus,\n\nBeen following your open-source work on agent sandboxing and runtime safety. With your background scaling Datadog's distributed tracing, you're uniquely positioned to solve agent reliability—would love to connect."
  }
];