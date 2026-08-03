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

## No bundled catalog

CoralBricks has no bundled model catalog — the model list is fully
dynamic. Run `atx provider sync coralbricks` to fetch every model your
key exposes via `GET /v1/models`. There is no allowlist prune;
re-syncing reflects any account-side enable/disable change on the
next run.

Because the catalog is dynamic, `atx project init --provider=coralbricks`
requires `--model=<slug>` (mirrors `litellm` / `ollama`):

```bash
atx provider add coralbricks --api-key <key>
atx provider sync coralbricks
atx project init --provider=coralbricks --model=<slug>
```
