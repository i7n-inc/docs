---
id: providers
title: Providers
slug: /providers
---

# Providers

ATX supports multiple LLM providers. Credentials live at
`~/.config/atx/auth.json` (mode `0600`). The daemon auto-detects
providers at start time using this priority when picking a default:

**Claude CLI → OpenAI OAuth/subscription → `ANTHROPIC_API_KEY` → `OPENAI_API_KEY`**

Only providers that are both authenticated **and** represented in the model
catalog are available for routing. The tie-breaker above only decides the
default when nothing is specified. Each provider guide lists its supported
labs, model names, and exact provider slugs.

:::info[Static and vetted by default]
Model lists for Anthropic, OpenAI, Gemini, AWS Bedrock, OpenRouter, Lilac, and
CoralBricks are static, vetted release data. ATX updates them only after model
evaluations and integration testing pass for a release. A provider's live
`/models` response does not expand this allowlist.

Only LiteLLM and Ollama model sets vary by installation. You register those
models explicitly with `atx model add`; ATX does not auto-import them.
:::

:::caution[Restart the daemon after adding env vars]
The daemon captures its environment at `atx server start`. Any credential
env var exported afterward is invisible until you restart:

```bash
atx server stop && atx server start
```
:::

## Pick a provider

| Provider | Supported labs | Setup |
|---|---|---|
| [Anthropic](/providers/anthropic) | Anthropic | `claude login` or API key |
| [AWS](/providers/aws) | Alibaba, Amazon, Anthropic, MiniMaxAI, MoonshotAI, ZAI | Access keys or shared AWS config / SSO |
| [CoralBricks](/providers/coralbricks) | MoonshotAI, ZAI | API key |
| [Gemini](/providers/gemini) | Google | API key |
| [Lilac](/providers/lilac) | MiniMaxAI, MoonshotAI, ZAI | API key |
| [LiteLLM](/providers/litellm) | User-managed | Base URL + optional API key |
| [Ollama](/providers/ollama) | User-managed | Base URL |
| [OpenAI](/providers/openai) | OpenAI | Browser OAuth or API key |
| [OpenRouter](/providers/openrouter) | Alibaba, Amazon, Anthropic, Cohere, DeepSeek, Google, Meta, MiniMaxAI, Mistral, MoonshotAI, NVIDIA, OpenAI, xAI, ZAI | API key |

Groq and Together credential connectors exist, but they have no approved
catalog rows in ATX 26.08.03 and are not currently routable.
