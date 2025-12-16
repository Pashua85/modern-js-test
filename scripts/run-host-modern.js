#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const [command, ...restArgs] = process.argv.slice(2);

if (!command) {
  console.error('[run-host-modern] Usage: run-host-modern <command> [...args]');
  process.exit(1);
}

const env = {
  ...process.env,
};

const resolvedPort = env.PORT || '8080';
env.PORT = resolvedPort;

const remotePort = env.REMOTE_PORT || '8081';

const discoverPublicHost = () => {
  const candidate =
    env.REMOTE_PUBLIC_HOST ||
    env.PUBLIC_HOST ||
    env.HOST ||
    env.SERVER_HOST ||
    '127.0.0.1';

  if (candidate === '0.0.0.0' || candidate === '::') {
    return '127.0.0.1';
  }

  return candidate;
};

if (!env.REMOTE_BASE_URL) {
  const publicHost = discoverPublicHost();
  env.REMOTE_BASE_URL = `http://${publicHost}:${remotePort}`;
}

const resolveModernBin = () => {
  const searchRoots = [
    process.cwd(),
    __dirname,
    path.join(__dirname, '..', 'host'),
    path.join(__dirname, '..'),
  ];

  const tryResolve = root => {
    try {
      const entry = require.resolve('@modern-js/app-tools', {
        paths: [root],
      });
      let dir = path.dirname(entry);
      const stop = path.parse(dir).root;

      while (dir && dir !== stop) {
        const packageJsonPath = path.join(dir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            if (pkg && pkg.name === '@modern-js/app-tools') {
              const binPath = path.join(dir, 'bin', 'modern.js');
              if (fs.existsSync(binPath)) {
                return binPath;
              }
              return null;
            }
          } catch {
            // ignore JSON errors
          }
        }
        dir = path.dirname(dir);
      }
    } catch {
      // unable to resolve from this root
    }

    return null;
  };

  for (const root of searchRoots) {
    const resolved = tryResolve(root);
    if (resolved) {
      return resolved;
    }
  }

  // last resort: look for node_modules/.bin/modern
  for (const root of searchRoots) {
    const candidate = path.join(
      root,
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'modern.cmd' : 'modern',
    );
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
};

const modernBin = resolveModernBin();

if (!modernBin) {
  console.error(
    '[run-host-modern] Unable to locate the @modern-js/app-tools binary. Make sure dependencies are installed.',
  );
  process.exit(1);
}

const child = spawn(process.execPath, [modernBin, command, ...restArgs], {
  stdio: 'inherit',
  env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
