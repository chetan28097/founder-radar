
import os
from dotenv import load_dotenv
from litellm import completion

load_dotenv(override=True)

base_url = os.getenv("LITELLM_BASE_URL", "").rstrip("/")
model = os.getenv("LITELLM_MODEL")
api_key = os.getenv("LITELLM_API_KEY")

print("Base URL:", base_url)
print("Model:", model)

response = completion(
    model=model,
    api_base=base_url,
    api_key=api_key,
    messages=[
        {
            "role": "user",
            "content": "Reply with exactly: Founder Radar is connected."
        }
    ],
)

print(response.choices[0].message.content)
