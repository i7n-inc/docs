---
id: aws
title: AWS
slug: /providers/aws
---

# AWS

ATX uses AWS Bedrock as the model surface for AWS-hosted models.

## Official docs

- AWS Bedrock: [docs.aws.amazon.com/bedrock/](https://docs.aws.amazon.com/bedrock/)

## What AWS support means in ATX

- model access is through Bedrock
- project initialization can be pinned with `atx project init --provider=bedrock`
- the model catalog contains 17 approved aliases from Alibaba, Amazon,
  Anthropic, MiniMaxAI, MoonshotAI, OpenAI, and ZAI
- ATX chooses one of three runtime paths by model family:
  - Anthropic models stay on the Claude CLI path
  - other non-Anthropic Bedrock models use the in-process Bedrock Converse path
  - `openai.gpt-*` models use Bedrock Mantle Responses

## Option 1: access key + secret key

```bash
atx provider add bedrock \
  --aws-access-key AKIA... --aws-secret-key ... \
  [--aws-session-token ...] --aws-region us-east-1
```

- Credentials are validated via `ListFoundationModels` before persist.
- Include `--aws-session-token` when you are using temporary AWS
  credentials.

## Option 2: shared AWS config or SSO

ATX can also work through the shared AWS config path that the Claude CLI
and AWS SDK read, including AWS SSO sessions.

1. Configure AWS access for the shell environment you will use.
2. If you use SSO, run:

```bash
aws sso login
```

3. Export the Bedrock trigger and region before starting the daemon:

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
```

4. Start or restart the daemon:

```bash
atx server stop && atx server start
```

This path relies on the shared AWS credentials/config and SSO cache that
the underlying tooling already knows how to read.

## Option 3: Bedrock API key for Mantle Responses

```bash
atx provider add bedrock \
  --api-key <bedrock-api-key> \
  --aws-region us-east-1
```

Alternatively, export `AWS_BEARER_TOKEN_BEDROCK` and `AWS_REGION` before
starting the daemon. ATX checks the environment variable before a persisted
Bedrock API key.

Mantle credentials are used only for `openai.gpt-*` models. Configure AWS
credentials separately if the same installation also runs Anthropic or
Converse-backed Bedrock models. The API-key and AWS access-key flag sets cannot
be mixed in one `provider add` invocation, but separate invocations preserve
both credential contracts.

## Supported models

This is a static, vetted catalog. Models are added only after evaluations and
integration testing pass for an ATX release. Bedrock's live model list does not
expand it.

### Alibaba lab

| Model | Bedrock slug |
|---|---|
| Qwen3 Coder Next | `qwen.qwen3-coder-next` |

### Amazon lab

| Model | Bedrock slug |
|---|---|
| Nova 2 Lite | `us.amazon.nova-2-lite-v1:0` |

### Anthropic lab

| Model | Bedrock slug |
|---|---|
| Claude Haiku 4.5 | `us.anthropic.claude-haiku-4-5-20251001-v1:0` |
| Claude Opus 4.8 | `us.anthropic.claude-opus-4-8` |
| Claude Opus 5 | `us.anthropic.claude-opus-5` |
| Claude Sonnet 4.6 | `us.anthropic.claude-sonnet-4-6` |
| Claude Sonnet 5 | `us.anthropic.claude-sonnet-5` |

### MiniMaxAI lab

| Model | Bedrock slug |
|---|---|
| MiniMax M2.5 | `minimax.minimax-m2.5` |

### MoonshotAI lab

| Model | Bedrock slug |
|---|---|
| Kimi K2 Thinking | `moonshot.kimi-k2-thinking` |
| Kimi K2.5 | `moonshotai.kimi-k2.5` |

### OpenAI lab

| Model | Bedrock slug | Context window | Temperature |
|---|---|---:|---|
| GPT-5.4 | `openai.gpt-5.4` | 272,000 | Sent |
| GPT-5.5 | `openai.gpt-5.5` | 272,000 | Omitted automatically |
| GPT-5.6 Sol | `openai.gpt-5.6-sol` | 1,050,000 | Omitted automatically |
| GPT-5.6 Terra | `openai.gpt-5.6-terra` | 1,050,000 | Omitted automatically |
| GPT-5.6 Luna | `openai.gpt-5.6-luna` | 1,050,000 | Omitted automatically |

### ZAI lab

| Model | Bedrock slug |
|---|---|
| GLM 4.7 | `zai.glm-4.7` |
| GLM 5 | `zai.glm-5` |

Run `atx provider models list bedrock` to inspect the installed catalog.

## Initialize a project on AWS

```bash
cd /path/to/your/repo
atx project init --provider=bedrock
```

To pin initialization and reviews to a Mantle model, provide its exact Bedrock
alias:

```bash
atx project init \
  --provider=bedrock \
  --model=openai.gpt-5.5
```

## Notes

- `atx provider models list bedrock` and the dashboard Models page show the
  same release-versioned Bedrock rows listed above.
- Runtime behavior depends on the model family:
  - Anthropic on Bedrock still goes through the Claude CLI path, so review
    runs report `review_cost_usd=0` and you should reconcile cost in AWS.
  - Other non-Anthropic Bedrock models go through the Bedrock Converse path,
    which supports text generation, streaming, basic tool use, and ATX cost
    accounting when catalog pricing is known.
  - `openai.gpt-*` models use Bedrock Mantle Responses. ATX records their token
    usage under the `bedrock` provider, but their dollar pricing is unknown in
    `26.08.04`; use AWS billing as spend truth.
- ATX automatically applies each Bedrock alias's Responses protocol,
  context-window limit, and temperature compatibility. These overrides do not
  affect direct OpenAI or OpenRouter versions of the same model.
- The Bedrock Converse path does not yet cover every feature ATX supports
  on the Anthropic path. Prompt caching, extended thinking, and MCP
  bridging remain deferred there.
