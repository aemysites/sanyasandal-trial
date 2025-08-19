/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];
  // Get all cards (direct <a> children)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach(card => {
    // First cell: image (from utility-aspect-2x3 div)
    const imageDiv = card.querySelector(':scope > div.utility-aspect-2x3');
    let image = '';
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) image = img;
    }
    // Second cell: All text content (tag/date + heading)
    const textCellParts = [];
    // Tag/date row
    const metaDiv = card.querySelector(':scope > div.flex-horizontal');
    if (metaDiv) textCellParts.push(metaDiv);
    // Heading
    const heading = card.querySelector(':scope > h3');
    if (heading) textCellParts.push(heading);
    rows.push([
      image,
      textCellParts
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
