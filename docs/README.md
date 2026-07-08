# Knowledge Spaces API

Knowledge Spaces is the platform layer for governed AI applications. It manages multi-tenant access, knowledge ingestion and retrieval, conversation memory, evaluation, escalation safety, governance, and operational observability.

## Public Docs

- [Overview](overview.md)
- [Quickstart](quickstart.md)
- [Data sovereignty roadmap](sovereignty-roadmap.md)
- [OpenAPI](../openapi/knowledge-spaces-public.yaml)
- [Curl example](../examples/curl-chat.sh)
- [JavaScript example](../examples/javascript-chat.mjs)
- [Python example](../examples/python_chat.py)

## Access model

Most endpoints require an authenticated identity plus a relationship to the target organization:

- **Public**: no auth, public reads only
- **Authenticated**: signed-in user
- **Org Admin**: admin role within the target org
- **Organization API Key**: single organization-level key for bot chat and session APIs

## Integration patterns

1. Register at <https://spaces.sprinklenet.com/register>.
2. Generate the Organization API Key in console settings.
3. Call `POST /api/bots/{bot_id}/chat` with `session_id` and `text`.
4. Reuse the same `session_id` to continue a conversation.

Learn more about the platform at [sprinklenet.com/knowledge-spaces](https://sprinklenet.com/knowledge-spaces/).
