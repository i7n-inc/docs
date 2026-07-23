---
id: openai
title: OpenAI
slug: /providers/openai
---

# OpenAI

ATX supports OpenAI in two ways: subscription-backed browser login and
direct API keys.

## Official docs

- Codex CLI: [developers.openai.com/codex/cli](https://developers.openai.com/codex/cli)
- OpenAI API: [platform.openai.com/docs/overview](https://platform.openai.com/docs/overview)

## Subscription

```bash
atx provider add openai
atx project init --provider=codex
```

This uses the browser OAuth flow for ChatGPT / Codex subscription users.
Token refresh is automatic. Subscription-backed reviews report
`cost_usd=0`.

## API key

```bash
export OPENAI_API_KEY=sk-...
# or
atx provider add openai --api-key sk-...
```

ATX routes API-key OpenAI through the standard `api.openai.com`
endpoint. Reviews report real `cost_usd` per token.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
