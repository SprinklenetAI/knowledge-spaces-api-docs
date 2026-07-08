# Quickstart

## 1. Register

Create a developer account:

<https://spaces.sprinklenet.com/register>

Use your real organization name. The Knowledge Spaces console uses that organization as the initial workspace for your account.

## 2. Generate The Organization API Key

After signing in:

1. Open **Account Settings**.
2. Find **Organization API Key**.
3. Select **Generate API Key**.
4. Copy the generated key immediately.

The key is shown only once. Regenerating the organization key replaces the previous key.

## 3. Call A Bot

Replace `YOUR_BOT_ID` and `YOUR_API_KEY`.

### cURL

```bash
curl -X POST https://spaces.sprinklenet.com/api/bots/YOUR_BOT_ID/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"session_id": "quickstart-001", "text": "Hello Knowledge Spaces"}'
```

### JavaScript

```js
const res = await fetch(
  "https://spaces.sprinklenet.com/api/bots/YOUR_BOT_ID/chat",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.KS_API_KEY,
    },
    body: JSON.stringify({
      session_id: "quickstart-001",
      text: "Hello Knowledge Spaces",
    }),
  },
);

const data = await res.json();
console.log(data);
```

### Python

```python
import os
import requests

res = requests.post(
    "https://spaces.sprinklenet.com/api/bots/YOUR_BOT_ID/chat",
    headers={"X-API-Key": os.environ["KS_API_KEY"]},
    json={"session_id": "quickstart-001", "text": "Hello Knowledge Spaces"},
    timeout=30,
)
res.raise_for_status()
print(res.json())
```

Expected success shape:

```json
{
  "success": true,
  "text": "..."
}
```

## 4. Continue A Conversation

Reuse the same `session_id` to continue the thread:

```bash
curl -X POST https://spaces.sprinklenet.com/api/bots/YOUR_BOT_ID/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"session_id": "quickstart-001", "text": "What did we just discuss?"}'
```

## 5. Inspect Public Rate Limits

Public policy:

```bash
curl https://spaces.sprinklenet.com/api/rate-limit/info
```
