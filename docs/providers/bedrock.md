---
id: bedrock
title: AWS Bedrock
slug: /providers/bedrock
---

# AWS Bedrock

```bash
atx provider add bedrock \
  --aws-access-key AKIA... --aws-secret-key ... \
  [--aws-session-token ...] --aws-region us-east-1
```

- Credentials are validated via `ListFoundationModels` before persist.
- Detection priority: explicit `auth.json` → `CLAUDE_CODE_USE_BEDROCK=1`
  + region env → `~/.aws/credentials`. The SDK default chain
  (IAM role / SSO) is NOT probed; named profiles are out of scope.
- `atx project init --provider=bedrock` is supported when you want to pin
  initialization to Bedrock explicitly.
- **Cost caveat**: Bedrock routes through the Claude CLI subprocess,
  which does not report cost. Reviews show `review_cost_usd=0`; check
  AWS billing.
- Catalog metadata is richer than the runtime cost signal. For known
  Anthropic Bedrock ARNs, ATX now fills in lab, context window, thinking,
  and bundled pricing metadata in model catalog views.
- That means `atx provider models list bedrock` and the dashboard Models
  page can show useful Bedrock model details even though runtime review
  cost still reports `0`.
- Anthropic-family models only for now.
