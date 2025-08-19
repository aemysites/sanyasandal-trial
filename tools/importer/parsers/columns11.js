/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children with class
  function getChildrenByClass(parent, className) {
    return Array.from(parent.children).filter(el => el.classList && el.classList.contains(className));
  }
  // Helper: get direct children
  function getDirectChildren(parent) {
    return Array.from(parent.children);
  }
  // Find .container inside section
  const container = element.querySelector('.container');
  if (!container) return;
  // All top-level grid blocks within container
  const grids = getChildrenByClass(container, 'grid-layout');
  if (grids.length < 2) return;
  // Top grid: headline/eyebrow (left), paragraph/author/button (right)
  const topGrid = grids[0];
  const topCols = getDirectChildren(topGrid);
  if (topCols.length < 2) return;
  const leftCol = topCols[0];
  const rightCol = topCols[1];
  // Reference existing elements directly
  const leftContent = leftCol;
  const rightContent = rightCol;
  // Second grid: two images
  const imageGrid = grids[1];
  const imageCells = getDirectChildren(imageGrid).map(imgWrapper => {
    const img = imgWrapper.querySelector('img');
    return img ? img : '';
  });
  while (imageCells.length < 2) imageCells.push('');
  // The header row must be a single cell
  const headerRow = ['Columns (columns11)'];
  const tableRows = [headerRow, [leftContent, rightContent], imageCells];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
