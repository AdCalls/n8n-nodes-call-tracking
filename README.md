# AdCalls n8n Integration

Integrate AdCalls call tracking events directly into your n8n workflows using the AdCalls trigger node.

## Prerequisites

- An active AdCalls account with the n8n integration enabled via the AdCalls dashboard.
- Once the integration is enabled, you will receive an **authorization token**. This token is required to authenticate requests from n8n.

## Getting Started

1. **Add credentials in n8n** — Navigate to n8n and enter your AdCalls authorization token as credentials.

2. **Create a new workflow** — Set up a new workflow in n8n and search for the **AdCalls** trigger node, then select it.

3. **Configure the trigger** — After your credentials are verified, select the event that should trigger the workflow.

4. **Test the integration** — Click **Execute Event** in n8n to register the webhook, then open the AdCalls dashboard. Under the n8n integration section, a new webhook entry will appear (refresh the page if needed). Click the webhook and press **Test**. A successful response confirms your workflow is ready.
