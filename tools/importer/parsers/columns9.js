/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns structure
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid as columns
  const columnElements = Array.from(grid.children);

  // The header row must be exactly one cell, with the exact header string
  const headerRow = ['Columns (columns9)'];

  // The next row must have exactly as many cells as columns in the grid (in this case, 4)
  const columnsRow = columnElements.map(col => col);

  // Create a table with just two rows: header and columns (multi-cell row)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
