import os

import requests


api_key = os.environ.get("KS_API_KEY")
bot_id = os.environ.get("KS_BOT_ID")

if not api_key or not bot_id:
    raise RuntimeError("Set KS_API_KEY and KS_BOT_ID before running this example.")

response = requests.post(
    f"https://spaces.sprinklenet.com/api/bots/{bot_id}/chat",
    headers={"X-API-Key": api_key},
    json={"session_id": "quickstart-001", "text": "Hello Knowledge Spaces"},
    timeout=30,
)
response.raise_for_status()

print(response.json())
