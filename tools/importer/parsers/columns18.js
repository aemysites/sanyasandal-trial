/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout holding the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify columns by type
  // In this block: left column (text and contact methods), right column (image)
  let leftCol = null;
  let rightCol = null;

  // Heuristic: left column contains the text and contact info, right column is the image
  gridChildren.forEach(child => {
    if (child.tagName === 'IMG') {
      rightCol = child;
    } else {
      if (!leftCol) {
        leftCol = child;
      } else {
        // If more than two columns, push extra to leftCol
        // If child is UL (contact list), we want it included
        leftCol.appendChild(child);
      }
    }
  });

  // If the leftCol contains only one major block, try to extract the UL and append
  // But safer: get all children except IMG into leftCol

  // Final assembly: Each cell is an array of referenced elements
  const leftCell = [leftCol];
  const rightCell = rightCol ? [rightCol] : [];

  // Table header row
  const headerRow = ['Columns (columns18)'];
  // Content row: left column, right column
  const contentRow = [leftCell, rightCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
