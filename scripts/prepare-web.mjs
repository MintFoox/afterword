import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'www');

const rootFiles = new Set([
  'index.html',
  'manifest.json',
  'service-worker.js',
  'favicon.png',
  'icon-192.png',
  'icon-512.png'
]);

async function recreateOutDir() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
}

async function copyRootFiles() {
  const entries = await readdir(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!rootFiles.has(entry.name)) continue;

    const src = path.join(rootDir, entry.name);
    const dest = path.join(outDir, entry.name);
    await cp(src, dest, { force: true });
  }
}

async function copyDirectoryIfPresent(name) {
  const src = path.join(rootDir, name);
  const dest = path.join(outDir, name);
  await cp(src, dest, { recursive: true, force: true }).catch(() => {});
}

await recreateOutDir();
await copyRootFiles();
await copyDirectoryIfPresent('assets');

console.log(`Prepared native web bundle in ${outDir}`);
