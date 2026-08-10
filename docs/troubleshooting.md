---
id: troubleshooting
title: Troubleshooting
slug: /troubleshooting
sidebar_position: 9
---

# Troubleshooting

Common first-run failures and fixes.

## `gh` not found

ATX requires the GitHub CLI. Install from
[cli.github.com](https://cli.github.com/) and run `gh auth login`.

## Fixing stale credentials

The daemon captures env vars at start time. If you exported credentials
after `atx server start`, the daemon doesn't see them. Restart:

```bash
atx server stop && atx server start
```

## Missing Claude credentials

None of the recognized credential sources are present. Configure at
least one:

- `ANTHROPIC_API_KEY` or `ANTHROPIC_AUTH_TOKEN`
- `CLAUDE_CODE_USE_BEDROCK=1` + `AWS_REGION` (Bedrock)
- `~/.claude/.credentials.json` (via `claude login`)

Then restart the daemon.

## Provider config

Start from [Providers and Authentication](/providers). If auto-detection
picked the wrong default, force a specific provider at project init:

```bash
atx project init --provider=<name> --force
```

## Project not initialized

If `atx review` or `atx review request` tells you the project must be
initialized first, run:

```bash
atx project init
```

ATX now fails fast with this guidance instead of falling through to a
misleading review/session error.

## MCP disabled for this project

If an MCP review call fails with `MCP disabled for this project`, re-enable
the ATX MCP surface for the current repository:

```bash
atx project mcp enable
```

You can check the current state with:

```bash
atx project mcp status
```

## Port conflict on 30000

Something else is bound to the daemon port. Stop the other process, or
check for a stale `atxd`:

```bash
atx server status
atx server stop
atx server start
```

## Project supervisor port conflict

Project supervisors use ports after the daemon port. If a project page is
unreachable but the daemon is healthy, stop and restart the project
supervisor:

```bash
atx project stop
atx project start
```

## Dashboard does not load

Confirm the daemon is running and open the dashboard URL directly:

```bash
atx server status
open http://localhost:30000/dashboard
```

If status shows the daemon is stopped, run `atx server start` again.

## Bedrock cost looks incomplete

Anthropic Bedrock models use the Claude CLI subprocess, which does not return
provider-native billing data; those runs report zero review cost. Other
non-Anthropic models use Converse and report cost when catalog pricing is known.
Bedrock `openai.gpt-*` models use Mantle Responses and report token usage, but
their pricing is unknown in `26.08.04`. Use AWS Cost Explorer as billing truth
for all three paths.

## Bedrock Mantle authentication fails

Mantle Responses requires a Bedrock bearer token and region. Persist them with
`atx provider add bedrock --api-key <bedrock-api-key> --aws-region us-east-1`,
or export them before restarting the daemon:

```bash
export AWS_BEARER_TOKEN_BEDROCK=<bedrock-api-key>
export AWS_REGION=us-east-1
atx server stop && atx server start
```

Mantle credentials apply only to `openai.gpt-*`. Other Bedrock models still
require AWS credentials or the AWS SDK credential chain.

## LiteLLM proxy fails

Re-add the proxy, register the exact slug, and confirm that it appears in the
local catalog before initializing the project:

```bash
atx provider add litellm --base-url "$LITELLM_BASE_URL" [--api-key "$LITELLM_API_KEY"]
atx model add litellm <model-slug> [--lab <lab>]
atx provider models list litellm
atx project init --provider=litellm --model=<model-slug> --force
```

Provider registration validates the configured endpoint through `/v1/models`
but does not import its response. If the proxy requires authentication, export
`LITELLM_API_KEY`, restart the daemon, then retry the review.
