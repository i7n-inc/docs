---
id: anthropic
title: Anthropic
slug: /providers/anthropic
---

# Anthropic (API key)

```bash
export ANTHROPIC_API_KEY=sk-ant-...
# or
atx provider add anthropic --api-key sk-ant-...
```

Also accepts `ANTHROPIC_AUTH_TOKEN`.

:::caution Restart the daemon after exporting
```bash
atx server stop && atx server start
```
:::
