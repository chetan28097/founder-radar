
import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api.crustdata.com/person/search"
API_VERSION = "2025-11-01"


def search_people(limit=5):
    api_key = os.getenv("CRUSTDATA_API_KEY")

    if not api_key:
        raise RuntimeError(
            "CRUSTDATA_API_KEY is missing from your backend .env file."
        )

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-api-version": API_VERSION,
    }

    # Initial connection test: search for people with a Founder title.
    payload = {
        "filters": {
            "op": "and",
            "conditions": [
                {
                    "field": "experience.employment_details.current.title",
                    "type": "(.)",
                    "value": "Founder",
                }
            ],
        },
        "limit": limit,
    }

    print("Connecting to Crustdata...")

    try:
        response = requests.post(
            API_URL,
            headers=headers,
            json=payload,
            timeout=30,
        )

        if not response.ok:
            print("\nCrustdata returned an error.")
            print("HTTP status:", response.status_code)
            print("Details:", response.text[:1500])
            response.raise_for_status()

        data = response.json()

    except requests.RequestException as exc:
        print("\nRequest failed:", exc)
        return None

    profiles = data.get("profiles", [])

    print("\n" + "=" * 50)
    print("FOUNDER RADAR - CRUSTDATA SEARCH RESULTS")
    print("=" * 50)
    print("Total matching profiles:", data.get("total_count", "Unknown"))
    print("Profiles returned:", len(profiles))

    for index, profile in enumerate(profiles, start=1):
        basic = profile.get("basic_profile") or {}

        experience = profile.get("experience") or {}
        employment = experience.get("employment_details") or {}

        current_jobs = employment.get("current") or []
        past_jobs = employment.get("past") or []

        if isinstance(current_jobs, dict):
            current_jobs = [current_jobs]

        if isinstance(past_jobs, dict):
            past_jobs = [past_jobs]

        print(f"\n--- Candidate {index} ---")
        print("Name:", basic.get("name", "Not provided"))
        print("Current title:", basic.get("current_title", "Not provided"))
        print("Headline:", basic.get("headline", "Not provided"))

        location = basic.get("location") or {}
        if isinstance(location, dict):
            print(
                "Location:",
                location.get("full_location", "Not provided"),
            )

        print("\nCurrent employment:")
        if current_jobs:
            for job in current_jobs:
                print("  Company:", job.get("name", "Not provided"))
                print("  Role:", job.get("title", "Not provided"))
                print("  Start date:", job.get("start_date", "Unknown"))
        else:
            print("  No current employment details returned.")

        print("\nPrevious employment:")
        if past_jobs:
            for job in past_jobs[:5]:
                print("  Company:", job.get("name", "Not provided"))
                print("  Role:", job.get("title", "Not provided"))
                print("  Start date:", job.get("start_date", "Unknown"))
                print("  End date:", job.get("end_date", "Unknown"))
                print()
        else:
            print("  No past employment details returned.")

        # Useful for later verification and deduplication.
        print("Crustdata profile ID:", profile.get("crustdata_person_id"))

    if data.get("next_cursor"):
        print("\nMore results may be available using the next_cursor.")

    if data.get("remarks"):
        print("\nAPI remarks:", data["remarks"])

    print("\nSearch completed.")
    return data


if __name__ == "__main__":
    search_people(limit=5)
