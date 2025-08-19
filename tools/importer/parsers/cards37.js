/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the spec
  const headerRow = ['Cards (cards37)'];
  const cells = [headerRow];

  // Find the .container div, then the main grid (the one containing all card nodes)
  const container = element.querySelector('.container');
  if (!container) return;
  // The top-level grid is always class 'grid-layout' under the container
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Helper to gather all cards (<a> with utility-link-content-block), including those in nested grids
  function collectCards(gridEl) {
    let cards = [];
    for (const child of gridEl.children) {
      if (
        child.classList.contains('grid-layout') &&
        child !== gridEl // Prevent infinite recursion
      ) {
        cards = cards.concat(collectCards(child));
      } else if (
        child.tagName === 'A' &&
        child.classList.contains('utility-link-content-block')
      ) {
        cards.push(child);
      }
    }
    return cards;
  }
  const cards = collectCards(mainGrid);

  // For each card, extract the image and text content
  cards.forEach(card => {
    // Find the image: look for the first <img> descendant of the card
    let img = card.querySelector('img');

    // Compose text cell: heading(s), paragraph(s), and any .button (CTA)
    // Only include direct children (not inside the image wrapper div)
    const textBits = [];
    // Heading (h2, h3, h4), sometimes with utility-* classes
    let heading = Array.from(card.children).find(
      n => /^H[2-4]$/.test(n.tagName)
    );
    if (heading) textBits.push(heading);

    // Paragraph(s) - direct children
    let para = Array.from(card.children).find(
      n => n.tagName === 'P'
    );
    if (para) textBits.push(para);

    // Button (CTA), sometimes a <div class="button">, sometimes missing
    let cta = Array.from(card.children).find(
      n => n.classList && n.classList.contains('button')
    );
    if (cta) textBits.push(cta);

    // If all text is inside a single div (e.g. .utility-padding-all-2rem), grab from there
    if (textBits.length === 0) {
      const possibleTextDiv = card.querySelector('.utility-padding-all-2rem');
      if (possibleTextDiv) {
        // Find heading, para, cta inside
        let heading2 = possibleTextDiv.querySelector('h2, h3, h4');
        if (heading2) textBits.push(heading2);
        let para2 = possibleTextDiv.querySelector('p');
        if (para2) textBits.push(para2);
        let cta2 = possibleTextDiv.querySelector('.button');
        if (cta2) textBits.push(cta2);
      }
    }

    // Add the row: always 2 columns (image, text)
    cells.push([img, textBits]);
  });

  // Build and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
