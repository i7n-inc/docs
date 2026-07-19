---
id: other-api-keys
title: Other API-key providers
slug: /providers/other-api-keys
---

# Other API-key providers

Gemini, OpenRouter, Together, Groq, and Lilac all follow the same
pattern:

```bash
atx provider add gemini --api-key AIzaSy...
# accepts optional --base-url for a compatible gateway
```

Auto-detected env vars: `GEMINI_API_KEY`, `OPENROUTER_API_KEY`,
`TOGETHER_API_KEY`, `GROQ_API_KEY`. Restart the daemon after exporting.

Gemini wire quirk: auth is a `?key=` query parameter, not an
Authorization header. ATX handles this transparently.
