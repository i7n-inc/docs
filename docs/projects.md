---
id: projects
title: Projects
slug: /projects
---

# Projects

A **project** in ATX is a git repository registered with the daemon and
paired with a purpose-built agent fleet. This page covers registering,
listing, and re-generating projects.

## Initialize

Run in the root of your git repository:

```bash
atx project init
```

ATX inspects the codebase, generates a specialized agent fleet, and
registers the project with the daemon.

Common flags:

| Flag | Purpose |
|---|---|
| `--provider=<name>` | Force a specific provider (`anthropic`, `codex`, `bedrock`, `litellm`, ...) |
| `--model=<slug>` | Force a specific model slug (required with `--provider=litellm`) |
| `--force` | Regenerate the fleet from scratch |

Re-run with `--force` when your codebase has changed enough that the
existing fleet is no longer a good fit (major refactor, new language
mix, new subsystems).

## List

```bash
atx project list
```

Shows every registered project with status, agent count, and session
count.

## Agents

```bash
atx project agents                       # list agents for the current project
atx project agents export --format=claude
```

## Project-wide model override

Hand-edit `~/.config/atx/projects/<encoded-path>/config.yaml`:

```yaml
provider:
  model: anthropic.claude-sonnet-4-6
```

Applied to every system-generated agent on the next
`atx project init --force`; survives `--force`. User-overridden rows
keep their explicit model.

:::info More detail coming
End-to-end walkthrough of the generated fleet and everything ATX writes
to `.itx/` will land in a future revision.
:::
