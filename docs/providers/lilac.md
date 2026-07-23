---
id: lilac
title: Lilac
slug: /providers/lilac
---

# Lilac (API key)

## Official docs

- Lilac Docs: [docs.getlilac.com](https://docs.getlilac.com/)

```bash
atx provider add lilac --api-key ...
```

- Base URL defaults to `https://api.getlilac.com/v1` (OpenAI-compatible).
- API-key provider with per-token billing — synced rows report real
  `cost_usd` for each review.
- Accepts optional `--base-url` if you point at a compatible gateway.

Model discovery:

```bash
atx provider sync lilac
```

ATX ships a bundled Lilac catalog snapshot for offline init; `sync`
refreshes it against the live `/models` endpoint.

:::caution[Restart the daemon after adding credentials]
```bash
atx server stop && atx server start
```
:::
