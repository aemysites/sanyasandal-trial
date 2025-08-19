/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row: <img> (if exists)
  // Look for a direct <img> descendant (background/decorative)
  const bgImg = element.querySelector('img.cover-image');
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content (headline, subheading, CTA)
  // Text content is in card.card-on-inverse (may vary slightly)
  const card = element.querySelector('.card-on-inverse');
  const contentArr = [];
  if (card) {
    // Headline (first h1, h2, h3)
    const heading = card.querySelector('h1, h2, h3');
    if (heading) contentArr.push(heading);

    // Subheading (optional, usually <p> with subheading class)
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentArr.push(subheading);

    // CTA(s): button-group
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentArr.push(buttonGroup);
  }
  const contentRow = [contentArr.length ? contentArr : ''];

  // Compose the block table (1 column, 3 rows)
  const cells = [headerRow, bgImgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
