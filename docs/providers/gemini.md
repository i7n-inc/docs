---
id: gemini
title: Gemini
slug: /providers/gemini
---

# Google Gemini (API key)

```bash
export GEMINI_API_KEY=AIzaSy...
# or
atx provider add gemini --api-key AIzaSy...
```

Accepts optional `--base-url` for a compatible gateway (e.g. LiteLLM
proxy).

Wire quirk: Gemini authenticates via a `?key=` query parameter rather
than an `Authorization` header. ATX handles this transparently.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
