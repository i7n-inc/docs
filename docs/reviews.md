---
id: reviews
title: Reviews
slug: /reviews
sidebar_position: 6
---

# Reviews

ATX supports three review entry points:

- `atx review` for Claude Code sessions that already captured file
  changes through hooks.
- `atx review request --prompt "..."` for explicit, on-demand review
  requests.
- MCP `review_changes` and `request_review` when ATX is wired into your
  editor or agent runtime.

## Pick the right path

| Path | Use it when | Notes |
|---|---|---|
| `atx review` | You are inside an active Claude Code session and want ATX to review the session's captured changes | No `--prompt` required |
| `atx review request --prompt "..."` | You want a one-shot review against staged changes, a diff, or an explicit request | Works without hook-captured session state |
| MCP `review_changes` | Your client already knows the changed files and wants the hook-style path | Same review envelope as CLI JSON |
| MCP `request_review` | Your client wants to send a free-form review request | Iterations auto-group into one active review block |

## `atx review`

Use `atx review` when Claude Code hooks have already captured the session
changes for the current project.

```bash
atx review
```

If the current repository has not been initialized yet, ATX now fails
fast and tells you to run:

```bash
atx project init
```

## `atx review request`

Use `atx review request` when you want to state the scope yourself.

```bash
atx review request --prompt "review my staged changes"
```

More targeted example:

```bash
atx review request \
  --prompt "review the Bedrock catalog wiring and dashboard models changes"
```

You can also target a named worktree from either CLI path:

```bash
atx review --worktree feature-branch
atx review request --worktree feature-branch --prompt "review my staged changes"
```

## What you get back

ATX returns a structured review with:

- live progress lines while the review is running
- a rating
- blocking findings (`B1`, `B2`, ...)
- warnings and suggestions
- the rendered markdown review
- cost and duration metadata in JSON mode

While the task is active, ATX now streams reviewer lifecycle progress to
the CLI and prints dashboard URLs as soon as the task is created, so you
can follow the review in the terminal or jump into the web UI.

Sample output:

```text
$ atx review request --prompt "review my staged changes"
Created review task task_01K17Y... for project /home/devashish/workspace/i7n/atx
Dashboard: http://localhost:30000/dashboard/reviews/rev_01K17Y...
Project:   http://localhost:30000/dashboard/projects/-home-devashish-workspace-i7n-atx

[leader] loading project context
[leader] selecting specialist reviewers
[architecture] reviewing changed interfaces
[tests] checking coverage and edge cases
[heartbeat] review still running...

Review complete
Rating: 4/5
Blocking: 0
Warnings: 2
```

Typical workflow:

1. Run the review.
2. Fix every blocking issue.
3. Re-run the review.
4. Repeat until the review is clean enough for your merge gate.

![ATX first review result](/img/screenshots/first-review.png)

## Iterating on the same review

Repeated `request_review` iterations now group into the same active
review block instead of creating a brand-new one every time. That keeps
the dashboard's Reviews view aligned with the actual review loop.

Example:

```bash
atx review request --prompt "review my staged changes"
# fix B1, B2
atx review request --prompt "iteration 2: re-review after fixing blocking issues"
```

You can also explicitly attach a task to a known review group:

```bash
atx review request --review rev-123 --prompt "final verification pass"
```

![ATX project reviews](/img/screenshots/dashboard-project-reviews.png)

## MCP behavior

The MCP tools return the same v1 review envelope as `atx review
--format=json`.

- `review_changes` is the MCP equivalent of the hook-driven review path.
- `request_review` is the MCP equivalent of `atx review request`.
- MCP progress notifications forward the same live progress lines that the
  CLI prints during a running review.

If MCP is disabled for the project, review calls fail with an actionable
message telling you to run:

```bash
atx project mcp enable
```

## Common failure modes

- `project not initialized`: run `atx project init`
- `MCP disabled for this project`: run `atx project mcp enable`
- `gh` missing: install and authenticate the GitHub CLI
- stale credentials after export: restart the daemon
