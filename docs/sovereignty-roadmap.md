# Data Sovereignty Roadmap

Knowledge Spaces is designed for organizations that need control over where data lives, which model providers are used, and how governed AI activity is audited.

This page separates what developers can use now from the capabilities planned for higher-control deployments.

## Available Now

- Organization-level workspaces created at registration
- Bring-your-own model keys for supported providers in console settings
- Sprinklenet-managed models on managed plans
- Knowledge Spaces, bots, documents, sessions, usage, and audit controls in the console
- Organization API Key for bot chat and session APIs

## Planned Controls

### Customer-Controlled Storage

Enterprise and OEM deployments should support customer-owned storage targets for source files and derived artifacts, starting with S3-compatible object storage.

Expected controls:

- Customer bucket or dedicated bucket per organization
- Region and residency selection
- Server-side encryption policy
- Optional customer-managed KMS key
- Egress and connector allowlists
- Storage usage reporting by organization

### Self-Hosted LLMs

Self-hosted and private-cloud model endpoints make sense for regulated teams that cannot send prompts or retrieved context to public model APIs.

Expected controls:

- OpenAI-compatible endpoint configuration
- Base URL, model ID, and auth header setup
- Health check before activation
- Per-organization provider policy
- Model capability metadata for chat, embeddings, and tool use
- Admin-only rollout with audit logging

## Plan Fit

- Free BYOK: customer supplies supported provider keys, Sprinklenet hosts the platform.
- Builder BYOK: production BYOK integrations with higher limits and usage controls.
- Managed Pro: Sprinklenet-managed models, users, roles, audit logs, and support.
- Enterprise / OEM: dedicated controls such as SSO, SCIM, customer storage, own cloud, and self-hosted models.

## Implementation Notes

Storage and self-hosted model configuration should be treated as Enterprise / OEM features until operational guardrails are in place. Both capabilities affect security, billing, support, and incident response, so they should not be exposed as simple free-tier toggles.
