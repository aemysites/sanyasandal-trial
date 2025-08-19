/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly per spec
  const table = [['Cards (cards2)']];

  // Find the grid container for cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 1. Main card (leftmost, usually with image)
  const mainCard = grid.querySelector('a.utility-link-content-block');
  if (mainCard) {
    // Find image
    const imgContainer = mainCard.querySelector('[class*=utility-aspect]');
    let img = imgContainer ? imgContainer.querySelector('img') : null;
    // Gather all tag, heading and paragraphs
    const textContent = [];
    const tagGroup = mainCard.querySelector('.tag-group');
    if (tagGroup) textContent.push(tagGroup);
    const heading = mainCard.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textContent.push(heading);
    mainCard.querySelectorAll('p').forEach(p => textContent.push(p));
    table.push([img || '', textContent]);
  }

  // 2. First flex group with image cards
  const flexGroups = Array.from(grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm'));
  if (flexGroups.length) {
    // The first flex group contains 2 cards (each with image)
    const imgCards = flexGroups[0].querySelectorAll('a.utility-link-content-block');
    imgCards.forEach(card => {
      // Find image
      const imgContainer = card.querySelector('[class*=utility-aspect]');
      let img = imgContainer ? imgContainer.querySelector('img') : null;
      // Gather tag, heading, paragraphs
      const textContent = [];
      const tagGroup = card.querySelector('.tag-group');
      if (tagGroup) textContent.push(tagGroup);
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textContent.push(heading);
      card.querySelectorAll('p').forEach(p => textContent.push(p));
      table.push([img || '', textContent]);
    });
  }

  // 3. Second flex group contains text-only cards separated by .divider
  if (flexGroups.length > 1) {
    const textCards = flexGroups[1].querySelectorAll('a.utility-link-content-block');
    textCards.forEach(card => {
      // No image, just text
      const textContent = [];
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textContent.push(heading);
      card.querySelectorAll('p').forEach(p => textContent.push(p));
      table.push(['', textContent]);
    });
  }

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
