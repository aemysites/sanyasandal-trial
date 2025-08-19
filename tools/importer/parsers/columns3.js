/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Each direct child of grid is a column
    columns = Array.from(grid.children);
  }
  // The block expects 2 rows: header, content
  // Header row: exactly one column!
  const headerRow = ['Columns (columns3)'];
  // Content row: one cell per column
  const cells = [headerRow, columns.length > 0 ? columns : ['']];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Fix the header row so it only has a single <th> with colspan spanning all columns
  const thead = table.querySelector('tr:first-child');
  if (thead && columns.length > 1) {
    const th = thead.querySelector('th');
    th.setAttribute('colspan', columns.length);
    // Remove any extra th created (if any)
    while (th.nextSibling) {
      th.parentNode.removeChild(th.nextSibling);
    }
  }
  element.replaceWith(table);
}
