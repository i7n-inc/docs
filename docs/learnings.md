---
id: learnings
title: Learnings
slug: /learnings
---

# Learnings

ATX persists project Learnings.

<section className="learning-flow" aria-labelledby="learning-flow-title">
  <div className="learning-flow__intro">
    <div className="learning-flow__eyebrow">How specialists improve automatically</div>
    <h2 id="learning-flow-title">Every review strengthens the next one</h2>
    <div className="learning-flow__copy">
      Learnings give each specialist durable, project-specific guidance. ATX loads
      only that specialist's approved project Learnings, so the guidance improves
      future reviews without mixing in pending or other specialists' Learnings.
    </div>
  </div>
  <ol className="learning-flow__steps" aria-label="Learning improvement flow">
    <li className="learning-flow__step learning-flow__step--before">
      <span className="learning-flow__number" aria-hidden="true">1</span>
      <div className="learning-flow__profile">
        <span className="learning-flow__avatar" aria-hidden="true">AR</span>
        <div>
          <span>Specialist</span>
          <strong>architecture-reviewer</strong>
        </div>
      </div>
      <div className="learning-flow__empty" aria-label="No approved project Learnings loaded">
        <span>No approved guidance loaded</span>
        <code>.learnings = []</code>
      </div>
      <strong>Reviews without project guidance</strong>
      <span>Starts from a clean specialist prompt.</span>
    </li>
    <li className="learning-flow__step learning-flow__step--focus">
      <span className="learning-flow__number" aria-hidden="true">2</span>
      <div className="learning-flow__store" aria-label="Project Learnings">
        <span>Project Learnings</span>
      </div>
      <strong>ATX loads approved guidance</strong>
      <span>Only architecture-reviewer's approved Project Learnings enter its system prompt.</span>
    </li>
    <li className="learning-flow__step learning-flow__step--after">
      <span className="learning-flow__number" aria-hidden="true">3</span>
      <div className="learning-flow__profile">
        <span className="learning-flow__avatar" aria-hidden="true">AR</span>
        <div>
          <span>Specialist</span>
          <strong>architecture-reviewer</strong>
        </div>
      </div>
      <ul className="learning-flow__chips" aria-label="Approved Learning examples">
        <li>dependency direction</li>
        <li>service boundary</li>
        <li>migration compatibility</li>
      </ul>
      <strong>Produces a project-aware review</strong>
      <span>Applies those Learnings before returning findings.</span>
    </li>
  </ol>
  <div className="learning-flow__feedback">
    <span className="learning-flow__feedback-icon" aria-hidden="true">↺</span>
    <div>
      <strong>Feedback loop</strong>
      <span>Review outcomes return to Project Learnings to create or refine future Learnings, helping specialists improve automatically over time.</span>
    </div>
  </div>
</section>

## Inspect Learnings from the CLI

```bash
atx project learnings list
atx project learnings list --status pending
atx project learnings recommendations
```

`recommendations` lists agent-update recommendations produced from accumulated
Learnings.

## Review Learnings in the Knowledge Graph

Open **Projects**, select a project, then open its **Knowledge Graph** tab. The
Knowledge Graph groups the project's Learnings, including pending items and
approved Learnings already attached to an agent. Filter by status, target
agent, or text before approving or rejecting a pending Learning.

The global **Knowledge Graph** is an approved-only view of Learnings across
projects. It supports project, agent, and text filters; pending Learnings remain
visible only in their project context. An individual agent's **Knowledge Graph**
tab shows the approved Learnings attached to that agent.

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
