/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the markdown example
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // Find all tab panes (each one has a card grid)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((pane) => {
    // Find the grid containing all cards
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is represented by an <a> direct child
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach((card) => {
      // (1) Image cell: try to find the image inside a 3x2 aspect div, or leave empty if not found
      let imageCell = '';
      const aspectDiv = card.querySelector('.utility-aspect-3x2');
      if (aspectDiv) {
        const img = aspectDiv.querySelector('img');
        if (img) imageCell = img;
      }
      
      // (2) Text content: collect heading and description (if any), preserve element semantics
      const textElements = [];
      const heading = card.querySelector('h3');
      if (heading) textElements.push(heading);
      // Some cards may have multiple .paragraph-sm, but we want the one associated with the heading
      // Find direct .paragraph-sm under card (not in image wrapper)
      let paragraphs = Array.from(card.querySelectorAll('.paragraph-sm'));
      paragraphs = paragraphs.filter(p => !aspectDiv || !aspectDiv.contains(p));
      paragraphs.forEach(p => textElements.push(p));
      // Compose 2-column row
      cells.push([imageCell, textElements]);
    });
  });

  // Create and replace with the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
