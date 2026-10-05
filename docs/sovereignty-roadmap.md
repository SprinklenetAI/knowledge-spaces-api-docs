# Data Sovereignty Roadmap

Knowledge Spaces is designed for organizations that need control over where data lives, which model providers are used, and how governed AI activity is audited.

This page separates what developers can use now from the capabilities planned for higher-control deployments.

## Available Now

- Organization-level workspaces created at registration
- Bring-your-own model keys for supported providers in console settings
- Sprinklenet-managed models on managed plans
- Knowledge Spaces, bots, documents, sessions, usage, and audit controls in the console
- Organization API Key, provisioned at registration, for bot chat, streaming, and session APIs

## Planned Controls

### Customer-Controlled Storage

Enterprise and OEM deployments will support customer-owned storage targets for source files and derived artifacts, starting with S3-compatible object storage.

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

- **Free BYOK**: you supply supported provider keys; Sprinklenet hosts the platform.
- **Builder BYOK**: production BYOK integrations with higher limits and usage controls.
- **Managed Team**: Sprinklenet-managed models, role-based access, audit logs, and priority support.
- **Enterprise**: advanced governance, managed child organizations and OEM deployments, customer-controlled storage review, and private model endpoint review. SSO and SCIM are on the roadmap.

Current pricing is on the [developer platform page](https://sprinklenet.com/developers/#pricing).

## Availability

Customer-controlled storage and self-hosted model endpoints affect security, billing, support, and incident response, so they are configured through a managed Enterprise engagement rather than self-service settings. [Contact Sprinklenet](https://sprinklenet.com/contact/) to scope them.
