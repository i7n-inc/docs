---
id: reviews
title: Run Reviews
slug: /reviews
sidebar_position: 6
---

# Run Reviews

:::info Coming soon
Full guide to the three review paths (`atx review`, `atx review request`,
MCP `review_changes` / `request_review`), when to use each, and how to
iterate on blocking issues until the rating passes your merge gate.

Provisional reference:

- **`atx review`** — reviews file changes captured by a Claude Code hook
  in the current session.
- **`atx review request --prompt "..."`** — ad-hoc scope: a file glob,
  a commit range, staged changes, or a pasted PR diff. No automated
  PR fetch.
- Add `--worktree <name>` to either to review a named worktree.
:::
