/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container holding the grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Find top-level columns within the grid
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The left column contains heading, description, buttons
  const leftCol = columns[0];
  // The right column contains the images grid
  const rightCol = columns[1];

  // Reference all content in the left column as a single block for resilience
  // (Do not clone content, reference existing)
  // Use a div for the content cell to preserve element structure
  const leftColContent = document.createElement('div');
  Array.from(leftCol.childNodes).forEach((node) => {
    leftColContent.appendChild(node);
  });

  // For the right column, grab all images inside the nested grid
  let rightColContent;
  const rightImageGrid = rightCol.querySelector('.grid-layout');
  if (rightImageGrid) {
    rightColContent = document.createElement('div');
    Array.from(rightImageGrid.children).forEach((img) => {
      rightColContent.appendChild(img);
    });
  } else {
    // Fallback: reference all content from right column if no image grid
    rightColContent = rightCol;
  }

  // Table header matches the block name from the prompt
  const headerRow = ['Columns (columns36)'];
  const bodyRow = [leftColContent, rightColContent];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable([headerRow, bodyRow], document);
  element.replaceWith(block);
}
