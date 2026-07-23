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

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
