---
id: openrouter
title: OpenRouter
slug: /providers/openrouter
---

# OpenRouter (API key)

```bash
export OPENROUTER_API_KEY=sk-or-...
# or
atx provider add openrouter --api-key sk-or-...
```

Accepts optional `--base-url` if you route through a compatible gateway.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
