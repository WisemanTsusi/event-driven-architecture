# Cloud Mapping

| Capability | AWS | Azure | Google Cloud |
|---|---|---|---|
| Event routing | EventBridge | Event Grid | Pub/Sub |
| Durable queue | SQS | Service Bus Queue | Pub/Sub subscription |
| Pub/sub | SNS / EventBridge | Service Bus Topics / Event Grid | Pub/Sub |
| Dead letters | SQS DLQ | Service Bus DLQ | Pub/Sub dead-letter topic |
| Serverless consumer | Lambda | Azure Functions | Cloud Run / Cloud Functions |
| Observability | CloudWatch / X-Ray | Azure Monitor / Application Insights | Cloud Monitoring / Trace |

Choose services based on delivery, ordering, latency, retention, filtering, integration, and operational requirements.
