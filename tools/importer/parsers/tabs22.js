/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be exactly a single cell: ['Tabs']
  const headerRow = ['Tabs'];

  // Tab labels: extract from menu
  const menuContainer = Array.from(element.children)
    .find((c) => c.classList.contains('w-tab-menu'));
  const tabLinks = menuContainer ? Array.from(menuContainer.querySelectorAll('a')) : [];
  const tabLabels = tabLinks.map(a => {
    const labelDiv = a.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : a.textContent.trim();
  });

  // Tab panes: extract from content container
  const contentContainer = Array.from(element.children)
    .find((c) => c.classList.contains('w-tab-content'));
  const tabPanes = contentContainer ? Array.from(contentContainer.querySelectorAll(':scope > .w-tab-pane')) : [];

  // Build output table: first row is single cell header, subsequent rows are two cells
  const table = [];
  table.push(headerRow); // Single cell header, as required
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i] || '';
    let contentCell;
    const pane = tabPanes[i];
    if (pane) {
      const contentBlock = pane.querySelector(':scope > div');
      if (contentBlock) {
        contentCell = Array.from(contentBlock.children);
      } else {
        contentCell = Array.from(pane.children);
      }
    } else {
      contentCell = '';
    }
    table.push([label, contentCell]); // Each row is exactly two cells
  }

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
