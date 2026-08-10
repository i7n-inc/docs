---
id: openrouter
title: OpenRouter
slug: /providers/openrouter
---

# OpenRouter (API key)

## Official docs

- OpenRouter Docs: [openrouter.ai/docs/quickstart](https://openrouter.ai/docs/quickstart)

```bash
export OPENROUTER_API_KEY=sk-or-...
# or
atx provider add openrouter --api-key sk-or-...
```

Accepts optional `--base-url` if you route through a compatible gateway.

## Supported models

This is a static, vetted catalog. Models are added only after evaluations and
integration testing pass for an ATX release. ATX does not import OpenRouter's
full marketplace.

### Alibaba lab

| Model | OpenRouter slug |
|---|---|
| Qwen3 Coder Next | `qwen/qwen3-coder-next` |
| Qwen3 Coder Plus | `qwen/qwen3-coder-plus` |
| Qwen3.8 Max | `qwen/qwen3.8-max` |

### Amazon lab

| Model | OpenRouter slug |
|---|---|
| Nova 2 Lite | `amazon/nova-2-lite-v1` |
| Nova Premier | `amazon/nova-premier-v1` |

### Anthropic lab

| Model | OpenRouter slug |
|---|---|
| Claude Fable 5 | `anthropic/claude-fable-5` |
| Claude Haiku 4.5 | `anthropic/claude-haiku-4.5` |
| Claude Opus 4.8 | `anthropic/claude-opus-4.8` |
| Claude Opus 5 | `anthropic/claude-opus-5` |
| Claude Sonnet 4.6 | `anthropic/claude-sonnet-4.6` |
| Claude Sonnet 5 | `anthropic/claude-sonnet-5` |

### Cohere lab

| Model | OpenRouter slug |
|---|---|
| Command A | `cohere/command-a` |

### DeepSeek lab

| Model | OpenRouter slug |
|---|---|
| DeepSeek v4 Flash | `deepseek/deepseek-v4-flash` |
| DeepSeek v4 Pro | `deepseek/deepseek-v4-pro` |

### Google lab

| Model | OpenRouter slug |
|---|---|
| Gemini 2.5 Pro | `google/gemini-2.5-pro` |
| Gemini 3.1 Pro (preview) | `google/gemini-3.1-pro-preview` |
| Gemini 3.5 Flash | `google/gemini-3.5-flash` |
| Gemini 3.6 Flash | `google/gemini-3.6-flash` |

### Meta lab

| Model | OpenRouter slug |
|---|---|
| Llama 4 Maverick | `meta-llama/llama-4-maverick` |
| Muse Spark 1.2 | `meta/muse-spark-1.2` |

### MiniMaxAI lab

| Model | OpenRouter slug |
|---|---|
| MiniMax M2.5 | `minimax/minimax-m2.5` |
| MiniMax M2.7 | `minimax/minimax-m2.7` |
| MiniMax M3 | `minimax/minimax-m3` |

### Mistral lab

| Model | OpenRouter slug |
|---|---|
| Mistral Large 2512 | `mistralai/mistral-large-2512` |
| Mistral Medium 3.5 | `mistralai/mistral-medium-3-5` |

### MoonshotAI lab

| Model | OpenRouter slug |
|---|---|
| Kimi K2 Thinking | `moonshotai/kimi-k2-thinking` |
| Kimi K2.5 | `moonshotai/kimi-k2.5` |
| Kimi K2.6 | `moonshotai/kimi-k2.6` |
| Kimi K3 | `moonshotai/kimi-k3` |

### NVIDIA lab

| Model | OpenRouter slug |
|---|---|
| Nemotron 3 Ultra 550B A55B | `nvidia/nemotron-3-ultra-550b-a55b` |

### OpenAI lab

| Model | OpenRouter slug |
|---|---|
| GPT-5.4 | `openai/gpt-5.4` |
| GPT-5.4 mini | `openai/gpt-5.4-mini` |
| GPT-5.5 | `openai/gpt-5.5` |
| GPT-5.6 Luna | `openai/gpt-5.6-luna` |
| GPT-5.6 Sol | `openai/gpt-5.6-sol` |
| GPT-5.6 Terra | `openai/gpt-5.6-terra` |

### xAI lab

| Model | OpenRouter slug |
|---|---|
| Grok 4.20 | `x-ai/grok-4.20` |
| Grok 4.3 | `x-ai/grok-4.3` |

### ZAI lab

| Model | OpenRouter slug |
|---|---|
| GLM 4.7 | `z-ai/glm-4.7` |
| GLM 5 | `z-ai/glm-5` |
| GLM 5.1 | `z-ai/glm-5.1` |
| GLM 5.2 | `z-ai/glm-5.2` |

Run `atx provider models list openrouter` to inspect the installed catalog.

:::caution[Restart the daemon after exporting]
```bash
atx server stop && atx server start
```
:::
