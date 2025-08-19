/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const rows = [['Accordion (accordion13)']];

  // Find all immediate children with class 'divider' - each is an accordion item
  const items = Array.from(element.querySelectorAll(':scope > .divider'));

  items.forEach(divider => {
    // Look for the grid layout inside the divider
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    // Use direct references to the actual elements for semantic accuracy
    const titleEl = children[0];
    const contentEl = children[1];
    rows.push([titleEl, contentEl]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
