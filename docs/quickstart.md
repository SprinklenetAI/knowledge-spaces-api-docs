# Quickstart

## 1. Register

Create an account at <https://spaces.sprinklenet.com/register>.

Use your real organization name. Registration creates your organization workspace and provisions its Organization API Key.

## 2. Connect a Model and Create a Bot

1. In the console, add a model provider key (OpenAI, Anthropic, Gemini, or another supported provider), or choose a managed-model plan.
2. Create a knowledge space, add documents, and create a bot that uses it.
3. Copy the bot's ID.

## 3. Get Your Organization API Key

1. Open **Account Settings**.
2. Find **Organization API Key**.
3. Select **Regenerate Key** (or **Generate API Key** if no key is set).
4. Copy the key immediately and store it in a secret manager.

The full key is shown only once. Regenerating replaces the previous key immediately.

## 4. Call the Bot

Use a new UUID as the `session_id` for each conversation.

### cURL

```bash
export KS_API_KEY="ks_live_your_key_here"
export KS_BOT_ID="YOUR_BOT_ID"
export KS_SESSION_ID="$(uuidgen)"

curl -X POST "https://spaces.sprinklenet.com/api/bots/${KS_BOT_ID}/chat" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${KS_API_KEY}" \
  -d '{"session_id": "'"${KS_SESSION_ID}"'", "text": "What should I read first?"}'
```

### JavaScript (Node.js 18 or later)

```js
const sessionId = crypto.randomUUID();

const res = await fetch(
  `https://spaces.sprinklenet.com/api/bots/${process.env.KS_BOT_ID}/chat`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.KS_API_KEY,
    },
    body: JSON.stringify({
      session_id: sessionId,
      text: "What should I read first?",
    }),
  },
);

const data = await res.json();
console.log(data.text.content);
```

### Python

```python
import os
import uuid

import requests

session_id = str(uuid.uuid4())

res = requests.post(
    f"https://spaces.sprinklenet.com/api/bots/{os.environ['KS_BOT_ID']}/chat",
    headers={"X-API-Key": os.environ["KS_API_KEY"]},
    json={"session_id": session_id, "text": "What should I read first?"},
    timeout=60,
)
res.raise_for_status()
print(res.json()["text"]["content"])
```

Expected response:

```json
{
  "success": true,
  "text": {
    "content": "Start with the implementation brief...",
    "resources": [],
    "isComplete": true
  }
}
```

## 5. Continue the Conversation

Reuse the same `session_id`. The bot answers with the earlier turns in context:

```bash
curl -X POST "https://spaces.sprinklenet.com/api/bots/${KS_BOT_ID}/chat" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${KS_API_KEY}" \
  -d '{"session_id": "'"${KS_SESSION_ID}"'", "text": "Summarize that in one sentence."}'
```

## 6. Read the History

```bash
curl "https://spaces.sprinklenet.com/api/bots/${KS_BOT_ID}/chat?session_id=${KS_SESSION_ID}" \
  -H "X-API-Key: ${KS_API_KEY}"
```

## 7. Stream an Answer

Add `"stream": true` to receive Server-Sent Events. See [`examples/javascript-stream.mjs`](../examples/javascript-stream.mjs).

## Troubleshooting

| Response | Likely Cause |
|----------|--------------|
| `401 Invalid API key format` | The key is truncated or has extra characters. Send the full `ks_live_...` value. |
| `401 Invalid API key` | The key was regenerated or revoked. Regenerate it in Account Settings. |
| `404 Bot not found` | The bot ID is wrong, or the bot belongs to a different organization than the key. |
| `200` with a setup message in `text.content` | No usable model key is configured. Add one in the console. |
| `429` | Rate limit exceeded. Wait for `Retry-After` seconds. |

## 8. Inspect the Published Rate-Limit Policy

```bash
curl https://spaces.sprinklenet.com/api/rate-limit/info
```
