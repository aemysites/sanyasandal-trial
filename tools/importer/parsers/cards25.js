/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block spec
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];
  // Get all direct children (these are the card containers or image blocks)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  cardDivs.forEach((cardDiv) => {
    // Try to find an immediate img inside this card div (any descendant)
    const image = cardDiv.querySelector('img');
    // Try to find the text section (look for h3 or p)
    let textContent = null;
    // Text is usually wrapped in a div with utility-padding-all-2rem, but fallback if structure differs
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      // fallback: look for any div with h3 or p
      textContainer = Array.from(cardDiv.querySelectorAll('div')).find(d => d.querySelector('h3, p'));
    }
    if (!textContainer) {
      // fallback: look for any h3 or p directly
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        const fragment = document.createElement('div');
        if (h3) fragment.appendChild(h3);
        if (p) fragment.appendChild(p);
        textContainer = fragment;
      }
    }
    // Only process as a Card if image exists (mandatory for this block)
    if (image) {
      if (textContainer) {
        rows.push([image, textContainer]);
      } else {
        // just image (no text)
        rows.push([image, '']);
      }
    }
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
