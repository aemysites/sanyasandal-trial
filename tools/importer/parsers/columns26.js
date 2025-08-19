/* global WebImporter */
export default function parse(element, { document }) {
  // Find relevant content
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const mainGrid = container.querySelector(':scope > .w-layout-grid');
  if (!mainGrid) return;

  // Get all immediate children of main grid
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 3) return;

  // Attribution grid is the third child of main grid
  const attributionGrid = gridChildren[2];
  const attributionItems = Array.from(attributionGrid.children);
  // Defensive checks
  const flexAttribution = attributionItems.length > 1 ? attributionItems[1] : null;
  const logoSvg = attributionItems.length > 2 ? attributionItems[2] : null;

  // For table structure:
  // - Header row: only one column: 'Columns (columns26)'
  // - Second row: two columns, left and right (each is a fragment, not a div)

  // Create left column fragment
  const leftColFrag = document.createDocumentFragment();
  leftColFrag.appendChild(gridChildren[0].cloneNode(true)); // h2-heading
  if (flexAttribution) {
    leftColFrag.appendChild(flexAttribution.cloneNode(true));
  }

  // Create right column fragment
  const rightColFrag = document.createDocumentFragment();
  rightColFrag.appendChild(gridChildren[1].cloneNode(true)); // quote paragraph
  if (logoSvg) {
    rightColFrag.appendChild(logoSvg.cloneNode(true));
  }

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns26)'],
    [leftColFrag, rightColFrag]
  ], document);

  element.replaceWith(table);
}
