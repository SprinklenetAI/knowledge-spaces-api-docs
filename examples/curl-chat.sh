#!/usr/bin/env bash
set -euo pipefail

: "${KS_API_KEY:?Set KS_API_KEY}"
: "${KS_BOT_ID:?Set KS_BOT_ID}"

curl -X POST "https://spaces.sprinklenet.com/api/bots/${KS_BOT_ID}/chat" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${KS_API_KEY}" \
  -d '{"session_id": "quickstart-001", "text": "Hello Knowledge Spaces"}'
