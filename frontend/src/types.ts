export interface SearchRequest {
  previous_company: string;
  current_titles: string[];
  transition_window_months: number;
  sectors?: string[];
  location?: string | null;
  limit: number;
}

export interface CandidateResult {
  person_id: string;
  name: string;
  profile_url: string | null;
  previous_company: string;
  previous_role: string | null;
  transition_date: string | null;
  transition_status: string;
  current_title: string;
  startup_name: string | null;
  sector_hypothesis: string;
  sector_evidence: string[];
  fit_score: number;
  score_explanation: string[];
  confidence: 'low' | 'medium' | 'high';
  outreach_draft: string | null;
}

export interface SearchResponse {
  search_id: string;
  status: string;
  results: CandidateResult[];
  warnings: string[];
}