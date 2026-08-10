---
id: openai
title: OpenAI
slug: /providers/openai
---

# OpenAI

ATX supports OpenAI in two ways: subscription-backed browser login and
direct API keys. Both use the provider identity `openai`; `codex` is not a
separate provider.

## Official docs

- Codex CLI: [developers.openai.com/codex/cli](https://developers.openai.com/codex/cli)
- OpenAI API: [platform.openai.com/docs/overview](https://platform.openai.com/docs/overview)

## Subscription

```bash
atx provider add openai
atx project init --provider=openai
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

ATX chooses an explicit API key before stored or environment credentials,
then falls back to OpenAI OAuth.

## Supported models

This is a static, vetted catalog. Models are added only after evaluations and
integration testing pass for an ATX release.

### OpenAI lab

| Model | Provider slug |
|---|---|
| GPT-5.4 | `gpt-5.4` |
| GPT-5.4 mini | `gpt-5.4-mini` |
| GPT-5.5 | `gpt-5.5` |
| GPT-5.6 Luna | `gpt-5.6-luna` |
| GPT-5.6 Sol | `gpt-5.6-sol` |
| GPT-5.6 Terra | `gpt-5.6-terra` |

Run `atx provider models list openai` to inspect the installed catalog.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
