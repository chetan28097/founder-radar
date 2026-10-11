
# Founder Radar

**AI-powered founder discovery and startup intelligence.**

Founder Radar helps venture capitalists, recruiters, and startup scouts discover professionals who may be transitioning from established companies into founding or building startups.

## Problem

Finding emerging founders manually requires searching professional profiles,
reviewing career histories, and investigating early startup activity.

## Solution

Founder Radar combines professional profile discovery with AI-assisted
analysis to produce an evidence-backed shortlist of potential founders.

## Features

- Search for professionals by previous employer and current title.
- Analyze career history and available transition evidence.
- Identify potential startup sectors from available profile information.
- Rank candidates using explainable relevance criteria.
- Generate personalized outreach drafts for human review.
- Display evidence, missing information, and uncertainty.
- Trace agent execution and diagnose failures.

## Technology Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Python, FastAPI
- People search: Crustdata
- LLM access: LiteLLM with Claude Sonnet
- Observability: Neatlogs
- Development workflow: Entire
- Financial analysis: cfo.ai
- Version control: Git and GitHub
- Hosting: AWS, subject to hackathon requirements

## Architecture

1. The user submits search criteria through the dashboard.
2. FastAPI validates and normalizes the request.
3. Crustdata retrieves matching professional profiles.
4. The backend normalizes and deduplicates results.
5. Claude analyzes the available profile evidence through LiteLLM.
6. The backend validates the output and calculates relevance scores.
7. The dashboard displays candidates, evidence, and outreach drafts.

## Repository Structure

```text
founder-radar/
├── backend/
│   ├── main.py
│   ├── crustdata_client.py
│   ├── agent.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
├── tests/
├── .gitignore
└── README.md
```

The structure above is the planned layout and should be updated
as files are implemented.

## Prerequisites

- Python 3.13 or a compatible supported version
- Node.js and npm
- Git
- Crustdata API access
- LiteLLM gateway URL, API key, and configured model identifier
- Neatlogs access
- Access to the required hackathon tools

## Local Setup

Clone the repository:

```bash
git clone https://github.com/chetan28097/founder-radar.git
cd founder-radar
```

### Backend

```bash
cd backend
python -m venv .venv
```

Activate the environment on Windows:

```bat
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a local `.env` file using `.env.example`
and fill in your authorized credentials.

Start the API:

```bash
uvicorn main:app --reload
```

API documentation is available at:

http://127.0.0.1:8000/docs

### Frontend

Once the React application has been implemented:

```bash
cd frontend
npm install
npm run dev
```

Use the frontend URL printed by the development server.

## Environment Variables

Keep credentials in a local `.env` file.

Required settings will include:

- CRUSTDATA_API_KEY
- LITELLM_API_KEY
- LITELLM_BASE_URL
- LITELLM_MODEL
- NEATLOGS_API_KEY

Only include variables actually required by the implemented integrations.
Never commit secrets or place private API keys in frontend code.

## API

Planned endpoints:

- `GET /health` — service health check
- `POST /api/search` — discover and analyze potential founders

See `/docs` for the implemented request and response schemas.

## Testing

Tests will cover:

- API authentication and error handling
- Profile normalization and deduplication
- Model output validation
- Scoring and evidence handling
- Search endpoint behavior
- Frontend loading, empty, and error states

## Collaboration

- Pull the latest `main` before starting work.
- Create feature branches for larger changes.
- Commit focused changes with descriptive messages.
- Open pull requests and review before merging.
- Never commit `.env`, API keys, or virtual environments.

## Responsible Use and Limitations

Founder Radar produces research leads, not verified investment
recommendations.

Career dates, startup activity, and sector hypotheses depend on the
available data. Missing evidence must be disclosed, and AI-generated
claims must not be presented as confirmed facts.

Outreach drafts require human review before sending.

## Project Status

Under active development for a hackathon.

Features and integrations will be marked complete only after they
have been implemented and tested.
