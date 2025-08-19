/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Header row for Columns block, matches example
  const headerRow = ['Columns (columns38)'];

  // Step 2: Extract columns (immediate children of grid container)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Step 3: For each column, extract its main content (the <img>), else the column div
  // This block only contains images in each column
  const contentRow = columns.map((col) => {
    // Try to find an <img> in this column
    const img = col.querySelector('img');
    if (img) {
      return img;
    } else {
      // Fallback: reference the column itself
      return col;
    }
  });

  // Step 4: Table construction, header row and single content row
  const tableData = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Step 5: Replace the original element with the table
  element.replaceWith(table);
}
