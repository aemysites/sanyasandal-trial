/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid that holds the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Find all direct children of the grid (each is a column/cell)
  const gridChildren = Array.from(grid.children);

  // 3. For each child, extract its visual content properly
  const columns = gridChildren.map(child => {
    if (child.tagName === 'IMG') {
      // For image columns, just keep the image
      return child;
    } else if (child.tagName === 'DIV') {
      // For content columns, keep all its visual children (headings, paragraphs, buttons, etc)
      // We want to preserve headings, subheadings, button group, etc, in order
      const nodes = Array.from(child.childNodes).filter(node => {
        if (node.nodeType === 1) return true; // elements
        if (node.nodeType === 3 && node.textContent.trim()) return true; // text
        return false;
      });
      // If only one relevant node, return directly, else return array
      if (nodes.length === 1) {
        return nodes[0];
      } else {
        return nodes;
      }
    } else {
      // Fallback for unexpected node type: include only if non-empty text
      if (child.textContent && child.textContent.trim()) {
        return child.textContent.trim();
      }
      return null;
    }
  }).filter(Boolean);

  // 4. Build the table: header row and then content row
  const headerRow = ['Columns (columns15)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 5. Replace the original element with the new block table
  element.replaceWith(table);
}
