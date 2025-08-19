/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const rows = [['Cards']];

  // Select all direct children (each is a card group)
  const cardNodes = element.querySelectorAll(':scope > div');

  cardNodes.forEach((cardNode) => {
    // Find the p (text content)
    const para = cardNode.querySelector('p');
    if (para) {
      rows.push([para]);
    } else {
      // If no <p>, fallback to trimmed text
      rows.push([cardNode.textContent.trim()]);
    }
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
