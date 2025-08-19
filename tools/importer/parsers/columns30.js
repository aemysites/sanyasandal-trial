/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid - each is a column
  const columns = Array.from(grid.children);

  // Header row: must be a single cell array, not one per column
  const headerRow = ['Columns (columns30)'];

  // Content row: one cell per column
  const contentRow = columns;

  // Compose the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
