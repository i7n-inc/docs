---
id: troubleshooting
title: Troubleshooting
slug: /troubleshooting
sidebar_position: 9
---

# Troubleshooting

Common first-run failures and fixes.

## `gh: command not found`

ATX requires the GitHub CLI. Install from
[cli.github.com](https://cli.github.com/) and run `gh auth login`.

## Reviews fail with an env-capture hint

The daemon captures env vars at start time. If you exported credentials
after `atx server start`, the daemon doesn't see them. Restart:

```bash
atx server stop && atx server start
```

## `msg=missing_claude_credentials` at daemon start

None of the recognized credential sources are present. Configure at
least one:

- `ANTHROPIC_API_KEY` or `ANTHROPIC_AUTH_TOKEN`
- `CLAUDE_CODE_USE_BEDROCK=1` + `AWS_REGION` (Bedrock)
- `CLAUDE_CODE_USE_VERTEX=1` + `ANTHROPIC_VERTEX_PROJECT_ID` (Vertex)
- `~/.claude/.credentials.json` (via `claude login`)

Then restart the daemon.

## Provider setup confusion

Start from [Providers and Authentication](/providers). If auto-detection
picked the wrong default, force a specific provider at project init:

```bash
atx project init --provider=<name> --force
```

## Port 30000 already in use

Something else is bound to the daemon port. Stop the other process, or
check for a stale `atxd`:

```bash
atx server status
atx server stop
atx server start
```

:::info More to come
Bedrock cost caveats, LiteLLM proxy configuration, project supervisor
port conflicts (`30001+`), and dashboard access issues will be added
here.
:::
