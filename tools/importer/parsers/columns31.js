/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (should be only one grid-layout)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct child columns (could be divs, usually)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header: block/component name as single cell
  const headerRow = ['Columns (columns31)'];

  // Table second row: as many columns as there are in grid
  // Each cell should reference the actual element node.
  const contentRow = columns;

  // Compose the two-dimensional cells array
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create the block table using the provided utility
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly structured block table
  element.replaceWith(blockTable);
}
