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
- **Cost caveat**: Bedrock routes through the Claude CLI subprocess,
  which does not report cost. Reviews show `review_cost_usd=0`; check
  AWS billing.
- Anthropic-family models only for now.
