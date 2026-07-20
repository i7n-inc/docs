---
id: openai
title: OpenAI (API Key)
slug: /providers/openai
---

# OpenAI (API Key)

```bash
export OPENAI_API_KEY=sk-...
# or
atx provider add openai --api-key sk-...
```

ATX routes API-key OpenAI through the standard `api.openai.com`
endpoint. Reviews report real `cost_usd` per token.

For the ChatGPT / Codex subscription flow (no API key required, browser
OAuth), see [OpenAI (Subscription)](/providers/codex).

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
