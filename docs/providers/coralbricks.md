---
id: coralbricks
title: CoralBricks
slug: /providers/coralbricks
---

# CoralBricks (API key)

CoralBricks is an OpenAI-compatible hosted inference provider. The base
URL is fixed and configured automatically; an operator-supplied
`--base-url` override is accepted for LiteLLM proxy / compatible-gateway
scenarios.

## Official docs

- CoralBricks: [coralbricks.ai](https://coralbricks.ai)

```bash
export CORALBRICKS_API_KEY=...
# or (vendor-doc alias, honored as a fallback)
export CORAL_API_KEY=...
# or
atx provider add coralbricks --api-key <key>
```

Populate either env var and the daemon auto-detects at start time.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::

## Approved models

This is a static, vetted catalog. Models are added only after evaluations and
integration testing pass for an ATX release. Credential validation may probe
`/v1/models`, but the response is not imported into the catalog.

### MoonshotAI lab

| Model | Provider slug |
|---|---|
| Kimi K3 | `kimi-k3` |

### ZAI lab

| Model | Provider slug |
|---|---|
| GLM 5.2 | `glm-5.2-fp4` |

Choose one of the approved slugs explicitly:

```bash
atx provider add coralbricks --api-key <key>
atx provider models list coralbricks
atx project init --provider=coralbricks --model=kimi-k3
```

Run `atx provider models show coralbricks <slug>` for full catalog metadata.
