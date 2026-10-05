# Knowledge Spaces API Documentation

Knowledge Spaces is the platform layer for governed AI applications. It manages multi-tenant access, knowledge ingestion and retrieval, conversation memory, evaluation, escalation safety, governance, and operational observability. Developers configure bots and knowledge in the console and deliver conversations through the API.

## Contents

- [Overview](overview.md): authentication, sessions, request and response formats, streaming, errors, and rate limits
- [Quickstart](quickstart.md): from registration to a first answer
- [Data sovereignty roadmap](sovereignty-roadmap.md)
- [OpenAPI contract](../openapi/knowledge-spaces-public.yaml)
- Examples: [cURL](../examples/curl-chat.sh), [JavaScript](../examples/javascript-chat.mjs), [JavaScript streaming](../examples/javascript-stream.mjs), [Python](../examples/python_chat.py)

## Access Model

- **Organization API Key**: one key per organization, used for bot chat, conversation history, and session APIs.
- **Console sign-in**: bots, knowledge spaces, documents, model keys, members, and governance settings are managed in the console.

## Integration Pattern

1. Register at <https://spaces.sprinklenet.com/register>.
2. Regenerate the Organization API Key in Account Settings and store it server-side.
3. Mint a UUID for each new conversation.
4. Call `POST /bots/{bot_id}/chat` with that `session_id` and the user's `text`.
5. Reuse the same `session_id` to continue the conversation.

Learn more at [sprinklenet.com/developers](https://sprinklenet.com/developers/).
