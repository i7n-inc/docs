---
id: bedrock-review
title: Bedrock Project Review
slug: /runbooks/bedrock-review
---

# Bedrock Project Review

This runbook takes a fresh repository from Bedrock credential setup to a
first ATX review pinned to Bedrock.

## 1. Add Bedrock credentials

For Anthropic and Converse-backed models, configure AWS credentials:

```bash
atx provider add bedrock \
  --aws-access-key AKIA... \
  --aws-secret-key ... \
  --aws-region us-east-1
```

If your AWS session requires a session token, include
`--aws-session-token` as well.

For an `openai.gpt-*` model on Bedrock Mantle Responses, configure a Bedrock
API key instead:

```bash
atx provider add bedrock \
  --api-key <bedrock-api-key> \
  --aws-region us-east-1
```

You can also export `AWS_BEARER_TOKEN_BEDROCK` and `AWS_REGION`. Configure the
two credential contracts in separate `provider add` invocations if the same
installation runs both kinds of model.

## 2. Start the daemon

```bash
atx server start
```

If you changed environment-backed credentials after the daemon was
already running, restart it before continuing.

## 3. Initialize the project on Bedrock

```bash
cd /path/to/your/repo
atx project init --provider=bedrock
```

This keeps project initialization pinned to the Bedrock provider.

To pin the fleet to Mantle Responses, initialize with an exact model alias:

```bash
atx project init \
  --provider=bedrock \
  --model=openai.gpt-5.5
```

## 4. Make or stage some changes

Edit code in your repository, or stage the diff you want reviewed.

## 5. Run a review

```bash
atx review request --prompt "review my staged changes"
```

If you are using Claude Code hooks in the active session, `atx review`
works too after initialization.

## 6. Check model metadata when needed

To inspect the local catalog entry that ATX has for Bedrock models, run:

```bash
atx provider models list bedrock
```

The catalog shows 17 release-approved rows from Alibaba, Amazon, Anthropic,
MiniMaxAI, MoonshotAI, OpenAI, and ZAI. See the
[AWS provider guide](/providers/aws#supported-models) for the full matrix.

## 7. Know the Bedrock cost caveat

Anthropic-on-Bedrock runs report zero ATX review cost because the Claude CLI
does not return provider billing data. Converse-backed models report cost only
when the Bedrock catalog contains pricing. Mantle Responses reports token usage
under the `bedrock` provider, but its five GPT aliases have unknown pricing in
`26.08.04`. Use AWS billing as spend truth.
