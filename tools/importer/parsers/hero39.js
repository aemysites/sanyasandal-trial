/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as required
  const headerRow = ['Hero (hero39)'];

  // 2. Background image (row 2)
  // We want the main hero image, which is the only <img> under the first grid cell
  let imgEl = null;
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // The first immediate child is the background image container
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length > 0) {
      imgEl = gridChildren[0].querySelector('img');
    }
  }
  const rowImg = [imgEl ? imgEl : ''];

  // 3. Text content (row 3)
  // The second grid cell holds the content (headline, subheading, cta)
  let textCell = '';
  if (grid) {
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length > 1) {
      // This cell contains a nested grid: one for headline, one for subheading/cta
      const textContainer = gridChildren[1];
      textCell = textContainer;
    }
  }
  const rowText = [textCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    rowImg,
    rowText
  ], document);
  // Replace original element
  element.replaceWith(table);
}
