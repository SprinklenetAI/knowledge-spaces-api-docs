# Overview

Knowledge Spaces gives developers a governed API for AI applications backed by an organization's approved knowledge, bot configuration, and conversation controls. Bots, knowledge spaces, documents, models, and governance settings are configured in the console; the API delivers conversations.

## Base URL

```text
https://spaces.sprinklenet.com/api
```

## Authentication

Every request except `GET /rate-limit/info` requires the Organization API Key, sent in either header form:

```http
X-API-Key: ks_live_...
Authorization: Bearer ks_live_...
```

Each organization is created with one key at registration. The platform stores only a hash, so the full key cannot be retrieved later. To obtain a usable copy, or to rotate the key, open **Account Settings**, find **Organization API Key**, and select **Regenerate Key**. Regenerating replaces the previous key immediately.

A key reaches only the bots and sessions its own organization owns. Requests for any other bot or session return `404`.

## Sessions

`session_id` is a string you control (1 to 100 characters). The first chat call with a new value starts a session; later calls with the same value continue it, and the bot answers with the earlier turns in context.

Mint a new UUID for every conversation, for example with `crypto.randomUUID()` or `uuid.uuid4()`. Do not use fixed or predictable values such as sample strings, user emails, or row numbers: predictable IDs can merge separate conversations into one thread.

## Send a Message

`POST /bots/{bot_id}/chat`

```json
{
  "session_id": "9f1c2d7e-3b4a-4c5d-8e6f-0a1b2c3d4e5f",
  "text": "What is our refund policy?"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `session_id` | string | Yes | 1 to 100 characters. One UUID per conversation. |
| `text` | string | Yes | 1 to 10,000 characters. The end user's message. |
| `context` | string or object | No | Extra per-turn context. |
| `stream` | boolean | No | `true` returns Server-Sent Events. |

The field is `text`, not `message`.

### Response

```json
{
  "success": true,
  "text": {
    "content": "Refunds are available within 30 days of purchase.",
    "resources": [
      { "type": "document", "document": { "id": "...", "title": "Refund Policy", "read": true } }
    ],
    "isComplete": true
  }
}
```

- `text.content` is the answer.
- `text.resources` lists the documents or web pages the answer drew on, when source display is enabled for the bot. Each item is either `{ "type": "document", "document": { ... } }` or `{ "type": "url", "url": { "url", "title", "favicon" } }`.
- If the organization has no usable model key configured, the call can return `200` with a configuration message in `text.content`. Add a provider key in the console, or move to a managed-model plan.

### Streaming

Set `"stream": true` and the response becomes `text/event-stream`:

```text
event: receive-message
data: {"content":"Refunds are","isComplete":false}

event: receive-message
data: {"content":"Refunds are available within 30 days.","isComplete":true,"resources":[]}

event: done
data: {}
```

- Each `receive-message` frame carries the full answer so far in `content`, not a delta. Replace the displayed text with each frame.
- The frame with `"isComplete": true` is the final answer.
- `done` closes the stream. If a failure occurs after streaming starts, an `error` event with `{ "message": "..." }` is sent instead.

See [`examples/javascript-stream.mjs`](../examples/javascript-stream.mjs).

## Read Conversation History

`GET /bots/{bot_id}/chat?session_id=...` returns the 10 most recent messages in the session, oldest first. Each message includes `role` (`user` or `assistant`), `text`, `resources`, and `createdAt`. Other fields may appear; ignore fields you do not use.

## Manage Sessions

| Call | Result |
|------|--------|
| `GET /sessions/{session_id}` | `data` with `session_id`, `chatbot_id`, `created_at`, `last_active_at`, `message_count`, `end_user_id`, `custom_context`, `status` |
| `PUT /sessions/{session_id}/context` | Sets `custom_context` (object) and `end_user_id` (string, up to 255 characters) |
| `POST /sessions/{session_id}/end` | Marks the session `ended`; the transcript is retained. Returns `400` if already ended. |
| `DELETE /sessions/{session_id}` | Deletes the session and its messages; returns `data.messages_deleted`. Use it for erasure requests. |

A session exists only after a chat call has used its `session_id`; before that, session calls return `404`.

## Errors

Errors use a consistent JSON envelope:

```json
{ "success": false, "message": "Invalid API key" }
```

| Status | Meaning |
|--------|---------|
| `400` | Malformed body, invalid bot ID format, or a missing required field |
| `401` | Missing, malformed, or invalid API key |
| `402` | The organization reached its usage limit for the billing period |
| `404` | The bot or session does not exist for your organization |
| `429` | Rate limit exceeded; wait for `Retry-After` seconds |
| `5xx` | Transient platform error; retry with exponential backoff |

Branch on the status code. Treat `message` as human-readable text that may change.

## Rate Limits

Responses carry standard rate-limit headers:

| Header | Meaning |
|--------|---------|
| `RateLimit-Limit` | Requests allowed in the current window |
| `RateLimit-Remaining` | Requests left in the current window |
| `RateLimit-Reset` | Seconds until the window resets |
| `Retry-After` | Seconds to wait, sent with `429` |

`GET /rate-limit/info` returns the published policy without authentication. Read the headers rather than hard-coding limits, and back off on `429`.

## Versioning

Breaking changes ship under a new major version and are announced in advance. New fields and endpoints are added without a version change, so write clients that ignore unknown fields. See the [changelog](../CHANGELOG.md).
