/**
 * The one permitted non-analytics client script: comparison-table sorting.
 * Emits an `ol:table-sort` DOM event that the analytics listener in
 * BaseLayout forwards to PostHog as `comparison_table_sort`.
 */
function initTables(): void {
  document.querySelectorAll<HTMLTableElement>('table[data-sort-table]').forEach((table) => {
    const headers = table.querySelectorAll<HTMLTableCellElement>('th[data-sortable]');
    headers.forEach((th, colIndex) => {
      th.tabIndex = 0;
      const activate = () => {
        const type = th.dataset.sortType ?? 'text';
        const current = th.getAttribute('aria-sort');
        const dir = current === 'ascending' ? 'descending' : 'ascending';
        headers.forEach((h) => h.removeAttribute('aria-sort'));
        th.setAttribute('aria-sort', dir);

        const tbody = table.tBodies[0];
        if (!tbody) return;
        const rows = Array.from(tbody.rows);
        rows.sort((a, b) => {
          const av = a.cells[colIndex]?.dataset.sortValue ?? a.cells[colIndex]?.textContent?.trim() ?? '';
          const bv = b.cells[colIndex]?.dataset.sortValue ?? b.cells[colIndex]?.textContent?.trim() ?? '';
          let cmp: number;
          if (type === 'number') cmp = Number(av) - Number(bv);
          else cmp = av.localeCompare(bv);
          return dir === 'ascending' ? cmp : -cmp;
        });
        rows.forEach((r) => tbody.appendChild(r));

        table.dispatchEvent(
          new CustomEvent('ol:table-sort', {
            bubbles: true,
            detail: {
              table_id: table.dataset.tableId ?? 'comparison',
              column: th.textContent?.trim() ?? String(colIndex),
              direction: dir,
            },
          })
        );
      };
      th.addEventListener('click', activate);
      th.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTables);
} else {
  initTables();
}
