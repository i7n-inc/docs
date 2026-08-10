---
id: gemini
title: Gemini
slug: /providers/gemini
---

# Google Gemini (API key)

## Official docs

- Gemini API: [ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)

```bash
export GEMINI_API_KEY=AIzaSy...
# or
atx provider add gemini --api-key AIzaSy...
```

Accepts optional `--base-url` for a compatible gateway (e.g. LiteLLM
proxy).

Wire quirk: Gemini authenticates via a `?key=` query parameter rather
than an `Authorization` header. ATX handles this transparently.

## Supported models

This is a static, vetted catalog. Models are added only after evaluations and
integration testing pass for an ATX release.

### Google lab

| Model | Provider slug |
|---|---|
| Gemini 2.5 Pro | `gemini-2.5-pro` |
| Gemini 3.1 Pro (preview) | `gemini-3.1-pro-preview` |
| Gemini 3.5 Flash | `gemini-3.5-flash` |
| Gemini 3.6 Flash | `gemini-3.6-flash` |

Adding credentials does not import the upstream model list. Run
`atx provider models list gemini` to inspect the installed catalog.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
