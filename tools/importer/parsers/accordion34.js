/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion34) block header as per example
  const cells = [
    ['Accordion (accordion34)'],
  ];

  // Get all immediate accordion sections
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title cell extraction
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // The actual title is in the .paragraph-lg inside the toggle
      const possibleTitle = toggle.querySelector('.paragraph-lg');
      titleCell = possibleTitle ? possibleTitle : toggle;
    }

    // Content cell extraction
    let contentCell = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      const wrapper = nav.querySelector('.utility-padding-all-1rem');
      if (wrapper) {
        // The rich text (preferred)
        const richText = wrapper.querySelector('.rich-text');
        contentCell = richText ? richText : wrapper;
      } else {
        contentCell = nav;
      }
    }

    // Add row [title, content], referencing elements directly
    cells.push([
      titleCell,
      contentCell,
    ]);
  });

  // Replace the original element with the created table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
