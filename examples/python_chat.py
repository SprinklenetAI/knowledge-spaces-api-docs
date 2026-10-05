import os
import uuid

import requests


api_key = os.environ.get("KS_API_KEY")
bot_id = os.environ.get("KS_BOT_ID")

if not api_key or not bot_id:
    raise RuntimeError("Set KS_API_KEY and KS_BOT_ID before running this example.")

# One new UUID per conversation. Reuse it to continue the same conversation.
session_id = os.environ.get("KS_SESSION_ID") or str(uuid.uuid4())

response = requests.post(
    f"https://spaces.sprinklenet.com/api/bots/{bot_id}/chat",
    headers={"X-API-Key": api_key},
    json={"session_id": session_id, "text": "What should I read first?"},
    timeout=60,
)
response.raise_for_status()

answer = response.json()["text"]
print(f"session_id: {session_id}")
print(answer["content"])
for source in answer.get("resources") or []:
    print("source:", (source.get("document") or {}).get("title") or (source.get("url") or {}).get("url"))
