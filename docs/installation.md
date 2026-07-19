---
id: installation
title: Installation
slug: /installation
sidebar_position: 2
---

# Installation

ATX runs on **macOS** and **Linux**. Windows is out of scope.

## Prerequisites

- **`gh` CLI** — a hard runtime dependency. ATX shells out to `gh` for
  every GitHub interaction (issue lookups, PR context, diffs). Install
  from [cli.github.com](https://cli.github.com/) and authenticate with
  `gh auth login`.
- **A supported LLM provider** — Anthropic API key, an active `claude
  login` session, an OpenAI/Codex account, AWS Bedrock credentials, or a
  reachable LiteLLM proxy. See [Providers](/providers).
- **Git** — for repositories ATX reviews.

## Install

Visit [iteration.sh/try](https://iteration.sh/try), enter your work
email, and you'll receive a tokenized one-liner. Run it in your
terminal:

```bash
curl -fsSL "https://iteration.sh/install/<your-token>" | sh
```

The installer picks the right binary for your OS and architecture and
drops it into your `PATH`.

Verify:

```bash
atx --version
```

## Next

Head to the [Quickstart](/quickstart) to configure a provider, start the
daemon, and run your first review.
