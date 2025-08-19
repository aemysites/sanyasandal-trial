/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: must be exactly 'Hero (hero35)'
  const headerRow = ['Hero (hero35)'];

  // 2. Image row: For this HTML, there is NO background image element, so we use an empty string
  const imageRow = [''];

  // 3. Content row: Heading + Subheading + CTA
  // Safely extract all content elements from the inner grid layout
  let contentElements = [];
  // Find main container (first child)
  const mainContainer = element.querySelector(':scope > div');
  if (mainContainer) {
    // Find the grid layout
    const grid = mainContainer.querySelector('.w-layout-grid');
    if (grid) {
      // The heading/subheading div and the CTA a.button are the only direct children
      Array.from(grid.children).forEach((child) => {
        // Add both the heading block and the button link (if present)
        contentElements.push(child);
      });
    }
  }
  // Defensive fallback: if nothing found, add element
  if (contentElements.length === 0) {
    contentElements = [element];
  }
  const contentRow = [contentElements];

  // Final block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
