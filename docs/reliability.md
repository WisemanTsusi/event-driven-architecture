# Reliability

- **Retry:** bounded exponential backoff for transient failures.
- **Idempotency:** safely tolerate duplicate delivery using durable event IDs in production.
- **Dead letters:** preserve exhausted events for inspection instead of silently dropping them.
- **Replay:** replay only after the underlying consumer failure is understood.
- **Outbox:** persist pending events transactionally with business state.
- **Ordering:** only rely on ordering explicitly provided by the transport/topology.
- **Exactly-once:** design consumers for duplicate delivery even when infrastructure offers stronger semantics.
