---
id: bedrock-review
title: Bedrock Project Review
slug: /runbooks/bedrock-review
---

# Bedrock Project Review

This runbook takes a fresh repository from Bedrock credential setup to a
first ATX review pinned to Bedrock.

## 1. Add Bedrock credentials

```bash
atx provider add bedrock \
  --aws-access-key AKIA... \
  --aws-secret-key ... \
  --aws-region us-east-1
```

If your AWS session requires a session token, include
`--aws-session-token` as well.

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

For known Anthropic Bedrock ARNs, the catalog can show lab, context
window, thinking support, and bundled pricing metadata.

## 7. Know the Bedrock cost caveat

Review-time cost still reports `0` for Bedrock-backed runs because the
Claude CLI subprocess does not return billing data. Use AWS billing for
actual spend, and use the ATX dashboard for review flow and catalog
inspection.
