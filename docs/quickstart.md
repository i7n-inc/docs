---
id: quickstart
title: Quickstart
slug: /quickstart
sidebar_position: 3
---

# Quickstart

Zero to first review in under 10 minutes. This walkthrough assumes you
have already installed the `atx` binary and the `gh` CLI (see
[Installation](/installation)).

## 1. Configure a provider

Pick the fastest available path:

<details>
<summary><strong>Option A — Anthropic API key</strong></summary>

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

Add the same line to your shell rc so it persists.
</details>

<details>
<summary><strong>Option B — Claude Code login</strong></summary>

If you already use Claude Code interactively:

```bash
claude login
```

Credentials land at `~/.claude/.credentials.json`. ATX picks them up
automatically.
</details>

<details>
<summary><strong>Option C — OpenAI Codex (ChatGPT subscription)</strong></summary>

```bash
atx provider add openai        # browser OAuth (PKCE)
```

Then, at project init: `atx project init --provider=codex`.
</details>

More options (Bedrock, LiteLLM, Gemini, Ollama, Groq) live in
[Providers and Authentication](/providers).

## 2. Start the daemon

```bash
atx server start
```

The daemon (`atxd`) listens on `http://localhost:30000`. It stays running
in the background; you generally start it once per machine.

:::caution Daemon inherits your env at start time
Credential env vars set in your shell **after** the daemon started will
NOT reach reviews. If you exported `ANTHROPIC_API_KEY` after
`atx server start`, restart the daemon:

```bash
atx server stop && atx server start
```
:::

## 3. Initialize a project

```bash
cd /path/to/your/repo
atx project init
```

ATX inspects the repo, generates a specialized agent fleet, and
registers the project with the daemon. Re-run with `--force` any time
your codebase has changed enough that you want the fleet regenerated.

## 4. Run your first review

Stage or edit some code, then:

```bash
atx review request --prompt "review my staged changes"
```

You'll get back a structured envelope: a rating, a list of blocking
issues (`B1`, `B2`, ...), and warnings. Fix the blockers, re-run, and
watch the rating climb.

If you use Claude Code with ATX hooks installed, `atx review` alone (no
`--prompt`) will pick up the file changes the current session
captured.

## 5. Open the dashboard

```bash
open http://localhost:30000/dashboard
```

See every registered project, its agent fleet, and every review session
with full logs and Mermaid sequence diagrams. Details in
[Dashboards](/dashboards).

## Where next

- [Providers and Authentication](/providers) — more provider options.
- [Run Reviews](/reviews) — the difference between `atx review` and
  `atx review request`, iterating on blockers.
- [Troubleshooting](/troubleshooting) — first-run failures and fixes.
