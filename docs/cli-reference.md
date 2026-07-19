---
id: cli-reference
title: CLI Reference
slug: /cli-reference
sidebar_position: 10
---

# CLI Reference

Quick reference for the most-used commands. Run `atx <command> --help`
for the full flag list.

| Command | Description |
|---------|-------------|
| `atx server start` | Start the ATX daemon |
| `atx server stop` | Stop the ATX daemon |
| `atx server status` | Check daemon status |
| `atx project init` | Initialize ATX for current project |
| `atx project list` | List all registered projects |
| `atx project agents` | List agents for a project |
| `atx project memory list` | List learnings for a project |
| `atx review` | Review session changes (via Claude Code hook) |
| `atx review request --prompt "..."` | On-demand review with custom prompt |
| `atx provider add <name>` | Add a provider |
| `atx provider sync <name>` | Refresh a provider's model list (e.g. LiteLLM) |

