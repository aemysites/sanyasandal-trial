/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell as in the example
  const headerRow = ['Columns (columns4)'];

  // Get all direct child divs (which are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For the columns row, we want a single array with each column's element as a separate cell
  const columnsRow = columns.map(col => col);

  // The cells array as per the required structure: first row is single-cell header, second is all columns
  const cells = [headerRow, columnsRow];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
