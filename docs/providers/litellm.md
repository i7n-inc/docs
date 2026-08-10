---
id: litellm
title: LiteLLM
slug: /providers/litellm
---

# LiteLLM (self-hosted proxy)

## Official docs

- LiteLLM Docs: [docs.litellm.ai](https://docs.litellm.ai/)

```bash
atx provider add litellm --base-url http://host:4000 [--api-key sk-...]
atx model add litellm <slug> [--lab <lab>]
atx provider models list litellm
atx project init --provider=litellm --model=<slug>   # --model required
```

- Env trigger: `LITELLM_BASE_URL` (plus optional `LITELLM_API_KEY`;
  empty key is legal for proxies without `master_key`).
- Base URL is live-probed against `/v1/models` before persist.
- ATX does not import LiteLLM's model list, lab metadata, or pricing.
- Registered rows start with unknown pricing. Lab resolution uses explicit
  `--lab`, then the slug's known model family, then `unknown`.

## Dynamic model catalog

LiteLLM is one of ATX's two dynamic, user-managed provider catalogs. It ships
with zero model rows, and its supported labs, models, and slugs are the rows you
register for your installation with `atx model add`. ATX does not auto-import
the proxy's `/models` response.

```bash
atx provider models list litellm
atx provider models list --lab <lab>
atx provider models show litellm <slug>
```
