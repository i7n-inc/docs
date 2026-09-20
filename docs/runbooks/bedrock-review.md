---
id: bedrock-review
title: Bedrock Project Review
slug: /runbooks/bedrock-review
---

# Bedrock Project Review

This runbook takes a fresh repository from Bedrock credential setup to a
first ATX review pinned to Bedrock.

## 1. Add Bedrock credentials

Configure AWS credentials with either static keys or a selected shared profile:

```bash
atx provider add bedrock \
  --aws-access-key AKIA... \
  --aws-secret-key ... \
  --aws-region us-east-1
```

If your AWS session requires a session token, include
`--aws-session-token` as well.

For an SSO or shared AWS profile:

```bash
aws sso login --profile engineering
atx provider add bedrock --profile engineering --aws-region us-east-1
```

The selected profile is used in preference to ambient AWS credentials. If its
SSO session expires, run `aws sso login --profile engineering` again and restart
the daemon.

An `openai.gpt-*` model on Bedrock Mantle Responses can also use an optional
Bedrock API key:

```bash
atx provider add bedrock \
  --api-key <bedrock-api-key> \
  --aws-region us-east-1
```

You can also export `AWS_BEARER_TOKEN_BEDROCK` and `AWS_REGION`. Without a
bearer token, Mantle uses the same AWS SigV4 credential resolution as other
Bedrock models.

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
does not return provider billing data. Converse-backed models and Mantle
Responses report cost when their catalog row has pricing. Use AWS billing as
spend truth.
