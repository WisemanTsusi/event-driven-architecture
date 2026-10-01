# Event-Driven Architecture Reference

[![CI](https://img.shields.io/github/actions/workflow/status/WisemanTsusi/event-driven-architecture/ci.yml?branch=main&label=CI&logo=githubactions&logoColor=white)](https://github.com/WisemanTsusi/event-driven-architecture/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)

Provider-neutral event-driven backend reference demonstrating asynchronous integration, retries, idempotency, dead-letter handling, replay, and cloud-ready messaging.

## Features

- CloudEvents-inspired event envelope
- Event producer / broker / consumer separation
- Tenant, correlation, and causation context
- Exponential retry with bounded attempts
- Idempotent consumers
- Dead-letter queue behavior and replay
- Outbox pattern guidance
- Worker processing
- REST event publishing
- Tests, Docker, and GitHub Actions CI

## Run

```bash
npm install
npm run dev
```

Publish:
```bash
curl -X POST http://localhost:3000/api/v1/events/order-created -H "content-type: application/json" -d '{"tenantId":"tenant-1","orderId":"order-123"}'
```

Dead letters:
```bash
curl http://localhost:3000/api/v1/dead-letters
curl -X POST http://localhost:3000/api/v1/dead-letters/replay
```

## Cloud evolution

The `EventBroker` abstraction can be replaced with AWS EventBridge/SQS, Azure Event Grid/Service Bus, or Google Cloud Pub/Sub adapters.

This is a generic educational/reference implementation and contains no proprietary Ceribro™, Genius Geeks, Pochette™, or PixelForge™ source code.

See `docs/architecture.md`, `docs/event-contracts.md`, `docs/reliability.md`, and `docs/cloud-mapping.md`.

## License

MIT
