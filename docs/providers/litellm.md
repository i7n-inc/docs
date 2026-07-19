---
id: litellm
title: LiteLLM
slug: /providers/litellm
---

# LiteLLM (self-hosted proxy)

```bash
atx provider add litellm --base-url http://host:4000 [--api-key sk-...]
atx provider sync litellm
atx project init --provider=litellm --model=<slug>   # --model required
```

- Env trigger: `LITELLM_BASE_URL` (plus optional `LITELLM_API_KEY`;
  empty key is legal for proxies without `master_key`).
- Base URL is live-probed against `/v1/models` before persist.
- Real cost when the proxy publishes per-token rates: all-zero →
  `tier=free`, any non-zero → `paid`.
