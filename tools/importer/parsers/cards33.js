/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must exactly match example
  const headerRow = ['Cards (cards33)'];

  // Get all direct <a> children: each is a card
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // Each <a> contains a grid div, with image and text
    // Find first <img> descendant as the card image
    const img = card.querySelector('img');

    // Find the text content container
    // Structure: <a><div> grid <img/><div>text...</div></div></a>
    let textContainer = null;
    const gridDiv = card.querySelector(':scope > div');
    if (gridDiv) {
      // Find all direct children of the gridDiv
      const children = Array.from(gridDiv.children);
      // Exclude the <img> to find the content div
      textContainer = children.find((el) => el !== img && el.tagName === 'DIV');
    }
    // Fallback: if not found, use the whole gridDiv
    if (!textContainer && gridDiv) textContainer = gridDiv;
    // Fallback: if still not found, use the card itself
    if (!textContainer) textContainer = card;

    // Structure: [image, text content]
    return [img, textContainer];
  });

  // Compose table as per spec
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
