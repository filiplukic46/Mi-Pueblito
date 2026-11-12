// Local preview of the production build: node scripts/serve.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const port = +(process.env.PORT || process.argv[2] || 4417);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' };
const find = (u) => {
  const clean = path.normalize(decodeURIComponent(u.split('?')[0])).replace(/^[\\/]+/, '');
  const base = path.join(root, clean);
  if (!base.startsWith(root)) return null;
  for (const c of [base, path.join(base, 'index.html'), base + '.html']) { try { if (fs.statSync(c).isFile()) return c; } catch {} }
  return null;
};
http.createServer((req, res) => {
  const file = find(req.url || '/');
  const f = file || path.join(root, '404.html');
  res.writeHead(file ? 200 : 404, { 'content-type': types[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-cache' });
  fs.createReadStream(f).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} at http://127.0.0.1:${port}/`));
