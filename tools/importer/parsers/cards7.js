/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header row
  const headerRow = ['Cards (cards7)'];
  // Get all card containers (direct children)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [headerRow];
  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains one image (mandatory)
    const img = cardDiv.querySelector('img');
    // Second cell: no text in provided HTML, so empty string
    rows.push([img, '']);
  });
  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
