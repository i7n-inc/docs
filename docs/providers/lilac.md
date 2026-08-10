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
- API-key provider with per-token billing where catalog pricing is available.
- Accepts optional `--base-url` if you point at a compatible gateway.

## Supported models

This is a static, vetted catalog. Models are added only after evaluations and
integration testing pass for an ATX release. Lilac's live model list does not
expand it.

### MiniMaxAI lab

| Model | Provider slug |
|---|---|
| MiniMax M3 | `minimaxai/minimax-m3` |

### MoonshotAI lab

| Model | Provider slug |
|---|---|
| Kimi K2.6 | `moonshotai/kimi-k2.6` |

### ZAI lab

| Model | Provider slug |
|---|---|
| GLM 5.2 | `zai-org/glm-5.2` |

Inspect the installed rows with:

```bash
atx provider models list lilac
```

The live `/models` response is not imported.

:::caution[Restart the daemon after adding credentials]
```bash
atx server stop && atx server start
```
:::
