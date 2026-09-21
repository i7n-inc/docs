---
id: learnings
title: Learnings
slug: /learnings
---

# Learnings

ATX persists project Learnings—resolved issues, reviewer feedback, and project
conventions—in SQLite. Approved Learnings are attached to an agent and are
included dynamically when ATX assembles later prompts.

## Review Learnings

Open **Projects**, select a project, then open its **Knowledge Graph** tab. The
Knowledge Graph groups the project's Learnings, including pending items and
approved Learnings already attached to an agent. Filter by status, target
agent, or text before approving or rejecting a pending Learning.

The global **Knowledge Graph** is an approved-only view of Learnings across
projects. It supports project, agent, and text filters; pending Learnings remain
visible only in their project context. An individual agent's **Knowledge Graph**
tab shows the approved Learnings attached to that agent.

## Inspect from the CLI

```bash
atx project learnings list
atx project learnings list --status pending
atx project learnings recommendations
```

`recommendations` lists agent-update recommendations produced from accumulated
Learnings.

## Approve or reject

Approve a pending Learning to attach it to its recommended agent. If no
recommendation is available, specify the target agent:

```bash
atx project learnings approve <learning-id>
atx project learnings approve <learning-id> --agent <agent-name>
```

Use `atx project learnings reject <learning-id>` to reject a pending Learning.
Only pending Learnings can be approved or rejected. Prompt-time injection makes
the approved guidance available to later reviews.

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
