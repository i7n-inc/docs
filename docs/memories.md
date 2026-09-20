---
id: memories
title: Memories
slug: /memories
---

# Memories

ATX persists project Learnings such as resolved issues, reviewer feedback, and
project conventions in SQLite. Approved Learnings are attached to an agent and
are included dynamically when ATX assembles later prompts.

## Review Learnings

Open **Projects**, select a project, then open its **Knowledge Graph** tab. It
shows all Learnings for that project, including pending items and approved nodes
already attached to an agent. Filter by status, target agent, or text before
approving or rejecting a pending Learning.

The global **Knowledge Graph** is an approved-only inventory across projects.
It supports project, agent, and text filters; pending Learnings remain visible
only in their project context. An individual agent's Knowledge Graph tab shows
the approved nodes attached to that agent.

## Inspect from the CLI

```bash
atx project learnings list
atx project learnings list --status pending
atx project learnings recommendations
```

`recommendations` lists agent-update recommendations produced from
accumulated learnings.

## Approve or reject

Approve a pending Learning to attach it to its recommended agent. If no
recommendation is available, specify the target agent:

```bash
atx project learnings approve <learning-id>
atx project learnings approve <learning-id> --agent <agent-name>
```

Use `atx project learnings reject <learning-id>` to reject a pending Learning.
Only pending Learnings can be approved or rejected. The former
`atx project learnings apply` command is removed; prompt-time injection replaces
that separate apply step.

## Refine pending Learnings

Refinement evaluates pending Learnings for durable, project-relevant guidance.
Start with a non-mutating preview, then apply its verdicts when ready:

```bash
atx project learnings refine --dry-run
atx project learnings refine --apply --yes
```

Scheduled refinement is enabled by default for projects. Check or change its
state with:

```bash
atx project learnings refine status
atx project learnings refine disable
atx project learnings refine enable
atx project learnings refine interval 6h
```
