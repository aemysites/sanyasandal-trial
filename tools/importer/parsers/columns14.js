/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the columns container)
  // Look for either class, to be robust
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Special handling: sometimes the first child is a heading (like <h2>), and the others are column content
  // Let's check: if child is a heading, treat as first column, otherwise all are columns
  let contentColumns;
  if (columns.length === 3 && columns[0].tagName.match(/^H[1-6]$/i)) {
    // First is heading, use as column 1, second & third as columns 2 & 3
    contentColumns = [columns[0], columns[1], columns[2]];
  } else if (columns.length === 2 && columns[0].tagName.match(/^H[1-6]$/i)) {
    // This case matches the provided HTML: [<h2>, <div>]
    contentColumns = [columns[0], columns[1]];
  } else {
    // Otherwise, use all as columns
    contentColumns = columns;
  }

  // Table header as required
  const headerRow = ['Columns (columns14)'];

  // Compose the table with the columns as a row
  const tableRows = [
    headerRow,
    contentColumns,
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
