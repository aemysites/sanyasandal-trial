/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing all columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all columns (immediate children of grid)
  const columnDivs = Array.from(grid.children);

  // For each column, extract the main content
  const columnContent = columnDivs.map((col) => {
    // Find .utility-aspect-2x3 within the column
    const aspect = col.querySelector('.utility-aspect-2x3');
    if (aspect) {
      // Return all non-empty child nodes inside the aspect container
      const nodes = Array.from(aspect.childNodes).filter(n => n.nodeType !== Node.TEXT_NODE || n.textContent.trim());
      return nodes.length === 1 ? nodes[0] : nodes;
    } else {
      // Fallback: use all non-empty child nodes of the column itself
      const nodes = Array.from(col.childNodes).filter(n => n.nodeType !== Node.TEXT_NODE || n.textContent.trim());
      return nodes.length === 1 ? nodes[0] : nodes;
    }
  });

  // Header row: first cell is block name, rest are empty to match number of columns
  const headerRow = Array(columnContent.length).fill('');
  headerRow[0] = 'Columns (columns16)';

  const cells = [headerRow, columnContent];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
