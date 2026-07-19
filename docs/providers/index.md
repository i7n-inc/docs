---
id: providers
title: Providers
slug: /providers
---

# Providers

ATX supports multiple LLM providers. Credentials live at
`~/.config/atx/auth.json` (mode `0600`). The daemon auto-detects
providers at start time using this priority when picking a default:

**Claude CLI → Codex OAuth → `ANTHROPIC_API_KEY` → `OPENAI_API_KEY`**

Note: all configured providers are enumerated for best-fit selection at
review time; the tie-breaker above only decides the default when nothing
is specified.

:::caution Restart the daemon after adding env vars
The daemon captures its environment at `atx server start`. Any credential
env var exported afterward is invisible until you restart:

```bash
atx server stop && atx server start
```
:::

## Pick a provider

| Provider | Best for | Setup |
|---|---|---|
| [Anthropic](/providers/anthropic) | Fastest path if you have an API key | Env var or `atx provider add` |
| [Claude Code login](/providers/claude-code) | You already use Claude Code interactively | `claude login` |
| [OpenAI Codex](/providers/codex) | ChatGPT subscription users | Browser OAuth |
| [AWS Bedrock](/providers/bedrock) | Enterprise / AWS-native accounts | AWS access key + region |
| [LiteLLM](/providers/litellm) | Self-hosted proxy fronting many models | Base URL + optional API key |
| [Other API-key providers](/providers/other-api-keys) | Gemini, OpenRouter, Together, Groq, Lilac | API key |
| [Ollama](/providers/ollama) | Local inference | Base URL |
