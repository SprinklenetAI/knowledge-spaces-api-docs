# Overview

Knowledge Spaces gives developers a governed API surface for AI applications backed by an organization's approved knowledge, bot configuration, and conversation controls.

The first public API surface is intentionally small:

- Bot chat through `POST /api/bots/{bot_id}/chat`
- Chat history by session id
- Session read, context update, end, and delete operations
- Public rate-limit metadata

Developers register at <https://spaces.sprinklenet.com/register>, create or join an organization, and generate one Organization API Key from the console settings page. The key is shown once and is stored hashed by the platform.

## Request Shape

Bot chat expects `session_id` and `text`:

```json
{
  "session_id": "quickstart-001",
  "text": "Hello Knowledge Spaces"
}
```

- `session_id` — string, 1–100 chars. Reuse it to continue a conversation.
- `text` — string, 1–10000 chars. The end-user message.
- `context` — optional. A string or a JSON object of extra per-turn context.
- `stream` — optional boolean. When `true`, the reply is returned as
  Server-Sent Events instead of a single JSON body.

Do not send `message`; the production API expects `text`.

## Base URL

```text
https://spaces.sprinklenet.com/api
```

## Auth Header

```http
X-API-Key: ks_live_...
```
