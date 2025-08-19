/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards10)'];

  // Get all cards (direct <a> children)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Prepare rows for each card
  const rows = cards.map(card => {
    // Image: first .utility-aspect-3x2 child with <img>
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Text area
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const tagGroup = textContainer ? textContainer.querySelector('.tag-group') : null;
    const tag = tagGroup ? tagGroup.querySelector('.tag') : null;
    const heading = textContainer ? textContainer.querySelector('h3, .h4-heading') : null;
    const description = textContainer ? textContainer.querySelector('p') : null;

    // Compose text content in order: tag (if any), heading (if any), description (if any)
    const textCell = [];
    if (tag) textCell.push(tag);
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);

    return [img ? img : '', textCell.length > 1 ? textCell : (textCell[0] || '')];
  });

  // Table data: header + rows
  const tableData = [headerRow, ...rows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the element
  element.replaceWith(block);
}
