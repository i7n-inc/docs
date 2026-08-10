---
id: ollama
title: Ollama
slug: /providers/ollama
---

# Ollama (local)

## Official docs

- Ollama Docs: [ollama.com/docs](https://ollama.com/docs)

```bash
atx provider add ollama --base-url http://localhost:11434/v1
atx model add ollama <slug> [--lab <lab>]
atx provider models list ollama
atx project init --provider=ollama --model=<slug>
```

Ollama is user-managed and ships with zero model rows. Register every slug you
want ATX to route. Lab resolution uses explicit `--lab`, then the slug's known
model family, then `unknown`. All inference runs locally; reviews report
`cost_usd=0`.

## Dynamic model catalog

Ollama is one of ATX's two dynamic, user-managed provider catalogs. Its
supported labs, models, and slugs are the rows you register for your
installation with `atx model add`. ATX does not auto-import Ollama's model
list.
