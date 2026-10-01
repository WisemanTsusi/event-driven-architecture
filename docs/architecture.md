# Architecture

```text
HTTP Producer -> Event Factory -> Event Broker
                                      |
                    +-----------------+----------------+
                    |                                  |
              Order Worker                      Future Consumers
                    |
              Projection / Side Effect

Failure: Consumer -> Retry -> Dead Letter -> Inspect / Replay
```

The local broker is in-memory so the project runs without cloud credentials. Production adapters should implement the `EventBroker` interface.

For database-backed services, an outbox pattern can persist business state and an event record in one transaction, followed by a relay that publishes pending records.

Reliability concerns are explicit: bounded retries, idempotency, correlation/causation IDs, dead letters, replay, tenant context, and contract validation.
