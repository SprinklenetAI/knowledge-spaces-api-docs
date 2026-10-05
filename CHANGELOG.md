# Changelog

## 1.1.0 (October 2026)

- Documented the chat response format: `text` is an object with `content`, `resources`, and `isComplete`.
- Documented streaming on `POST /bots/{bot_id}/chat` with `"stream": true`, including the `receive-message`, `done`, and `error` events. Removed the separate streaming path from the contract.
- Documented `Authorization: Bearer` as an alternative to `X-API-Key`.
- Documented that the Organization API Key is provisioned at registration and rotated with **Regenerate Key**.
- Added complete error, rate-limit header, and session response documentation.
- Updated all examples to use a new UUID per conversation and added a JavaScript streaming example.
- Updated plan names to match current pricing.

## 1.0.0 (July 2026)

- Initial public documentation: bot chat, conversation history, sessions, and rate-limit policy.
