/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (should be columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: exactly one column with the block name
  const headerRow = ['Columns (columns29)'];

  // Content row: as many columns as there are column divs
  const contentRow = columns;

  // Create table with a single header column in first row, and n columns in the next
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
