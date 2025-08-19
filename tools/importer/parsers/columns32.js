/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid columns container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate column children (side-by-side layout)
  const columns = Array.from(grid.children);

  // Create the header row with the correct block name
  const headerRow = ['Columns (columns32)'];

  // The content row: each column's DOM block as a cell
  // Reference the original elements, do not clone
  const contentRow = columns.map((col) => col);

  // Structure matches example: 1 header row, 1 row of columns
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
