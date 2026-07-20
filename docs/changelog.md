---
id: changelog
title: Changelog
slug: /changelog
sidebar_position: 10
---

# Changelog

Latest ATX releases. Full frozen archives live in
[`docs/releases/`](https://github.com/i7n-inc/atx/tree/main/docs/releases)
on the ATX repo.

## 26.07.05 — 2026-07-17

**Fixed**

- Memory refinement rewrite verdicts persist structured `new_summary` /
  `new_instruction` values instead of copying rationale text into
  `Summary`, preventing approved-memory corruption on rewrite actions
  (#755).
- Dashboard review rendering colors the status badge, unwraps the CLI
  review JSON envelope before rendering, and formats worker-eval content
  as structured HTML instead of raw blobs (#757).

**Docs**

- Execution plan for Group Tasks into Reviews under `.itx/747/00_PLAN.md`
  (#756).

## 26.07.04 — 2026-07-16

**Added**

- `pkg/templates` registry + `atx templates {list,show,export}` — seeded
  `pr-review-summary` v1 template becomes the single source of truth for
  the ATX Review Summary block in PR bodies. Wired into leader prompt,
  review envelope, and CLI text output (#726, closes #724).
- `atx project init` opportunistically registers ATX as an MCP server in
  the project's OpenCode config when `opencode` is on PATH. Fail-open on
  every branch; own only the `mcp.atx` key (#731, closes #725).
- Dashboard Review-detail page reorders sections and adds a **Final
  Review** parsed-markdown block. New cross-project **Reviews** tab at
  `/dashboard/reviews`, backed by `SQLiteStore.ListRecentTasks` and an
  `idx_tasks_updated_at` index (#742, closes #730).
- `atx project memory refine --limit N` and `--memory <learning-id>`
  subset flags, threaded end-to-end via a new `SubsetSelector`.
  Additive JSON fields; version stays `"3"` (#743, closes #727).

**Fixed**

- Final Review card renders the leader's markdown summary instead of the
  JSON envelope (#744).

## 26.07.03 — 2026-07-13

**Added**

- Dashboard design-system refresh — HSL-tokenized two-layer palette,
  self-hosted Inter + Instrument Serif fonts (~91 KB) embedded via
  `//go:embed`, primitive classes (`.btn`, `.card`, `.input`,
  `table.data`, `.pill`), motion tokens with
  `prefers-reduced-motion` guard (#721).

**Changed**

- Extracted `clearProviderEnv` into `internal/testutil/providerenv` and
  added `WithIsolatedConfig(t)` so provider tests cannot leak the
  maintainer's real `~/.config/atx/auth.json` (#722).

**Fixed**

- Dashboard Agents-tab model picker now filters `all_models` to
  providers the daemon actually has credentials for (#720, closes #707).
- Bundled Lilac catalog refreshed to the current four-model public
  snapshot; init-time stale-slug rejection + fallback-pricing regression
  coverage (#718, closes #711).

## 26.07.02 — 2026-07-10

**Added**

- Bulk provider-constrained rematch — `atx project agents rematch
  --provider <name>` re-runs model selection against a single provider's
  catalog. Shared `pkg/rematch` code path for CLI and REST; per-project
  single-writer lock; leader-last mutation ordering (#679, #683, #685,
  #686, #687).
- Custom (user-authored) agents — new `fleet_agents.source_kind` column;
  `POST` / `PATCH` / `DELETE` on custom rows; dashboard wizard and edit
  modal. Learnings survive deletion with `NULL` source (#383.1–.3, #694,
  #700, #704).
- Auto-minted planner specialist per project (`activation='on_demand'`),
  invoked via `atx review request --agent planner` or MCP
  `request_review.agent` (#691, #698).
- Per-review PostHog telemetry — `atx_task_completed`,
  `atx_task_failed`, `atx_task_cancelled` now carry `project_hash`,
  `provider`, `model`, `duration_ms`, tokens, `cost_usd`, and a
  closed-enum `error_category`. Cancelled-path cost rollup fixed
  (#672, #684).
- Per-model cost / token breakdown on task-completed / cancelled events
  (`per_model_breakdown[]`) — closed row schema, byte-stable ordering
  (#690, #693).
- `/dashboard/release-notes` page rendering customer-POV release notes
  from binary-embedded `internal/releasenotes/releases/*/ReleaseNotes.md`
  (#680, #708).

**Fixed**

- LiteLLM agents now route through the OpenAI Messages-API path so
  per-request tokens flow through the 4-bucket cost rollup — no more
  `cost_usd=0` against paid upstreams (#688, #689).
- `SelectBestFit` tiebreak gates by tag category to prevent cross-
  category model bleed (#699, #702).

## 26.07.01 — 2026-07-06

**BREAKING**

- Review response envelope v1 — MCP tool results (`review_changes`,
  `request_review`) and CLI `--format=json` output nest the review
  payload under `atx_review.*` with a fixed `caller_instructions` block.
  Version discriminator: `atx_review.version == "1"`. Scrapers pinned on
  pre-#507 top-level fields must re-address (#507, #654).
- `gh` CLI is now a hard-required runtime dependency. `atx server start`
  and `atx project init` refuse to start with `ErrGHNotFound` when the
  binary is missing. Every generated agent prompt gets a "no
  browser-driven GitHub scraping" clause (#342, #653).

**Added**

- LiteLLM as a first-class provider — `atx provider add litellm`
  (interactive + scripted), dashboard add dialog, `LITELLM_BASE_URL` env
  auto-detection, pre-persist probe of `/v1/models`, `/v1/model/info`
  catalog enrichment that promotes slugs to `PricingTier=paid` on any
  non-zero cost declaration (#675, #676, #677).
- Memory refinement — 8-phase rollout under PRD #388 turning ad-hoc
  learnings into a curated per-project memory store: dry-run classifier,
  manual `--apply` prune, refinement-driven recommendation binding,
  byte-for-byte undo, approved-memory protection, scheduled autopilot,
  on-demand REST trigger + telemetry, dashboard parity (#655–#662).
- Dashboard navigation — breadcrumbs on every page,
  `/dashboard/sitemap`, and a root-path redirect `/` → `/dashboard`
  (#650, #651).
