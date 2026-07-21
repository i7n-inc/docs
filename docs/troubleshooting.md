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
- `CLAUDE_CODE_USE_VERTEX=1` + `ANTHROPIC_VERTEX_PROJECT_ID` (Vertex)
- `~/.claude/.credentials.json` (via `claude login`)

Then restart the daemon.

## Provider config

Start from [Providers and Authentication](/providers). If auto-detection
picked the wrong default, force a specific provider at project init:

```bash
atx project init --provider=<name> --force
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

Bedrock routes through the Claude CLI subprocess, so ATX may not receive
provider-native token cost metadata for every run. Treat the dashboard's
Bedrock cost fields as operational guidance, not billing truth. Use AWS
Cost Explorer for billing reconciliation.

## LiteLLM proxy fails

Confirm the proxy base URL and model slug before initializing the project:

```bash
curl -sS "$LITELLM_BASE_URL/health"
atx project init --provider=litellm --model=<model-slug> --force
```

If the proxy requires authentication, export `LITELLM_API_KEY`, restart
the daemon, then retry the review.
