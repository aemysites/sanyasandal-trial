/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name exactly matching the example
  const headerRow = ['Hero (hero5)'];

  // Row 2: prominent image (background/decorative)
  // The correct <img> is a direct child of the top-level grid, not nested in the text content
  // Find the first <img> that is a direct child of any child of the main section
  let imgEl = null;
  const gridChildren = element.querySelectorAll(':scope > div');
  for (const child of gridChildren) {
    const img = child.querySelector(':scope > img');
    if (img) {
      imgEl = img;
      break;
    }
  }
  // Fallback: any image inside the block, to be robust
  if (!imgEl) {
    imgEl = element.querySelector('img');
  }

  // Row 3: text (heading, optional subheading/paragraph, CTA)
  // Find the container with the heading
  let contentCell = [];
  let foundContent = false;
  for (const child of gridChildren) {
    // Look for a heading in each child
    const heading = child.querySelector('h1, h2, h3');
    if (heading) {
      foundContent = true;
      // Gather heading, paragraph(s), and CTA(s)
      contentCell.push(heading);
      // Any rich text blocks (paragraphs)
      const rich = child.querySelector('.rich-text, .rich-text-block, .w-richtext');
      if (rich) {
        // Only paragraphs (ignore other elements)
        rich.querySelectorAll('p').forEach(p => contentCell.push(p));
      } else {
        // Fallback: any p element directly under child
        child.querySelectorAll(':scope > p').forEach(p => contentCell.push(p));
      }
      // Any button group (contains one or more <a>)
      const btnGroup = child.querySelector('.button-group');
      if (btnGroup) {
        contentCell.push(btnGroup);
      } else {
        // Fallback: any <a> directly under child
        child.querySelectorAll(':scope > a').forEach(a => contentCell.push(a));
      }
      break;
    }
  }
  // Fallback: block-level search for heading/etc
  if (!foundContent) {
    const heading = element.querySelector('h1, h2, h3');
    if (heading) contentCell.push(heading);
    element.querySelectorAll('p').forEach(p => contentCell.push(p));
    element.querySelectorAll('a').forEach(a => contentCell.push(a));
  }

  // Assemble into the required block table: 1 column, 3 rows
  const cells = [
    headerRow,
    [imgEl ? imgEl : ''],
    [contentCell.length ? contentCell : '']
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
