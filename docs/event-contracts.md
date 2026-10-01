# Event Contracts

The event envelope is CloudEvents-inspired and contains `id`, `type`, `source`, `subject`, `time`, `specversion`, `datacontenttype`, `tenantId`, `correlationId`, `causationId`, and `data`.

Example:

```json
{
  "id": "uuid",
  "type": "order.created",
  "source": "order-service",
  "subject": "orders/order-123",
  "time": "2026-10-01T12:00:00.000Z",
  "specversion": "1.0",
  "datacontenttype": "application/json",
  "tenantId": "tenant-1",
  "correlationId": "corr-123",
  "causationId": "corr-123",
  "data": {"orderId":"order-123"}
}
```

Prefer additive evolution. Treat breaking changes as versioned contracts.
