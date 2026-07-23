---
id: groq
title: Groq
slug: /providers/groq
---

# Groq (API key)

## Official docs

- Groq Docs: [console.groq.com/docs/overview](https://console.groq.com/docs/overview)

```bash
export GROQ_API_KEY=gsk_...
# or
atx provider add groq --api-key gsk_...
```

Accepts optional `--base-url` for a compatible gateway. Groq speaks the
OpenAI-compatible `/models` endpoint, which ATX uses for model discovery
on `atx provider sync groq`.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
