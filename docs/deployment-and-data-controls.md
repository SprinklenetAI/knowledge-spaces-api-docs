# Deployment and Data Controls

Knowledge Spaces is built for organizations that need control over where data lives, which model providers are used, and how AI activity is audited.

## Available on Every Plan

- An organization workspace created at registration
- Bring-your-own model keys for supported providers, set in the console
- Knowledge spaces, bots, documents, sessions, usage, and audit controls in the console
- An Organization API Key, provisioned at registration, for bot chat, streaming, and session APIs

Managed plans add Sprinklenet-managed models, so no provider key is needed.

## Enterprise Architecture Options

Enterprise deployments can run fully managed by Sprinklenet or in the customer's own AWS, Azure, or Google Cloud account. Customer-controlled storage and private model endpoints are scoped as part of Enterprise setup rather than offered as self-service settings, because they affect security, billing, support, and incident response.

- **Customer storage review**: customer-controlled object storage, region selection, encryption policy, and retention requirements
- **Private model endpoints**: OpenAI-compatible private endpoints, models in the customer's cloud, and egress controls

## Plans

- **Free BYOK**: you supply supported provider keys; Sprinklenet hosts the platform.
- **Builder BYOK**: production BYOK integrations with higher limits and usage controls.
- **Managed Team**: Sprinklenet-managed models, role-based access, audit logs, and priority support.
- **Enterprise**: advanced governance, pooled child-organization and OEM deployments, customer-controlled storage review, and private model endpoint architecture review.

Current pricing is on the [developer platform page](https://sprinklenet.com/developers/#pricing). To scope an Enterprise deployment, [contact Sprinklenet](https://sprinklenet.com/contact/).
