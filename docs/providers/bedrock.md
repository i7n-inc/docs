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

## Option 2: select a shared AWS profile

Use a named profile for AWS SSO, `credential_process`, assume-role, or shared
credentials-file authentication:

```bash
aws sso login --profile engineering
atx provider add bedrock --profile engineering --aws-region us-east-1
```

- A selected profile takes precedence over ambient AWS profiles, environment
  credentials, web identity, and ECS credentials. It still honors
  `AWS_CONFIG_FILE` and `AWS_SHARED_CREDENTIALS_FILE`.
- If the selected SSO session expires, renew it with
  `aws sso login --profile engineering` and restart the daemon.
- The saved profile and static access-key credentials are mutually exclusive.

## Option 3: use the AWS default credential chain

When no static credentials or named profile are saved, ATX resolves the normal
AWS SDK credential chain at runtime. This supports environment credentials,
shared profiles and SSO, web identity, ECS, IMDS, and assume-role credentials.
Select Bedrock explicitly and provide a region when your AWS configuration does
not already contain one:

```bash
export AWS_REGION=us-east-1
atx project init --provider=bedrock
```

## Optional: Bedrock API key for Mantle Responses

```bash
atx provider add bedrock \
  --api-key <bedrock-api-key> \
  --aws-region us-east-1
```

Alternatively, export `AWS_BEARER_TOKEN_BEDROCK` and `AWS_REGION` before
starting the daemon. ATX checks the environment variable before a persisted
Bedrock API key.

Bearer credentials apply only to `openai.gpt-*` models and take precedence for
the Mantle Responses path. When no bearer is configured, Mantle uses the same
AWS SigV4 resolution as the other Bedrock runtime paths. The API-key and static
AWS credential flags cannot be mixed in one `provider add` invocation.

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
  - `openai.gpt-*` models use Bedrock Mantle Responses. ATX records token usage
    and catalog pricing under the `bedrock` provider. Use AWS billing as spend
    truth.
- ATX automatically applies each Bedrock alias's Responses protocol,
  context-window limit, and temperature compatibility. These overrides do not
  affect direct OpenAI or OpenRouter versions of the same model.
- The Bedrock Converse path does not yet cover every feature ATX supports
  on the Anthropic path. Prompt caching, extended thinking, and MCP
  bridging remain deferred there.
