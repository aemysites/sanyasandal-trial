/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards21) block expects: 2 columns (image/icon, text content), header row as block name
  const rows = [ ['Cards (cards21)'] ];

  // The card markup is deeply nested, find the actual card body
  // Supports generalization if multiple cards present in future
  const cards = [];
  // Try to find direct children .card-body (across possible nesting)
  const cardBodies = element.querySelectorAll('.card-body');

  cardBodies.forEach((cardBody) => {
    // Card image/icon (mandatory)
    let img = cardBody.querySelector('img, svg, picture');

    // Card text content: title (heading), description, cta (if any)
    // For now: only a heading is present.
    let textCellFrag = document.createDocumentFragment();
    // Prefer h4, h3, h2, or div with heading class
    let heading = cardBody.querySelector('.h4-heading, h4, h3, h2, .card-title');
    if (heading) textCellFrag.appendChild(heading);
    // If there may be more description, get it too (not in this HTML)
    // e.g., all text nodes after heading
    if (heading) {
      let node = heading.nextSibling;
      while (node) {
        // Only pick non-empty text or block elements
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
          textCellFrag.appendChild(node);
        }
        node = node.nextSibling;
      }
    }
    // If no heading, fallback to all text
    if (!heading) {
      Array.from(cardBody.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
          textCellFrag.appendChild(node);
        }
      });
    }

    // Add row: [image/icon, text content]
    rows.push([
      img,
      textCellFrag.childNodes.length ? textCellFrag : ''
    ]);
  });

  // If no .card-body found, fallback: just remove the block
  if (rows.length === 1) {
    // Only header row => no cards
    element.replaceWith(document.createComment('Empty cards21 block removed'));
    return;
  }
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
