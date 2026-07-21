# Metrics snapshots

Owned by **04-seo**. One file per run: `YYYY-MM-DD.json` with shape:

```json
{
  "date": "YYYY-MM-DD",
  "windowDays": 7,
  "totals": { "article_view": 0, "affiliate_click": 0, "email_signup": 0 },
  "byArticle": [
    {
      "path": "/gear/shelters/best-ultralight-trekking-pole-tents/",
      "article_view": 0,
      "affiliate_click": 0,
      "ctr": 0,
      "scroll_50_rate": 0,
      "median_time_on_page_s": 0
    }
  ],
  "notes": "anything anomalous"
}
```

05-meta reads the last ~10 snapshots to detect trends. Never edit an existing snapshot —
append-only, one per date.
