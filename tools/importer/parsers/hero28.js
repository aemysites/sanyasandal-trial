/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero (hero28)'];

  // Get the grid children (2 main columns)
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // gridDivs[0]: image; gridDivs[1]: content

  // --- Background image cell (row 2) ---
  let imageCell = '';
  if (gridDivs.length > 0) {
    // Look for <img> with src (background image)
    const img = gridDivs[0].querySelector('img[src]');
    if (img) {
      imageCell = img;
    }
  }

  // --- Content cell (row 3) ---
  let contentCell = '';
  if (gridDivs.length > 1) {
    // The actual content is within a child (the container)
    const container = gridDivs[1].querySelector(':scope > div');
    if (container) {
      // Collect all children of the container that might be content
      const parts = [];
      // Title: h1
      const h1 = container.querySelector('h1');
      if (h1) parts.push(h1);
      // Subheading: look for h2/h3 under the same container (not in this HTML, but robust)
      const h2 = container.querySelector('h2');
      if (h2) parts.push(h2);
      const h3 = container.querySelector('h3');
      if (h3) parts.push(h3);
      // Paragraphs
      const paragraphs = container.querySelectorAll('p');
      paragraphs.forEach((p) => parts.push(p));
      // CTA: find any .button-group with buttons/links inside
      const buttonGroup = container.querySelector('.button-group');
      if (buttonGroup && buttonGroup.children.length > 0) {
        parts.push(buttonGroup);
      }
      // If we found any, add them as an array, else fall back to container
      if (parts.length > 0) {
        contentCell = parts;
      } else {
        contentCell = container;
      }
    } else {
      // fallback: use the whole content column
      contentCell = gridDivs[1];
    }
  }

  const cells = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
