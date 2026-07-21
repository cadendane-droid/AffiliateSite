# Instruction Changelog — owned by 05-meta

Every edit 05-meta makes to `agents/01-research.md` … `agents/04-seo.md` gets an entry here,
written BEFORE the edit is committed. No entry → the edit is a protocol violation and must be
reverted. Max three instruction changes per 05-meta run.

## Entry format

```
## YYYY-MM-DD — change NN (run: <agentRunId>)
- **File:** agents/0X-name.md
- **Rationale:** why, citing specific metrics/log evidence
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
