---
id: anthropic
title: Anthropic
slug: /providers/anthropic
---

# Anthropic

ATX supports Anthropic in two ways: a Claude Code subscription login and
direct Anthropic API keys.

## Official docs

- Claude Code: [docs.anthropic.com/en/docs/claude-code/overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- Claude API: [docs.anthropic.com/en/api/getting-started](https://docs.anthropic.com/en/api/getting-started)

## Subscription

If you already use Claude Code interactively:

```bash
claude login
```

Credentials land at `~/.claude/.credentials.json`. ATX picks them up at
daemon start.

Use this path when you want to reuse your Claude Code subscription
rather than paying per-call API usage.

## API key

```bash
export ANTHROPIC_API_KEY=sk-ant-...
# or
atx provider add anthropic --api-key sk-ant-...
```

ATX also accepts `ANTHROPIC_AUTH_TOKEN`.

Use this path when you want direct Anthropic API routing with standard
request billing.

## Supported models

This is a static, vetted catalog. Models are added only after evaluations and
integration testing pass for an ATX release.

### Anthropic lab

| Model | Provider slug |
|---|---|
| Claude Fable 5 | `claude-fable-5` |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` |
| Claude Opus 4.8 | `claude-opus-4-8` |
| Claude Opus 5 | `claude-opus-5` |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` |
| Claude Sonnet 5 | `claude-sonnet-5` |

Provider setup validates credentials; it does not import Anthropic's complete
model list. Run `atx provider models list anthropic` to inspect the installed
catalog.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
