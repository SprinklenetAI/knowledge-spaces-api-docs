# Knowledge Spaces API

Developer documentation for **Knowledge Spaces** by Sprinklenet.

[Knowledge Spaces](https://sprinklenet.com/knowledge-spaces/) is Sprinklenet's governed knowledge and AI application layer. Developers use the API to call their organization's bots, carry conversations across calls, stream answers, and manage conversation sessions.

## Start Here

1. Register at <https://spaces.sprinklenet.com/register> with your organization name. Registration creates your organization workspace and its Organization API Key.
2. Sign in to the console and add a model provider key, or choose a managed-model plan.
3. Create a bot and copy its ID.
4. Open **Account Settings**, find **Organization API Key**, and select **Regenerate Key** (or **Generate API Key** if no key is set). Copy the key when it is shown; it is displayed only once.
5. Call the bot, using a new UUID as the `session_id` for each conversation:

```bash
export KS_API_KEY="ks_live_your_key_here"
export KS_BOT_ID="YOUR_BOT_ID"

curl -X POST "https://spaces.sprinklenet.com/api/bots/${KS_BOT_ID}/chat" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${KS_API_KEY}" \
  -d '{"session_id": "'"$(uuidgen)"'", "text": "What should I read first?"}'
```

## Documentation

- Overview, request and response formats, errors, and rate limits: [`docs/overview.md`](docs/overview.md)
- Quickstart: [`docs/quickstart.md`](docs/quickstart.md)
- OpenAPI 3 contract: [`openapi/knowledge-spaces-public.yaml`](openapi/knowledge-spaces-public.yaml)
- Data sovereignty roadmap: [`docs/sovereignty-roadmap.md`](docs/sovereignty-roadmap.md)
- Changelog: [`CHANGELOG.md`](CHANGELOG.md)
- Examples: [cURL](examples/curl-chat.sh), [JavaScript](examples/javascript-chat.mjs), [JavaScript streaming](examples/javascript-stream.mjs), [Python](examples/python_chat.py)

## Authentication

Send the Organization API Key on every request, in either form:

```http
X-API-Key: ks_live_...
Authorization: Bearer ks_live_...
```

A key reaches only the bots and sessions owned by its organization. Keep it on your server; never ship it in browser or mobile code.

## Endpoints

Base URL: `https://spaces.sprinklenet.com/api`

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/bots/{bot_id}/chat` | Send a message; set `"stream": true` for Server-Sent Events |
| `GET` | `/bots/{bot_id}/chat?session_id=...` | Read the 10 most recent messages in a session |
| `GET` | `/sessions/{session_id}` | Read session details |
| `PUT` | `/sessions/{session_id}/context` | Attach metadata and an end-user ID |
| `POST` | `/sessions/{session_id}/end` | End a session (transcript retained) |
| `DELETE` | `/sessions/{session_id}` | Delete a session and its messages |
| `GET` | `/rate-limit/info` | Published rate-limit policy (no auth) |

## What You Can Build

- Cited answers over private document sets
- Multi-model AI features through a single integration
- Governed assistants with role-based access, audit logging, and guardrails configured in the console

## Contact

Platform access, enterprise plans, and partnerships: <https://sprinklenet.com/contact/>

Developer platform and pricing: <https://sprinklenet.com/developers/>
