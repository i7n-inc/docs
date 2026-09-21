---
id: installation
title: Installation
slug: /installation
sidebar_position: 2
---

# Installation

**Download ATX directly from the GitHub releases page:
[github.com/i7n-inc/atx-releases/releases/latest](https://github.com/i7n-inc/atx-releases/releases/latest)**

ATX runs on **macOS** and **Linux**. Windows is out of scope.

## Prerequisites

- **`gh` CLI**: a hard runtime dependency. ATX shells out to `gh` for
  every GitHub interaction (issue lookups, PR context, diffs). Install
  from [cli.github.com](https://cli.github.com/) and authenticate with
  `gh auth login`.
- **A supported LLM provider**: Anthropic API key, an active `claude
  login` session, an OpenAI API key or ChatGPT/Codex subscription
  authenticated through the `openai` provider, AWS Bedrock credentials,
  or a reachable LiteLLM proxy. See [Providers](/providers).
- **Git**: for repositories ATX reviews.

## Install

ATX ships as a single static binary. No token or signup is required. Every asset
on the releases page is downloadable unauthenticated.

1. Go to **[github.com/i7n-inc/atx-releases/releases/latest](https://github.com/i7n-inc/atx-releases/releases/latest)**.
2. Download the asset matching your OS and architecture:

   | Platform | Asset |
   |---|---|
   | macOS (Apple Silicon) | `atx-<VERSION>-darwin-arm64` |
   | macOS (Intel) | `atx-<VERSION>-darwin-amd64` |
   | Linux (x86_64) | `atx-<VERSION>-linux-amd64` |
   | Linux (arm64) | `atx-<VERSION>-linux-arm64` |

3. Make it executable and move it to any directory on your `PATH`
   (for example `~/.local/bin`):

   ```bash
   chmod +x atx-*-*-*
   mv atx-*-*-* ~/.local/bin/atx
   ```

4. (Optional) Verify the checksum against `checksums.txt` from the same
   release:

   ```bash
   sha256sum -c checksums.txt --ignore-missing
   ```

## Verify

```bash
atx version
```

## Upgrading

Once installed, ATX updates itself in place:

```bash
atx update
```

The command reads the same public manifest, swaps the binary, and
restarts the daemon if it was running. As long as `atx` is on your
`PATH` and lives in a directory you own, no elevated privileges are
required.
