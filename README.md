# Knowledge Spaces API

Developer documentation for the **Knowledge Spaces** platform by Sprinklenet.

[Knowledge Spaces](https://sprinklenet.com/knowledge-spaces/) is Sprinklenet's governed knowledge and AI application layer. Developers use the public API to call approved bots, maintain conversation sessions, and inspect public rate-limit policy.

## Start Here

1. Register for a developer account at <https://spaces.sprinklenet.com/register>.
2. Sign in to the Knowledge Spaces console.
3. Open **Account Settings** and generate the **Organization API Key**.
4. Copy the key when it is shown. It is only displayed once.
5. Call a bot through the public API:

```bash
curl -X POST https://spaces.sprinklenet.com/api/bots/YOUR_BOT_ID/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"session_id": "quickstart-001", "text": "Hello Knowledge Spaces"}'
```

## Public Contract

- OpenAPI: [`openapi/knowledge-spaces-public.yaml`](openapi/knowledge-spaces-public.yaml)
- Quickstart: [`docs/quickstart.md`](docs/quickstart.md)
- Overview: [`docs/overview.md`](docs/overview.md)
- Data sovereignty roadmap: [`docs/sovereignty-roadmap.md`](docs/sovereignty-roadmap.md)
- Curl example: [`examples/curl-chat.sh`](examples/curl-chat.sh)
- JavaScript example: [`examples/javascript-chat.mjs`](examples/javascript-chat.mjs)
- Python example: [`examples/python_chat.py`](examples/python_chat.py)

## What you can build

- Conversational, cited answers over private document sets
- Multi-model LLM applications with a single integration
- Governed AI features with plan-gated role-based access, audit logging, and guardrails

## Authentication

Send the organization key in the `X-API-Key` header:

```http
X-API-Key: ks_live_...
```

## Current Public Endpoints

- `POST /api/bots/{bot_id}/chat`
- `GET /api/bots/{bot_id}/chat?session_id=...`
- `GET /api/sessions/{session_id}`
- `PUT /api/sessions/{session_id}/context`
- `POST /api/sessions/{session_id}/end`
- `DELETE /api/sessions/{session_id}`
- `GET /api/rate-limit/info`

## Contact

Platform access and partnership: hello@sprinklenet.com
