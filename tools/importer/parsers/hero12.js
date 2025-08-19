/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main grid columns: background image and content
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = grid.children;
  if (!columns || columns.length < 2) return;

  // First column: background image container
  const bgImgContainer = columns[0];
  // Find the first <img> within, treat as background image
  const bgImg = bgImgContainer.querySelector('img');

  // Second column: main content container
  const contentContainer = columns[1];
  // Find the card (if present)
  const card = contentContainer.querySelector('.card-body') || contentContainer;
  // Find the grid inside card (will have image + content)
  const cardGrid = card.querySelector('.grid-layout');
  let sideImg = null;
  let textBlock = null;
  if (cardGrid) {
    // Side image: first <img> in the grid
    sideImg = cardGrid.querySelector('img');
    // Text/content area: first <div> in the grid
    textBlock = cardGrid.querySelector('div');
  }
  // If cardGrid is missing, fallback to all content
  if (!sideImg && !textBlock) {
    textBlock = card;
  }

  // Build content cell: side image (if any) + textBlock (if any)
  const contentCell = [];
  if (sideImg) contentCell.push(sideImg);
  if (textBlock) contentCell.push(textBlock);

  // Compose table rows
  const headerRow = ['Hero (hero12)'];
  const bgImgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
