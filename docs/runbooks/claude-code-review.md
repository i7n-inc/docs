---
id: claude-code-review
title: Claude Code Project Review
slug: /runbooks/claude-code-review
---

# Claude Code Project Review

This runbook takes a fresh repository from Claude Code login to a first
ATX review.

## 1. Log into Claude Code

```bash
claude login
```

ATX reads the Claude credentials the next time the daemon starts.

## 2. Start the daemon

```bash
atx server start
```

If you exported provider-related environment variables after the daemon
 was already running, restart it before continuing.

## 3. Initialize the project

```bash
cd /path/to/your/repo
atx project init
```

ATX registers the repository and generates a specialist fleet for it.

## 4. Make or stage some changes

Edit code in your repository, or stage the diff you want reviewed.

## 5. Run a review

If you are using Claude Code with ATX hooks installed for the active
session, run:

```bash
atx review
```

If you want to request a one-shot review directly, run:

```bash
atx review request --prompt "review my staged changes"
```

## 6. Iterate until blockers are gone

ATX returns a rating plus blocking findings such as `B1` and `B2`. Fix
the blockers, then re-run the review.

Hook-driven reviews stay in the active session review. For repeated stateless
`atx review request` calls, ATX groups requests only when it can verify the
same objective; a different or ambiguous scope starts a new review. Pass
`--review <review-id>` when you need to attach a request to an active review in
the same project.

## 7. Inspect the result in the dashboard

Open:

```text
http://localhost:30000/dashboard
```

Check the project Reviews view when you want to see iteration history,
review outcomes, and task grouping.
