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
- the model catalog covers multiple Bedrock vendors, including Anthropic,
  Amazon Nova, Meta Llama, Mistral, Cohere, AI21, and DeepSeek
- ATX uses two runtime paths today:
  - Anthropic models stay on the Claude CLI path
  - non-Anthropic Bedrock models use the in-process Bedrock Converse path

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

## Initialize a project on AWS

```bash
cd /path/to/your/repo
atx project init --provider=bedrock
```

## Notes

- `atx provider models list bedrock` and the dashboard Models page now
  show bundled metadata across supported Bedrock vendors, not just
  Anthropic-hosted models.
- Runtime behavior depends on the model family:
  - Anthropic on Bedrock still goes through the Claude CLI path, so review
    runs report `review_cost_usd=0` and you should reconcile cost in AWS.
  - Non-Anthropic Bedrock models go through the Bedrock Converse path,
    which supports text generation, streaming, basic tool use, and ATX
    cost accounting.
- The Bedrock Converse path does not yet cover every feature ATX supports
  on the Anthropic path. Prompt caching, extended thinking, and MCP
  bridging remain deferred there.
