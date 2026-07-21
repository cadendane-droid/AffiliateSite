# Instruction Changelog — 05-meta's decision file

Every edit 05-meta makes to `agents/01-research.md` … `agents/04-seo.md` or
`agents/06-ai-search.md` gets an entry here, written BEFORE the edit is committed. No entry →
the edit is a FLAGRANT protocol violation and 07-meta-auditor reverts it. Max three
instruction changes per 05-meta run. **07-meta-auditor reviews every entry weekly against the
evidence available at its timestamp** — cite only sources that existed when you decided.

## Entry format

```
## <ISO-8601 UTC timestamp> — change NN (run: <agentRunId>)
- **File:** agents/0X-name.md
- **Rationale:** why — citing the exact decision-time sources consulted
  (metrics-snapshots/<file>.json, agent-runs.log lines/dates, experiment ids, issue numbers)
- **Diff:**
  ```diff
  - old line
  + new line
  ```
- **Rollback trigger:** the measurable condition under which this change is reverted
  (e.g. "publish success rate < 80% over next 5 runs" or "median words/article drifts
  outside 1400–2200")
```

---

## 2026-07-21 — change 00 (run: seed-2026-07-21)
- **File:** all agent instruction files
- **Rationale:** Initial versions created at site scaffold time. Baseline for all future diffs.
- **Diff:** n/a (initial commit)
- **Rollback trigger:** n/a
