/* global WebImporter */
export default function parse(element, { document }) {
  // Header must match exactly
  const headerRow = ['Cards (cards17)'];
  // Get all card containers (.utility-aspect-1x1)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Each card: first cell is image, second cell is empty (no text in HTML)
  const rows = cardDivs.map(div => {
    // Reference the img element directly
    const img = div.querySelector('img');
    // Defensive: if no img, leave cell blank
    return [img || '', ''];
  });
  // Compose table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
