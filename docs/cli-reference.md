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
| `atx project init --mcp=disabled` | Initialize a project but leave the ATX MCP surface disabled |
| `atx project mcp enable` | Re-enable the ATX MCP surface for the current project |
| `atx project mcp disable` | Disable MCP review entry points for the current project |
| `atx project mcp status` | Show whether MCP is enabled for the current project |
| `atx project list` | List all registered projects |
| `atx project agents` | List agents for a project |
| `atx project reviews list` | List review groups for a project |
| `atx project reviews show <review-id>` | Show one review group and its member tasks |
| `atx project memory list` | List learnings for a project |
| `atx review` | Review session changes (via Claude Code hook) |
| `atx review request --prompt "..."` | On-demand review with custom prompt |
| `atx provider add <name>` | Add a provider |
| `atx provider sync <name>` | Refresh a provider's model list (e.g. LiteLLM) |
| `atx provider models list [<provider>]` | Inspect the model catalog for one provider or by upstream lab |
