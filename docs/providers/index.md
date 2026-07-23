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

:::caution[Restart the daemon after adding env vars]
The daemon captures its environment at `atx server start`. Any credential
env var exported afterward is invisible until you restart:

```bash
atx server stop && atx server start
```
:::

## Pick a provider

| Provider | Best for | Setup |
|---|---|---|
| [Anthropic](/providers/anthropic) | Claude Code subscribers or Anthropic API users | `claude login` or API key |
| [AWS](/providers/aws) | AWS-native accounts using Bedrock-hosted models | Access keys or shared AWS config / SSO |
| [Gemini](/providers/gemini) | Google Gemini API | API key |
| [Groq](/providers/groq) | Groq low-latency inference | API key |
| [Lilac](/providers/lilac) | Lilac hosted API (`api.getlilac.com`) | API key |
| [LiteLLM](/providers/litellm) | Self-hosted proxy fronting many models | Base URL + optional API key |
| [Ollama](/providers/ollama) | Local inference | Base URL |
| [OpenAI](/providers/openai) | ChatGPT / Codex subscribers or direct OpenAI API users | Browser OAuth or API key |
| [OpenRouter](/providers/openrouter) | Model marketplace via OpenAI-compatible API | API key |
| [Together](/providers/together) | Together AI hosted open models | API key |
