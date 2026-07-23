---
id: specialists
title: Specialists
slug: /specialists
---

# Specialists

ATX generates a specialist fleet for each project during
`atx project init`. These specialists are the project-specific agents
used for review, investigation, planning, and targeted follow-up tasks.

`atx project init` does more than register a repo. It analyzes the
codebase, generates the fleet, wires Claude Code integration files, and
registers the ATX MCP surface for the project. When OpenCode is present,
ATX also registers itself in the project's OpenCode MCP config.

## What a specialist fleet means

Each project gets one `leader` plus a set of generated specialists.

- the `leader` owns the overall review loop and decides which specialists
  should look at a task
- each specialist is biased toward a different concern such as
  architecture, test coverage, APIs, data flow, or a project-specific
  subsystem
- the fleet is project-specific, so names and scopes differ across repos
  instead of coming from one static global template

This is adversarial in the useful sense: ATX does not rely on one general
reviewer to notice everything. It uses multiple narrower reviewers with
different priorities so one agent can challenge another agent's blind
spots. That is why the fleet is better at surfacing architecture drift,
missing tests, unsafe assumptions, and convention violations than a
single generic review pass.

![Clawrium specialist fleet](/img/screenshots/clawrium-fleet.png)

## Inspect the fleet

```bash
atx project agents
atx project agents export --format=claude
```

Use the exported format when you want to wire the generated specialists
into Claude Code or another supported client.

The dashboard Agents view gives you the same fleet visually, including
each agent's role, current model, and detail modal.

## Change models and configure the fleet

You can change the fleet after init; it is not locked.

```bash
atx project agents edit <name> --model <slug>
atx project set-model <slug>
atx project agents rematch
```

- `agents edit --model` changes one specialist
- `set-model` rewrites the whole fleet to one exact model
- `agents rematch` keeps the fleet shape but re-picks best-fit models from
  the current catalog

## Re-match model choices

If your catalog changed or you want ATX to pick better-fit models for the
existing fleet, run:

```bash
atx project agents rematch
```

Recent dashboard updates also make this easier to inspect visually:

- the Agents view opens specialist details directly from the agent name
- model links jump into the Models catalog with the matching row selected
- rematch flows are organized around upstream labs instead of provider tabs

## Regenerate the fleet

If the codebase changed substantially, regenerate from scratch:

```bash
atx project init --force
```

Use this when the project picked up a new subsystem, language, or review
surface and the current specialists are no longer a good fit. Re-running
init with `--force` also refreshes the generated integration files for the
project.
