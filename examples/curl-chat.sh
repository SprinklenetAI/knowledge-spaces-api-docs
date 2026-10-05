#!/usr/bin/env bash
set -euo pipefail

: "${KS_API_KEY:?Set KS_API_KEY}"
: "${KS_BOT_ID:?Set KS_BOT_ID}"

# One new UUID per conversation. Reuse it to continue the same conversation.
KS_SESSION_ID="${KS_SESSION_ID:-$(uuidgen | tr '[:upper:]' '[:lower:]')}"
echo "session_id: ${KS_SESSION_ID}" >&2

curl -sS -X POST "https://spaces.sprinklenet.com/api/bots/${KS_BOT_ID}/chat" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${KS_API_KEY}" \
  -d '{"session_id": "'"${KS_SESSION_ID}"'", "text": "What should I read first?"}'
