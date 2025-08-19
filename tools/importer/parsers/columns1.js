/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout which contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row must be EXACTLY one column and match spec
  const headerRow = ['Columns (columns1)'];

  // For each column, group all relevant content inside that column into a fragment
  const columnsRow = columns.map((col) => {
    // If the column is just an image, return it directly
    if (col.tagName === 'IMG') return col;
    // Otherwise, group all children into a single fragment
    const frag = document.createDocumentFragment();
    Array.from(col.childNodes).forEach((child) => frag.appendChild(child));
    return frag;
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
