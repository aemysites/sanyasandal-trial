/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid in the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return; // Defensive: no grid found

  // The columns to display are the immediate children of the grid
  const cols = Array.from(grid.children);
  if (cols.length === 0) return; // Defensive: no columns

  // Header row exactly as specified
  const headerRow = ['Columns (columns27)'];

  // Second row: put each column in its own cell, referencing the DOM element directly
  const contentRow = cols;

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
