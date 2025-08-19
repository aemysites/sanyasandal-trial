/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Header row (block name exactly as in example)
  const headerRow = ['Hero (hero20)'];

  // Step 2: Background Image(s)
  // Find the collage grid which contains the background images
  let bgCell = [];
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (grid) {
    const images = Array.from(grid.querySelectorAll('img.cover-image'));
    if (images.length > 0) {
      // Place all images in the same cell as an array
      bgCell = images;
    }
  }

  // Step 3: Content cell (title, subheading, buttons)
  let contentCell = [];
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentContainer) {
    const title = contentContainer.querySelector('h1');
    if (title) contentCell.push(title);
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentCell.push(subheading);
    const ctaGroup = contentContainer.querySelector('.button-group');
    if (ctaGroup) contentCell.push(ctaGroup);
  }

  // Ensure at least empty arrays for missing sections
  const rows = [
    headerRow,
    [bgCell.length ? bgCell : ''],
    [contentCell.length ? contentCell : '']
  ];

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
