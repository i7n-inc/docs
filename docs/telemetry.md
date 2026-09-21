---
id: telemetry
title: Telemetry and Privacy
slug: /telemetry
---

# Telemetry and Privacy

ATX has two independent telemetry controls:

- Product analytics sends pseudonymous usage events and is enabled by default.
- OpenTelemetry tracing is configured separately through `telemetry.enabled`.

## What product analytics sends

When product analytics is enabled, ATX creates a random UUIDv4 in
`~/.config/atx/install_id`. It is an installation identifier, not a hostname,
account, MAC address, or project name.

Events include the ATX version, operating system, architecture, and limited
operational outcomes such as task duration and token totals. Project-scoped
events use a truncated hash of ATX's internal project identifier.

ATX does not send source code, file contents, prompts, diffs, API keys, or
personally identifiable information. Prompts captured for Learning extraction
remain in the local SQLite database.

## Disable product analytics

Disable analytics for one daemon start:

```bash
atx server start --send-usage-analytics=false
```

To keep it disabled in the global configuration, add this to
`~/.config/atx/config.yaml`:

```yaml
telemetry:
  analytics_enabled: false
```

When disabled, ATX emits no product-analytics events and does not create the
installation identifier file. Restart the daemon after changing configuration.

## Configure tracing separately

`telemetry.enabled` controls OpenTelemetry tracing, independently of product
analytics. Turning off analytics does not change tracing configuration.
