#!/usr/bin/env node
const { createServer } = require('http');
const { createReadStream, stat } = require('fs');
const { resolve, join, normalize } = require('path');

const rootDir = resolve(process.argv[2] ?? '.');
const port = Number(
  process.env.REMOTE_PORT ?? process.env.PORT ?? process.argv[3] ?? 8080,
);
const host = process.env.HOST ?? '0.0.0.0';

const mimeTypes = {
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.cjs': 'application/javascript',
  '.css': 'text/css',
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function getMimeType(filePath) {
  const match = /\.[^.]+$/.exec(filePath);
  return (match && mimeTypes[match[0]]) || 'application/octet-stream';
}

function sanitizePath(urlPath) {
  const cleaned = normalize(urlPath).replace(/^(\.\.(\/|\\|$))+/, '');
  return cleaned === '' ? '/' : cleaned;
}

function resolveFilePath(urlPath) {
  const safePath = sanitizePath(urlPath);
  let filePath = join(rootDir, safePath);
  return new Promise((resolvePath) => {
    stat(filePath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        const candidate = join(filePath, 'index.html');
        stat(candidate, (dirErr, dirStats) => {
          if (!dirErr && dirStats.isFile()) {
            resolvePath(candidate);
          } else {
            resolvePath(filePath);
          }
        });
      } else {
        resolvePath(filePath);
      }
    });
  });
}

const server = createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const filePath = await resolveFilePath(pathname);
    stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Not Found');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', getMimeType(filePath));
      createReadStream(filePath).pipe(res);
    });
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Internal Server Error');
    console.error('[static-server] request failed', error);
  }
});

server.listen(port, host, () => {
  console.log(
    `[static-server] serving ${rootDir} at http://${host}:${port}`,
  );
});
