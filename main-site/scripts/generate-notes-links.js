#!/usr/bin/env node
/**
 * Reads Quartz's contentIndex.json (from main-site/public/content/static/)
 * and generates notes-links.generated.js with all blog/note links.
 * Run during main-site build (after Quartz output is copied).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const contentIndexPath = path.join(root, 'public', 'content', 'static', 'contentIndex.json');
const outputPath = path.join(root, 'src', 'data', 'notes-links.generated.js');

// Slugs to exclude from the notes list (index, tag pages, folder indexes)
function shouldExclude(slug) {
  if (slug === 'index') return true;
  if (slug.startsWith('tags/')) return true;
  if (slug.endsWith('/index')) return true;
  return false;
}

try {
  const raw = readFileSync(contentIndexPath, 'utf-8');
  const index = JSON.parse(raw);

  const links = Object.entries(index)
    .filter(([slug]) => !shouldExclude(slug))
    .map(([slug, entry]) => ({
      label: entry.title || slug,
      href: `/content/${slug}.html`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const content = `/**
 * Auto-generated from Quartz contentIndex.json - do not edit manually.
 * Regenerated on each build.
 */
export const notesLinks = ${JSON.stringify(links, null, 2)};
`;

  writeFileSync(outputPath, content);
  console.log(`Generated ${links.length} notes links → src/data/notes-links.generated.js`);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.warn(
      'contentIndex.json not found at',
      contentIndexPath,
      '- using fallback empty links. Run full build (quartz + main-site) first.'
    );
    writeFileSync(
      outputPath,
      `/**
 * Fallback - contentIndex.json not yet available. Run full build.
 */
export const notesLinks = [];
`
    );
  } else {
    throw err;
  }
}
