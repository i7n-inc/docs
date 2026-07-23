---
id: together
title: Together
slug: /providers/together
---

# Together AI (API key)

## Official docs

- Together AI Docs: [docs.together.ai/docs/introduction](https://docs.together.ai/docs/introduction)

```bash
export TOGETHER_API_KEY=...
# or
atx provider add together --api-key ...
```

Accepts optional `--base-url` for a compatible gateway. Together speaks
the OpenAI-compatible `/models` endpoint, which ATX uses for model
discovery on `atx provider sync together`.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
