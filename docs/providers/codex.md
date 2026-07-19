---
id: codex
title: OpenAI Codex
slug: /providers/codex
---

# OpenAI Codex (ChatGPT subscription)

```bash
atx provider add openai              # browser OAuth (PKCE)
atx project init --provider=codex    # [--model=gpt-5.2-codex] [--force]
```

Token refresh is automatic. Codex reviews report `cost_usd=0`
(subscription pricing tier).
